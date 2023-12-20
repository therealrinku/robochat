import Chatbox from "../components/Chatbox";
import MessageManager from "../components/MessageManager";
import MessageBoxStyling from "../components/Styling/MessageBoxStyling";
import TitlebarStyling from "../components/Styling/TitlebarStyling";
import useAppContext from "../hooks/useAppContext";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { BsRobot } from "react-icons/bs";

export default function Dashboard() {
  const [chatbotId, setChatbotId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [embedCodeCopied, setEmbedCodeCopied] = useState(false);

  const [chatbots, setChatbots] = useState({});
  const { chatbotConfig, setChatbotConfig, currentUser }: any = useAppContext();

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
      if (!currentUser.email) return;

      setIsLoading(true);

      const docRef = doc(db, "bot_owners", currentUser.email ?? "");
      const docSnap = await getDoc(docRef);
      const data: any = docSnap.data();

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

    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2023);
  }

  async function createBrandNewBot() {
    setIsLoading(true);

    const newBot = await addDoc(collection(db, "bots"), {
      messages: chatbotConfig.messages,
      configurations: chatbotConfig.configurations,
    });

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

    const uniqueBotIdsSet = new Set([...Object.keys(chatbots), newBot.id]);
    const uniqueBotIds = Array.from(uniqueBotIdsSet);
    // adding the new bot id to the list of bots of the owner
    await setDoc(doc(db, "bot_owners", currentUser.email), {
      bots: uniqueBotIds,
    });

    setIsLoading(false);
    alert("New bot created successfully!!");
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <p>Bot {chatbotId} is loading.....</p>
      </div>
    );
  }

  if (!chatbotId)
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <p className="mb-5 text-lg italic">Robochatbot</p>

        {!Object.keys(chatbots).length && <p className="text-red-500">No any bots founds, create a new one!</p>}

        <div className="flex flex-col gap-5 my-5">
          {Object.values(chatbots).map((chatbot: any) => {
            return (
              <button
                className="border rounded-md hover:bg-green-500 hover:text-white  p-3 flex items-center gap-2 text-sm"
                onClick={() => {
                  setChatbotId(chatbot.bot_id);
                  setChatbotConfig((prev: any) => {
                    return {
                      ...prev,
                      ...chatbot,
                    };
                  });
                }}
                key={chatbot.bot_id}
              >
                <BsRobot size={20} />
                {chatbot.configurations?.title}
              </button>
            );
          })}
        </div>

        <button
          className="border rounded-md p-3 mt-2 w-[235px] bg-green-500 text-sm text-white"
          onClick={createBrandNewBot}
        >
          <p>Create new bot</p>
        </button>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row justify-center mx-auto w-full max-w-[1000px] h-screen">
      <div className="border-r border-l w-full md:w-[50%] overflow-y-auto pb-5">
        <div className="text-sm flex flex-col">
          <p className="px-5 pt-2 text-lg font-bold">Customize your chatbot</p>
          <p className="text-xs px-5 my-5">
            Selected Chatbot :{" "}
            <select
              value={chatbotId}
              className="bg-inherit outline-none border p-1"
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

          <div className="flex ml-5 text-sm mt-5">
            <button
              disabled={isSaving}
              onClick={saveBotConfig}
              className={`copy-button w-20 border rounded-md p-1 ${isSaved && "bg-green-500 text-white"}`}
            >
              {isSaving ? "Saving..." : isSaved ? "Saved!" : "Save"}
            </button>
            <button
              onClick={copyEmbedCode}
              className={`copy-button w-48 ml-2 border rounded-md p-1 ${embedCodeCopied && "bg-green-500 text-white"}`}
            >
              {embedCodeCopied ? "Copied embed code!" : "Copy embed code"}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full pl-5 w-full max-w-[350px]">
        <Chatbox chatbotConfig={chatbotConfig} />
      </div>
    </div>
  );
}
