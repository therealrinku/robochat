import Chatbox from "../components/Chatbox";
import MessageManager from "../components/MessageManager";
import MessageBoxStyling from "../components/Styling/MessageBoxStyling";
import TitlebarStyling from "../components/Styling/TitlebarStyling";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ChatbotModel } from "../models";

export default function Dashboard() {
  const navigate = useNavigate();
  const [chatbotId, setChatbotId] = useState("");
  const [chatbotIdInput, setChatbotIdInput] = useState("");
  const [botNotFound, setBotNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { chatbotConfig, setChatbotConfig } = useAppContext();

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
    alert("Copied");
  }

  useEffect(() => {
    (async function () {
      if (!chatbotId) return;
      const docRef = doc(db, "bots", chatbotId ?? "");
      const docSnap = await getDoc(docRef);
      const data: any = docSnap.data();

      setIsLoading(false);

      if (!data) {
        setBotNotFound(true);
        return;
      }

      setChatbotConfig((prev: ChatbotModel) => {
        return {
          ...prev,
          configurations: data.configurations,
          messages: data.messages,
        };
      });
    })();
  }, [chatbotId]);

  async function saveBotConfig() {
    await setDoc(doc(db, "bots", chatbotId ?? ""), {
      messages: chatbotConfig.messages,
      configurations: chatbotConfig.configurations,
    });

    alert("Save success!!");
  }

  if (!chatbotId)
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <p className="mb-5 text-lg italic">Robochatbot</p>
        <div className="flex items-center gap-2">
          <input
            placeholder="Your BOT ID"
            className="border outline-none pl-2 py-1 w-[200px]"
            value={chatbotIdInput}
            onChange={(e) => setChatbotIdInput(e.target.value)}
          />
          <button onClick={chatbotIdInput.trim() ? () => setChatbotId(chatbotIdInput) : () => {}}>
            <AiOutlineCheckCircle size={25} />
          </button>
        </div>

        <button
          disabled
          className="border py-1 px-3 mt-2 w-[235px] bg-gray-500 text-sm text-white"
          onClick={chatbotIdInput.trim() ? () => setChatbotId(chatbotIdInput) : () => {}}
        >
          <p>Create new bot (coming soon)</p>
        </button>
      </div>
    );

  if (botNotFound)
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <p>Bot {chatbotId} not found!</p>
        <button
          className="border py-1 px-3 mt-2 w-[235px] bg-green-500 text-sm text-white"
          onClick={() => {
            setBotNotFound(false);
            setChatbotId("");
          }}
        >
          Try again
        </button>
      </div>
    );

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
          <p className="px-5 pt-2 text-lg font-bold">Customize your chatbot</p>
          <p className="text-xs px-5 my-5">
            chatbotID: <span className="font-bold">{chatbotId}</span>
          </p>

          <TitlebarStyling />
          <MessageBoxStyling />
          <MessageManager />

          <div className="flex ml-5 text-sm mt-5">
            <button onClick={saveBotConfig} className="copy-button w-20  p-1 bg-green-500 text-white">
              Save
            </button>
            <button onClick={copyEmbedCode} className="copy-button w-48 ml-5 p-1 bg-green-500 text-white">
              Copy embed code
            </button>
            <button
              onClick={() => navigate(`/bot/${chatbotId}`)}
              className="copy-button w-20 ml-5 p-1 bg-green-500 text-white"
            >
              See
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
