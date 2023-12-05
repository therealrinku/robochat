import { PropsWithChildren, createContext, useState } from "react";
import { AppContextModel } from "../models";

//@ts-ignore
export const AppContext = createContext<AppContextModel>({});

export function AppContextProvider({ children }: PropsWithChildren) {
  const defaultConfig = {
    icon: "https://cdn-icons-png.flaticon.com/128/11461/11461820.png",
    titleTextColor: "#ffffff",
    titleBgColor: "#000000",
    title: "Robochat",
    btnBgColor: "black",
    initialMessage: "Hello Beautiful Human, how can I help you today?",
    messages: {
      1: {
        message: "Hello beautiful person how can I help you today (BOT 1)?",
        responseOptions: [
          {
            id: "1A",
            message: "I need some help with verify service BOT 1.",
            nextMessageIndex: 2,
          },
          {
            id: "1B",
            message: "I want to learn more about toll free number verification process BOT 1.",
            nextMessageIndex: 2,
          },
          {
            id: "1C",
            message: "I want to know more about the cash back process for my subscription BOT 1.",
            nextMessageIndex: 2,
          },
        ],
      },
      2: {
        message: "Do you want to know more about option 2 BOT 1?",
        responseOptions: [
          {
            id: "2A",
            message: "Halleluah 2A BOT 1",
            nextMessageIndex: 3,
          },
          {
            id: "2B",
            message: "Halleluah 2B BOT 1",
            nextMessageIndex: 3,
          },
          {
            id: "2C",
            message: "Halleluah 2C BOT 1",
            nextMessageIndex: 2,
          },
        ],
      },
      3: {
        message: "How can we help you better about option 3 BOT 1?",
        responseOptions: [
          {
            id: "3A",
            message: "Halleluah 3A BOT 1",
            nextMessageIndex: 2,
          },
          {
            id: "3B",
            message: "Halleluah 3B BOT 1",
            nextMessageIndex: 2,
          },
          {
            id: "3C",
            message: "Halleluah 3C BOT 1",
            nextMessageIndex: 2,
          },
        ],
      },
    },
  };
  const [chatbotConfig, setChatbotConfig] = useState(defaultConfig);

  return <AppContext.Provider value={{ chatbotConfig, setChatbotConfig }}>{children}</AppContext.Provider>;
}
