import { Fragment, useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Bot() {
  const { botId } = useParams();

  const [botConfig, setBotConfig] = useState(null);

  useEffect(() => {
    (async function () {
      if (!botId) return;
      const docRef = doc(db, "bots", botId);
      const docSnap = await getDoc(docRef);
      //@ts-ignore
      setBotConfig(docSnap.data() ?? "");
    })();
  }, [botId]);

  console.log("ROBOCHATBOT ALERT: BOT ID IS INVALID");

  if (!botConfig) return <></>;

  return (
    <Fragment>
      {/*@ts-ignore*/}
      <Chatbox chatbotConfig={botConfig ?? {}} />
    </Fragment>
  );
}
