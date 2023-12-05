import { Fragment, useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import { IoChatbubbleEllipsesOutline, IoArrowBack, IoWarning } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import { ChatbotModel } from "../models";

export default function Bot() {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const { botId } = useParams();

  const { chatbotConfig, setChatbotConfig } = useAppContext();

  const botConfigs = {
    "1": {
      icon: "https://cdn-icons-png.flaticon.com/128/11461/11461820.png",
      titleTextColor: "#ffffff",
      titleBgColor: "#000000",
      btnBgColor: "black",
      title: "Robochat",
      initialMessage: "Hello Beautiful Person, How can I help you today?",
    },
    "2": {
      icon: "https://cdn-icons-png.flaticon.com/128/2593/2593627.png",
      titleTextColor: "#ffffff",
      titleBgColor: "red",
      btnBgColor: "red",
      title: "ChatGPT Killer BOT",
      initialMessage: "Hello Beautiful Human, how can I help you today?",
    },
  };

  //update chatbot config
  useEffect(() => {
    //@ts-ignore
    const config = botConfigs[botId];
    setChatbotConfig((prev: ChatbotModel) => (config ? config : prev));
  }, [botId]);

  //@ts-ignore
  if (!botConfigs[botId]) {
    return (
      <div className="text-center text-red-500 flex flex-col h-screen items-center justify-center">
        <IoWarning size={50} />
        <p className="mt-5">Invalid bot id</p>
        <button onClick={() => navigate("/")} className="fixed left-10 top-10 bg-[rgba(0,0,0,0.09)] p-3 rounded">
          <IoArrowBack size={20} />
        </button>
      </div>
    );
  }

  return (
    <Fragment>
      {showChat && (
        <div className="fixed right-10 bottom-32 w-full max-w-[350px]">
          <Chatbox />
        </div>
      )}

      <button
        style={{ background: chatbotConfig.btnBgColor }}
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-10 right-10 mt-5 bg-green-500 h-12 w-12 rounded-full flex flex-col items-center justify-center"
      >
        <IoChatbubbleEllipsesOutline color="white" size={24} />
      </button>
    </Fragment>
  );
}
