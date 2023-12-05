import { useState } from "react";
import useAppContext from "../hooks/useAppContext";

export default function Chatbox() {
  const { chatbotConfig } = useAppContext();

  const messages = {
    1: [
      {
        id: "1A",
        message: "Do you know?",
        nextMessageIndex: 2,
      },
      {
        id: "1B",
        message: "Do you have something?",
        nextMessageIndex: 2,
      },
      {
        id: "1C",
        message: "Halleluah",
        nextMessageIndex: 2,
      },
    ],
    2: [
      {
        id: "2A",
        message: "Halleluah 2A",
        nextMessageIndex: 3,
      },
      {
        id: "2B",
        message: "Halleluah 2B",
        nextMessageIndex: 3,
      },
      {
        id: "2C",
        message: "Halleluah 2C",
        nextMessageIndex: 2,
      },
    ],
    3: [
      {
        id: "3A",
        message: "Halleluah 3A",
        nextMessageIndex: 2,
      },
      {
        id: "3B",
        message: "Halleluah 3B",
        nextMessageIndex: 2,
      },
      {
        id: "3C",
        message: "Halleluah 3C",
        nextMessageIndex: 2,
      },
    ],
  };

  const [replyOptions, setReplyOptions] = useState(messages[1]);
  const [conversations, setConversations] = useState([chatbotConfig.initialMessage]);

  function nextMessage(message: any) {
    //@ts-ignore
    setReplyOptions(messages[message.nextMessageIndex]);
    setConversations((prev) => [...prev, message.message]);
  }

  return (
    <section className="shadow-md mt-5 text-white border rounded-t-md">
      <div
        style={{ backgroundColor: chatbotConfig.titleBgColor, color: chatbotConfig.titleTextColor }}
        className="px-2 py-3 chatbot-title-bg rounded-t-md flex items-center gap-1"
      >
        <img src={chatbotConfig.icon} className="chatbot-icon object-cover w-5 h-5" />
        <p>{chatbotConfig.title}</p>
      </div>

      <div className="bg-white px-2 h-[400px] mt-3 overflow-y-auto mb-4">
        {conversations.map((conversation, i) => {
          return (
            <div
              key={i}
              className={`${
                i === 0 ? "float-right text-white bg-blue-500" : "float-left border text-black"
              } mt-3 text-sm w-[75%] rounded-md py-2 px-3`}
            >
              <p>{conversation}</p>
            </div>
          );
        })}

        <div className="float-right w-[75%] mt-3 flex flex-col gap-2 border rounded-t-md rounded-b-md">
          {replyOptions.map((message, i) => {
            return (
              <button
                onClick={() => nextMessage(message)}
                className={`text-left text-black  text-sm py-2 px-3 ${i !== 0 && "border-t"}`}
                key={message.id}
              >
                {message.message}
              </button>
            );
          })}
        </div>

        {/* <div className="float-left mt-3 text-black border text-sm w-[75%] rounded-md py-2 text-black px-3">
          <p>Hi, I need some help</p>
        </div> */}
      </div>
    </section>
  );
}
