import { useState } from "react";
import Chatbox from "../components/Chatbox";
import { IoChatbubbleEllipsesOutline, IoArrowBack, IoWarning } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

export default function Bot() {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const { botId } = useParams();

  if (botId !== "49040rfke39r") {
    return (
      <div style={{ textAlign: "center", color: "red", display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <IoWarning size={50} />
        <p style={{ marginTop: "5px" }}>Invalid bot id</p>
        <button onClick={() => navigate("/")} style={{ position: "fixed", left: "10px", top: "10px", background: "rgba(0,0,0,0.09)", padding: "10px", borderRadius: "5px" }}>
          <IoArrowBack size={20} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", width: "100%", alignItems: "flex-end", maxWidth: "1400px", margin: "0 auto", flexDirection: "column" }}>
      <button onClick={() => navigate("/")} style={{ position: "fixed", left: "10px", top: "10px", background: "rgba(0,0,0,0.09)", padding: "10px", borderRadius: "5px" }}>
        <IoArrowBack size={20} />
      </button>

      {showChat && (
        <div style={{ position: "fixed", top: "10px", width: "350px" }}>
          <Chatbox />
        </div>
      )}

      <button
        onClick={() => setShowChat((prev) => !prev)}
        style={{ position: "fixed", bottom: "10px", marginTop: "5px", background: "green", padding: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IoChatbubbleEllipsesOutline color="white" size={22} />
      </button>
    </div>
  );
}
