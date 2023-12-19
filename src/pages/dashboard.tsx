import Chatbox from "../components/Chatbox";
import MessageManager from "../components/MessageManager";
import MessageBoxStyling from "../components/Styling/MessageBoxStyling";
import TitlebarStyling from "../components/Styling/TitlebarStyling";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const chatbotId = Math.floor(Math.random() * Date.now());

  const { chatbotConfig } = useAppContext();

  function copyEmbedCode() {
    const iframeUrl = `
    <iframe
    title="Example Iframe"
    src="${window.location.origin}/bot/1"
    frameBorder="0"
    style="position: fixed; width: 400px; height: 100%; bottom: 0; right: 0; z-index: 111"
    />
`;
    window.navigator.clipboard.writeText(iframeUrl);
    alert("Copied");
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
            <button onClick={copyEmbedCode} className="copy-button w-32 p-1 bg-green-500 text-white">
              Copy embed code
            </button>
            <button onClick={() => navigate(`/bot/1`)} className="copy-button w-32 ml-5 p-1 bg-green-500 text-white">
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
