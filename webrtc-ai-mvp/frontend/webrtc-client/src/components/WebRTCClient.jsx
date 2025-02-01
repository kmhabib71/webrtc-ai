import { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Ensure your signaling server runs here

function WebRTCClient() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        socket.emit("join-room", { roomId: "12345" });
      });
  }, []);

  return (
    <div>
      <h2>WebRTC Client</h2>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        style={{ width: "300px" }}
      />
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{ width: "300px" }}
      />
    </div>
  );
}

export default WebRTCClient;
