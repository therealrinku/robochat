import Chatbox from "../components/Chatbox";
import MessageManager from "../components/MessageManager";
import MessageBoxStyling from "../components/Styling/MessageBoxStyling";
import TitlebarStyling from "../components/Styling/TitlebarStyling";
import useAppContext from "../hooks/useAppContext";
import { Fragment, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { BsArrowLeftShort, BsRobot } from "react-icons/bs";
import { AiFillCrown, AiOutlineCheck, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { MdInfo, MdOutlinePower } from "react-icons/md";

export default function Dashboard() {
  const [chatbotId, setChatbotId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [embedCodeCopied, setEmbedCodeCopied] = useState(false);
  const [deletingBotId, setDeletingBotId] = useState<null | string>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [hasRequestedPremium, setHasRequestedPremium] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const [chatbots, setChatbots] = useState({});
  const { chatbotConfig, setChatbotConfig, currentUser, setCurrentUser, defaultConfig }: any = useAppContext();

  function copyEmbedCode() {
    const iframeUrl = `
    <iframe
    title="Example Iframe"
    src=${window.location.origin}/bot/${chatbotId}
    frameBorder="0"
    style="position: fixed; width: 400px; height: 100%; bottom: 0; right: 0; z-index: 111"
    />
`;
    window.navigator.clipboard.writeText(iframeUrl);
    setEmbedCodeCopied(true);
    setTimeout(() => setEmbedCodeCopied(false), 2024);
  }

  useEffect(() => {
    (async function () {
      if (!currentUser.email || Object.keys(chatbots).length) return;

      setIsLoading(true);

      const docRef = doc(db, "bot_owners", currentUser.email ?? "");
      const docSnap = await getDoc(docRef);
      const data: any = docSnap.data();

      setIsPremium(data.isPremium);
      setHasRequestedPremium(data.hasRequestedPremium);

      const botIds = data.bots ?? [];

      for (let botId of botIds) {
        const docRef = doc(db, "bots", botId ?? "");
        const docSnap = await getDoc(docRef);
        if (docSnap.data()) {
          setChatbots((prev) => {
            return {
              ...prev,
              [botId]: {
                bot_id: botId,
                ...docSnap.data(),
              },
            };
          });
        }
      }
      setIsLoading(false);
    })();
  }, [currentUser?.email]);

  async function saveBotConfig() {
    setIsSaving(true);

    await setDoc(doc(db, "bots", chatbotId ?? ""), {
      messages: chatbotConfig.messages,
      configurations: chatbotConfig.configurations,
    });

    //update name of the chatbot on the chatbots object
    const updatedChatbots = { ...chatbots };
    //@ts-ignore
    updatedChatbots[chatbotId].configurations.title = chatbotConfig?.configurations?.title;
    setChatbots(updatedChatbots);

    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2023);
  }

  async function createBrandNewBot() {
    setIsLoading(true);

    //reset to default config before creating a new bot to prevent copying of current selected bot
    setChatbotConfig(defaultConfig);

    const newBot = await addDoc(collection(db, "bots"), {
      messages: chatbotConfig.messages,
      configurations: chatbotConfig.configurations,
    });

    const uniqueBotIdsSet = new Set([...Object.keys(chatbots), newBot.id]);
    const uniqueBotIds = Array.from(uniqueBotIdsSet);
    // adding the new bot id to the list of bots of the owner
    await setDoc(
      doc(db, "bot_owners", currentUser.email),
      {
        bots: uniqueBotIds,
      },
      { merge: true }
    );

    setChatbotId(newBot.id);
    setChatbots((prev) => {
      return {
        ...prev,
        [newBot.id]: {
          bot_id: newBot.id,
          messages: chatbotConfig.messages,
          configurations: chatbotConfig.configurations,
        },
      };
    });

    setIsLoading(false);
  }

  async function deleteBot(botId: string) {
    if (!deletingBotId) {
      setDeletingBotId(botId);
      setTimeout(() => setDeletingBotId(null), 3000);
      return;
    }

    setIsDeleting(true);
    await deleteDoc(doc(db, "bots", botId));

    const updatedChatbots = { ...chatbots };
    //@ts-ignore
    delete updatedChatbots[botId];
    setChatbots(updatedChatbots);

    //removing this bot_id from bot_owners data set
    const uniqueBotIds = Object.keys(updatedChatbots);
    await setDoc(
      doc(db, "bot_owners", currentUser.email),
      {
        bots: uniqueBotIds,
      },
      { merge: true }
    );

    setIsDeleting(false);
  }

  async function requestPremium() {
    await setDoc(
      doc(db, "bot_owners", currentUser.email),
      {
        hasRequestedPremium: true,
        isPremium: false,
      },
      { merge: true }
    );

    setHasRequestedPremium(true);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <p>Bot {chatbotId} is loading.....</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center mx-auto w-full max-w-[1000px] h-screen">
      <div className="border-r border-l w-full md:w-[50%] overflow-y-auto pb-5">
        <div className="text-sm flex flex-col">
          <div className="px-5 py-2 flex items-center justify-between">
            {chatbotId ? (
              <button onClick={() => setChatbotId("")} className="text-sm flex items-center gap-1">
                <BsArrowLeftShort size={20} />
                <p>Back</p>
              </button>
            ) : (
              <span></span>
            )}

            <div className="gap-3 flex items-center text-sm font-bold">
              <img src={currentUser.photoURL} className="w-6 h-6 rounded-full" />

              <button
                disabled={hasRequestedPremium || isPremium}
                onClick={requestPremium}
                className={`flex items-center gap-2 ${isPremium && "text-[#FFAD01]"}`}
              >
                {isPremium ? "Premium" : hasRequestedPremium ? "Premium pending" : "Upgrade to premium"}
                <AiFillCrown color="#FFAD01" size={20} />
              </button>

              <button
                onClick={() => {
                  setCurrentUser(null);
                  setChatbotConfig(defaultConfig);
                }}
              >
                <MdOutlinePower size={24} color="red" />
              </button>
            </div>
          </div>

          {/* start UI start*/}

          {!chatbotId && (
            <Fragment>
              <div className="p-5 flex flex-col gap-5">
                {Object.values(chatbots).map((chatbot: any) => {
                  return (
                    <div key={chatbot.bot_id} className="flex border items-center justify-between text-sm">
                      <button
                        className="flex w-full  p-3 items-center gap-5 border-r hover:bg-green-500 hover:text-white"
                        onClick={() => {
                          setChatbotId(chatbot.bot_id);
                          setChatbotConfig((prev: any) => {
                            return {
                              ...prev,
                              ...chatbot,
                            };
                          });
                        }}
                      >
                        {" "}
                        <BsRobot size={20} />
                        {chatbot.configurations?.title}
                      </button>

                      <button
                        disabled={isDeleting}
                        onClick={() => deleteBot(chatbot.bot_id)}
                        className={`hover:bg-red-500  hover:text-white h-full flex justify-center items-center w-14 py-3 ${
                          deletingBotId === chatbot.bot_id && "bg-red-500 text-white"
                        }`}
                      >
                        {isDeleting ? (
                          "..."
                        ) : deletingBotId === chatbot.bot_id ? (
                          <AiOutlineCheck size={20} />
                        ) : (
                          <AiOutlineDelete size={20} />
                        )}
                      </button>
                    </div>
                  );
                })}

                <button
                  disabled={Object.keys(chatbots).length >= 3 && !isPremium}
                  className={`hover:bg-green-700 disabled:bg-gray-500 flex items-center  w-56 justify-center gap-2 px-3 py-2 mt-2 bg-green-500 text-sm text-white`}
                  onClick={createBrandNewBot}
                >
                  <AiOutlinePlus size={18} />
                  <p>Create new bot</p>
                </button>

                {Object.keys(chatbots).length >= 3 && !isPremium && (
                  <p className="flex items-start gap-2 text-xs text-red-500">
                    <MdInfo size={30} />
                    <span>
                      You have exceeded your limit of 3 chatbots. You can either delete any of your chatbot and create a
                      new one or update existing one or upgrade to premium account.
                    </span>
                  </p>
                )}
              </div>
            </Fragment>
          )}
          {/* start UI end*/}

          {/* configuration UI start*/}
          {chatbotId && (
            <Fragment>
              <p className="px-5 pt-2 text-lg font-bold">Customize your chatbot</p>

              <p className="text-xs px-5 my-5">
                Selected Chatbot :{" "}
                <select
                  value={chatbotId}
                  className="bg-inherit outline-none border p-1 w-48 truncate max-w-[200px] pr-5"
                  onChange={(e) => {
                    setChatbotId(e.target.value);
                    setChatbotConfig((prev: any) => {
                      return {
                        ...prev,
                        //@ts-ignore
                        ...chatbots[e.target.value],
                      };
                    });
                  }}
                >
                  {Object.values(chatbots).map((chatbot: any) => {
                    return (
                      <option value={chatbot.bot_id} key={chatbot.bot_id}>
                        {chatbot.configurations?.title}
                      </option>
                    );
                  })}
                </select>
              </p>
              <p className="text-xs px-5 mb-3">ChatbotID: {chatbotId}</p>

              <TitlebarStyling />
              <MessageBoxStyling />
              <MessageManager />

              <section className="flex items-center px-5 gap-2 mt-5">
                <input
                  onChange={() =>
                    setChatbotConfig((prev: any) => {
                      return {
                        ...prev,
                        configurations: {
                          ...prev.configurations,
                          isActive: !prev.configurations.isActive,
                        },
                      };
                    })
                  }
                  checked={chatbotConfig.configurations?.isActive}
                  type="checkbox"
                />
                Active
              </section>

              <div className="flex ml-5 text-sm mt-5">
                <button
                  disabled={isSaving}
                  onClick={saveBotConfig}
                  className={`hover:border-green-500 copy-button w-32 border px-3 py-2 ${
                    !isSaved && "bg-green-500 text-white"
                  }`}
                >
                  {isSaving ? "Saving..." : isSaved ? "Saved!" : "Save"}
                </button>
                <button
                  onClick={copyEmbedCode}
                  className={`hover:border-green-500 copy-button w-48 ml-2 border px-3 py-2 ${
                    embedCodeCopied && "bg-green-500 text-white"
                  }`}
                >
                  {embedCodeCopied ? "Copied embed code!" : "Copy embed code"}
                </button>
              </div>
            </Fragment>
          )}
          {/* configuration UI end*/}
        </div>
      </div>

      <div className="w-full pl-5 w-full max-w-[350px]">{chatbotId && <Chatbox chatbotConfig={chatbotConfig} />}</div>
    </div>
  );
}
