import { useRef, useState } from "react";
import useAppContext from "../hooks/useAppContext";

export default function Chatbox() {
  const { chatbotConfig } = useAppContext();
  const messageViewRef = useRef(null);

  //@ts-ignore
  const [replyOptions, setReplyOptions] = useState(chatbotConfig?.messages[1] ?? {});
  const [conversations, setConversations] = useState([]);

  function nextMessage(e:any, message: any) {
    e.preventDefault();

    //@ts-ignore
    setReplyOptions(chatbotConfig.messages[message.nextMessageIndex]);
    //@ts-ignore
    setConversations((prev) => [...prev, replyOptions.message]);
    //@ts-ignore
    setConversations((prev) => [...prev, message.message]);
    //@ts-ignore
    messageViewRef.current?.scrollIntoView({behaviour: 'smooth'})
  }

  return (
    <section className="shadow-md mt-5 text-white border rounded-t-md rounded-b-md">
      <div
        style={{ backgroundColor: chatbotConfig.titleBgColor, color: chatbotConfig.titleTextColor }}
        className="px-2 py-3 chatbot-title-bg rounded-t-md flex items-center gap-2"
      >
        <img src={chatbotConfig.icon} className="chatbot-icon object-cover w-5 h-5" />
        <p>{chatbotConfig.title}</p>
      </div>

      <div className="px-2 h-[400px] p-3 overflow-y-auto" ref={messageViewRef}>
        {conversations.map((conversation, i) => {
          return (
            <div
              key={i}
              className={`${
                i % 2 === 0 ? "float-right text-black border" : "float-left border text-white bg-blue-500"
              } mt-3 text-sm w-[75%] rounded-md`}
            >
              <p className="px-3 py-2">{conversation}</p>
            </div>
          );
        })}

        <div className="w-[75%] float-right border rounded-t-md rounded-b-md mt-3">
          <p className="px-3 py-2 text-black text-sm">{replyOptions.message}</p>
          {replyOptions.responseOptions?.map((message: any, i: number) => {
            return (
              <button
                onClick={(e) => nextMessage(e,message)}
                className={`px-3 text-left w-full text-black  text-sm py-2 border-t-2`}
                key={message.id}
              >
                {message.message}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
