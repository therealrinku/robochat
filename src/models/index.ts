export interface ChatbotModel {
  configurations: {
    icon: string;
    titleTextColor: string;
    titleBgColor: string;
    title: string;
    btnBgColor: string;
    initialMessage: string;
    botMessageBgColor: string;
    botMessageTextColor: string;
    userMessageBgColor: string;
    userMesssageTextColor: string;
  };
  messages: object;
}

export interface AppContextModel {
  chatbotConfig: ChatbotModel;
  setChatbotConfig: Function;
  addMessage: Function;
  deleteMessage: Function;
  deleteResponse: Function;
  addResponse: Function;
  updateNextMessage: Function;
}
