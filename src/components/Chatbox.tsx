

import { Fragment, useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";

export default function Chatbox({ chatbotConfig }: any) {
  const messageViewRef = useRef(null);

  const firstKey = chatbotConfig ? Object?.keys(chatbotConfig.messages)?.[0] : null;

  //@ts-ignore
  const [replyOptions, setReplyOptions] = useState(chatbotConfig?.messages?.[firstKey] ?? {});
  const [conversations, setConversations] = useState([]);

  const [showChat, setShowChat] = useState(window.location.pathname === "/");

  useEffect(() => {
    //@ts-ignore
    setReplyOptions(chatbotConfig?.messages?.[firstKey] ?? {});
  }, [firstKey, chatbotConfig]);

  function nextMessage(e: any, message: any) {
    e.preventDefault();

    //@ts-ignore
    setReplyOptions(chatbotConfig.messages[message.nextMessageId]);
    //@ts-ignore
    setConversations((prev) => [...prev, replyOptions.message, message.message]);
  }

  useEffect(() => {
    if (messageViewRef.current) {
      const container = messageViewRef.current;
      //@ts-ignore
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  }, [conversations.length, showChat]);

  return (
    <Fragment>
      {showChat && (
        <div className="fixed right-10 bottom-24 w-full max-w-[350px]">
          <section className="shadow-md mt-5 text-white border rounded-t-md rounded-b-md">
            <div
              style={{
                backgroundColor: chatbotConfig.configurations?.titleBgColor,
                color: chatbotConfig.configurations?.titleTextColor,
              }}
              className="px-2 py-3 chatbot-title-bg rounded-t-md flex items-center gap-2 justify-between"
            >
              <section className="flex items-center gap-2">
                <img
                  src={chatbotConfig.configurations?.icon}
                  className="chatbot-icon object-cover w-6 h-6 rounded-full"
                />
                <p>{chatbotConfig.configurations?.title}</p>
              </section>

              <button
                style={{
                  color: chatbotConfig.configurations?.titleTextColor,
                }}
                onClick={() => setShowChat((prev) => !prev)}
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="bg-white px-2 h-[400px] p-3 overflow-y-auto" ref={messageViewRef}>
              {conversations.map((conversation, i) => {
                // even indexed message is from chatbot
                return (
                  <div
                    key={i}
                    style={
                      i % 2 === 0
                        ? {
                            backgroundColor: chatbotConfig.configurations?.botMessageBgColor,
                            color: chatbotConfig.configurations?.botMessageTextColor,
                          }
                        : {
                            backgroundColor: chatbotConfig.configurations?.userMessageBgColor,
                            color: chatbotConfig.configurations?.userMesssageTextColor,
                          }
                    }
                    className={`${
                      i % 2 === 0 ? "float-right text-black" : "float-left  text-white"
                    } mt-3 text-sm w-[75%] rounded-md border`}
                  >
                    <p className="px-3 py-2">{conversation}</p>
                  </div>
                );
              })}

              <div className="w-[75%] float-right border r-t-md rounded-b-md mt-3">
                {/*@ts-ignore */}
                <p
                  style={{
                    backgroundColor: chatbotConfig.configurations?.botMessageBgColor,
                    color: chatbotConfig.configurations?.botMessageTextColor,
                  }}
                  className="px-3 py-2 text-sm font-medium"
                >
                  {replyOptions?.message}
                </p>
                {/*@ts-ignore */}
                {replyOptions?.replyOptions?.map((message: any, i: number) => {
                  return (
                    <button
                      onClick={(e) => nextMessage(e, message)}
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
        </div>
      )}

      {!showChat && (
        <button
          style={{ background: chatbotConfig.configurations?.btnBgColor }}
          onClick={() => setShowChat((prev) => !prev)}
          className="fixed bottom-10 right-10 mt-5 bg-green-500 h-12 w-12 rounded-full flex flex-col items-center justify-center"
        >
          <IoChatbubbleEllipsesOutline color="white" size={24} />
        </button>
      )}
    </Fragment>
  );
}
