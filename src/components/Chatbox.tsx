import useAppContext from "../hooks/useAppContext";

export default function Chatbox() {
  const { chatbotConfig }: any = useAppContext();

  return (
    <section className="shadow-md mt-5 text-white border rounded-t-md">
      <div
        style={{ backgroundColor: chatbotConfig.titleBgColor, color: chatbotConfig.titleTextColor }}
        className="px-2 py-3 chatbot-title-bg rounded-t-md flex items-center gap-1"
      >
        <img src={chatbotConfig.icon} className="chatbot-icon object-cover w-5 h-5" />
        <p>{chatbotConfig.title}</p>
      </div>

      <div className="bg-white px-2 h-[400px]">
        <p>Robochat</p>
        <div className="float-right text-black bg-blue-500 text-sm w-[75%] rounded-md py-2 text-white px-3">
          <p>{chatbotConfig.initialMessage}</p>
        </div>

        {/* <div className="float-left mt-3 text-black border text-sm w-[75%] rounded-md py-2 text-black px-3">
          <p>Hi, I need some help</p>
        </div> */}
      </div>
    </section>
  );
}
