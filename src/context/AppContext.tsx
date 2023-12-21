import { PropsWithChildren, createContext, useState } from "react";
import { AppContextModel } from "../models";

//@ts-ignore
export const AppContext = createContext<AppContextModel>({});

export function AppContextProvider({ children }: PropsWithChildren) {
  const defaultConfig = {
    configurations: {
      icon: "https://cdn-icons-png.flaticon.com/128/11461/11461820.png",
      titleTextColor: "#ffffff",
      titleBgColor: "#000000",
      title: "Robochat",
      btnBgColor: "black",
      initialMessage: "Hello Beautiful Human, how can I help you today?",
      botMessageBgColor: "#ffffff",
      botMessageTextColor: "#000000",
      userMessageBgColor: "#4682B4",
      userMesssageTextColor: "#ffffff",
      isActive: true
    },
    messages: {
      1: {
        id: 1,
        message: "Hello beautiful person how can I help you today?",
        replyOptions: [
          {
            id: "1A",
            message: "I need some help with verify service BOT 2.",
            nextMessageId: 1,
          },
        ],
      },
    },
  };
  const [chatbotConfig, setChatbotConfig] = useState(defaultConfig);
  const [currentUser, setCurrentUser] = useState(null);

  function getRandomId() {
    const newKey = Math.floor(Math.random() * Date.now());
    return newKey;
  }

  function addMessage(message: string) {
    const newKey = getRandomId();

    setChatbotConfig((prev) => {
      return {
        ...prev,
        messages: {
          ...prev.messages,
          [newKey]: {
            id: newKey,
            message: message,
            replyOptions: [],
          },
        },
      };
    });
  }

  function deleteMessage(messageKey: string) {
    const lastMessages = chatbotConfig.messages;
    //@ts-ignore
    delete lastMessages[messageKey];
    setChatbotConfig((prev) => {
      return {
        ...prev,
        messages: lastMessages,
      };
    });
  }

  function addResponse(messageId: string, response: string) {
    const newKey = getRandomId();

    const lastMessages = chatbotConfig.messages;
    console.log(lastMessages, messageId, response, "log");
    //@ts-ignore
    lastMessages[messageId].replyOptions = [
      //@ts-ignore
      ...lastMessages[messageId].replyOptions,
      {
        id: newKey,
        message: response,
        nextMessageId: messageId,
      },
    ];
    setChatbotConfig((prev) => {
      return {
        ...prev,
        messages: lastMessages,
      };
    });
  }

  function deleteResponse(messageId: string, responseId: string) {
    const lastMessages = chatbotConfig.messages;
    //@ts-ignore
    lastMessages[messageId].replyOptions = lastMessages[messageId].replyOptions.filter(
      (rsp: any) => rsp.id !== responseId
    );
    setChatbotConfig((prev) => {
      return {
        ...prev,
        messages: lastMessages,
      };
    });
  }

  function updateNextMessage(messageId: string, responseIndex: string, nextMessageId: string) {
    const lastMessages = chatbotConfig.messages;
    //@ts-ignore
    lastMessages[messageId].replyOptions[responseIndex].nextMessageId = nextMessageId;
    setChatbotConfig((prev) => {
      return {
        ...prev,
        messages: lastMessages,
      };
    });
  }

  return (
    <AppContext.Provider
      value={{
        chatbotConfig,
        setChatbotConfig,
        addMessage,
        deleteMessage,
        addResponse,
        deleteResponse,
        updateNextMessage,
        currentUser,
        setCurrentUser,
        defaultConfig
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
