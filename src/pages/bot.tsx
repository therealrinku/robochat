import { Fragment, useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Bot() {
  const [showChat, setShowChat] = useState(false);
  const { botId } = useParams();

  const [botConfig, setBotConfig] = useState({});

  useEffect(() => {
    (async function () {
      const docRef = doc(db, "bots", botId ?? "");
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      setBotConfig(docSnap.data() ?? '');
    })();
  }, []);

console.log("ROBOCHATBOT ALERT: BOT ID IS INVALID")

  if (!botConfig) return <></>;

  return (
    <Fragment>
      {showChat && (
        <div className="fixed right-10 bottom-32 w-full max-w-[350px]">
          {/*@ts-ignore*/}
          <Chatbox chatbotConfig={botConfig ?? {}} />
        </div>
      )}

      {/*@ts-ignore*/}
      <button style={{ background: botConfig.configurations?.btnBgColor }}
        onClick={() => setShowChat((prev) => !prev)}
        className="fixed bottom-10 right-10 mt-5 bg-green-500 h-12 w-12 rounded-full flex flex-col items-center justify-center"
      >
        {showChat ? <IoClose color="white" size={24} /> : <IoChatbubbleEllipsesOutline color="white" size={24} />}
      </button>
    </Fragment>
  );
}
