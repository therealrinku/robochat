import { Fragment, useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Bot() {
  const { botId } = useParams();

  const [botConfig, setBotConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (!botId) return;
      const docRef = doc(db, "bots", botId);
      const docSnap = await getDoc(docRef);
      //@ts-ignore
      setBotConfig(docSnap.data() ?? "");
      setIsLoading(false);
    })();
  }, [botId]);

  if(isLoading) return <></>

  if (!botConfig && !isLoading) {
    console.log(`ROBOCHATBOT ALERT: Bot ${botId} doesn't exist.`);
    return <></>;
  }

  //@ts-ignore
  if (!botConfig.configurations?.isActive && !isLoading) {
    console.log(`ROBOCHATBOT ALERT: Bot ${botId} is inactive. Please make it active if you want to use it.`);
    return <></>;
  }

  return (
    <Fragment>
      {/*@ts-ignore*/}
      <Chatbox chatbotConfig={botConfig ?? {}} />
    </Fragment>
  );
}
