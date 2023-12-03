import TitlebarStyling from "../components/Styling/TitlebarStyling";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row justify-center mx-auto w-full max-w-[1000px] h-screen">
      <div className="border-r border-l w-full md:w-[50%]">
        <div className="text-sm flex flex-col gap-5">
          <p className="px-5 pt-2 text-lg">Customize your chatbot</p>
          <p className="text-xs px-5">chatbotID: 49040rfke39r</p>
          <TitlebarStyling />

          <button className="copy-button w-56 ml-5 p-1 bg-green-500 text-white">Copy embed code</button>
        </div>
      </div>

      <div className="w-full md:w-[50%] pl-5">
        <section className="chatbot mt-5 text-white border rounded-t-md">
          <div className="px-2 py-3 chatbot-title-bg bg-red-500 rounded-t-md flex items-center gap-1">
            <img
              src="https://cdn-icons-png.flaticon.com/128/11461/11461820.png"
              className="chatbot-icon object-cover w-5 h-5"
            />
            <p className="chatbot-title">Chatbot title</p>
          </div>

          <div className="chatbot-body bg-white px-2 h-[400px]">
            <p>Robochat</p>
            <div className="chatbot-message float-right text-black bg-blue-500 text-sm w-[75%] rounded-md py-2 text-white px-3">
              <p>How can I help you, beautiful human being?</p>
            </div>

            <div className="chatbot-user-message float-left mt-3 text-black border text-sm w-[75%] rounded-md py-2 text-black px-3">
              <p>Hi, I need some help</p>
            </div>
          </div>

          <div className="chatbot-bottom text-black bg-white border-t">
            <input
              placeholder="What's up?"
              className="chatbot-input outline-none p-1 py-3 w-full bg-white"
              type="text"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
