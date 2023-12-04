import { Fragment, useState } from "react";
import Chatbox from "../components/Chatbox";
import { IoChatbubbleEllipsesOutline, IoArrowBack, IoWarning } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

export default function Bot() {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const { botId } = useParams();

  const appHosts = ["localhost:3000", "robochatbot.vercel.app"];

  if (botId !== "49040rfke39r" && appHosts.includes(window.location.host)) {
    return (
      <div className="text-center text-red-500 flex flex-col h-screen items-center justify-center">
        <IoWarning size={50} />
        <p className="mt-5">Invalid bot id</p>
        <button onClick={() => navigate("/")} className="fixed left-10 top-10 bg-[rgba(0,0,0,0.09)] p-3 rounded">
          <IoArrowBack size={20} />
        </button>
      </div>
    );
  }

  return (
    <Fragment>
      {appHosts.includes(window.location.host) && (
        <button onClick={() => navigate("/")} className="fixed left-10 top-10 bg-[rgba(0,0,0,0.09)] p-3 rounded">
          <IoArrowBack size={20} />
        </button>
      )}

      {showChat && (
        <div className="fixed right-10 bottom-32 w-full max-w-[350px]">
          <Chatbox />
        </div>
      )}

      <button
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-10 right-10 mt-5 bg-green-500 p-3 rounded-full flex flex-col items-center justify-center"
      >
        <IoChatbubbleEllipsesOutline color="white" size={22} />
      </button>
    </Fragment>
  );
}
