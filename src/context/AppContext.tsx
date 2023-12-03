import { PropsWithChildren, createContext, useState } from "react";
import { AppContextModel } from "../models";

export const AppContext = createContext<AppContextModel>({ chatbotConfig: {}, setChatbotConfig: () => {} });

export function AppContextProvider({ children }: PropsWithChildren) {
  const defaultConfig = {
    icon: "https://cdn-icons-png.flaticon.com/128/11461/11461820.png",
    titleTextColor: "#ffffff",
    titleBgColor: "#000000",
    title: "Robochat",
  };
  const [chatbotConfig, setChatbotConfig] = useState(defaultConfig);

  return <AppContext.Provider value={{ chatbotConfig, setChatbotConfig }}>{children}</AppContext.Provider>;
}
