export interface ChatbotModel {
  icon: string;
  titleTextColor: string;
  titleBgColor: string;
  title: string;
  btnBgColor: string;
  initialMessage: string;
}

export interface AppContextModel {
  chatbotConfig: ChatbotModel;
  setChatbotConfig: Function;
}
