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
      botMessageBgColor: "#ffffff",
      botMessageTextColor: "#000000",
      userMessageBgColor: "#4682B4",
      userMesssageTextColor: "#ffffff",
      messages: {
        1: {
          id:1,
          message: "Hello beautiful person how can I help you today (BOT 1)?",
          replyOptions: [
            {
              id: "1A",
              message: "I need some help with verify service BOT 1.",
              nextMessageId: 2,
            },
            {
              id: "1B",
              message: "I want to learn more about toll free number verification process BOT 1.",
              nextMessageId: 2,
            },
            {
              id: "1C",
              message: "I want to know more about the cash back process for my subscription BOT 1.",
              nextMessageId: 2,
            },
          ],
        },
        2: {
          id:2,
          message: "Do you want to know more about option 2 BOT 1?",
          replyOptions: [
            {
              id: "2A",
              message: "Halleluah 2A BOT 1",
              nextMessageId: 3,
            },
            {
              id: "2B",
              message: "Halleluah 2B BOT 1",
              nextMessageId: 3,
            },
            {
              id: "2C",
              message: "Halleluah 2C BOT 1",
              nextMessageId: 2,
            },
          ],
        },
        3: {
          id:3,
          message: "How can we help you better about option 3 BOT 1?",
          replyOptions: [
            {
              id: "3A",
              message: "Halleluah 3A BOT 1",
              nextMessageId: 2,
            },
            {
              id: "3B",
              message: "Halleluah 3B BOT 1",
              nextMessageId: 2,
            },
            {
              id: "3C",
              message: "Halleluah 3C BOT 1",
              nextMessageId: 2,
            },
          ],
        },
      },
    },
    "2": {
      icon: "https://cdn-icons-png.flaticon.com/128/2593/2593627.png",
      titleTextColor: "#ffffff",
      titleBgColor: "red",
      btnBgColor: "red",
      title: "ChatGPT Killer BOT",
      botMessageBgColor: "#DC143C",
      botMessageTextColor: "#ffffff",
      userMessageBgColor: "#228B22",
      userMesssageTextColor: "#ffffff",
      messages: {
        1: {
          id:1,
          message: "Hello beautiful person how can I help you today (BOT 2)?",
          replyOptions: [
            {
              id: "1A",
              message: "I need some help with verify service BOT 2.",
              nextMessageId: 2,
            },
            {
              id: "1B",
              message: "I want to learn more about toll free number verification process BOT 2.",
              nextMessageId: 2,
            },
            {
              id: "1C",
              message: "I want to know more about the cash back process for my subscription BOT 2.",
              nextMessageId: 2,
            },
          ],
        },
        2: {
          id:2,
          message: "Do you want to know more about option 2 BOT 2?",
          replyOptions: [
            {
              id: "2A",
              message: "Halleluah 2A BOT 2",
              nextMessageId: 3,
            },
            {
              id: "2B",
              message: "Halleluah 2B BOT 2",
              nextMessageId: 3,
            },
            {
              id: "2C",
              message: "Halleluah 2C BOT 2",
              nextMessageId: 2,
            },
          ],
        },
        3: {
          id:3,
          message: "How can we help you better about option 3 BOT 2?",
          replyOptions: [
            {
              id: "3A",
              message: "Halleluah 3A BOT 2",
              nextMessageId: 2,
            },
            {
              id: "3B",
              message: "Halleluah 3B BOT 2",
              nextMessageId: 2,
            },
            {
              id: "3C",
              message: "Halleluah 3C BOT 2",
              nextMessageId: 2,
            },
          ],
        },
      },
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
