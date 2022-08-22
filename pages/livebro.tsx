import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const pc_config = {
  iceServers: [
    // {
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BACK_END_URL;

const App = () => {
  const socketRef = io(process.env.NEXT_PUBLIC_BACK_END_URL!, {
    transports: ["websocket", "polling"],
  });
  const pcRef = useRef<RTCPeerConnection>();
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const setVideoTracks = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      if (pcRef.current && socketRef) {
        stream.getTracks().forEach((track) => {
          if (pcRef.current) {
            pcRef.current.addTrack(track, stream);
          }
        });
        pcRef.current.onicecandidate = (e) => {
          if (e.candidate) {
            if (!socketRef) return;
            socketRef.emit("candidate", e.candidate);
          }
        };
        pcRef.current.oniceconnectionstatechange = (e) => {
          console.log(e);
        };
        socketRef.emit("create_room", {
          room: chanelName,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    if (!(pcRef.current && socketRef)) return;
    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
      console.log("answer set remote description success");
      const mySdp = await pcRef.current.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      });
      console.log("create answer");
      await pcRef.current.setLocalDescription(new RTCSessionDescription(mySdp));
      socketRef.emit("answer", mySdp);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.on("connect_error", (err: any) => {
      console.log(`connect_error due to the ${err.message}`);
    });
    socketRef.on("connect", () => {
      console.log("you connnected 2");
    });
    pcRef.current = new RTCPeerConnection(pc_config);

    socketRef.on("getOffer", (sdp: RTCSessionDescription) => {
      console.log("get offer");
      createAnswer(sdp);
    });

    socketRef.on("getAnswer", (sdp: RTCSessionDescription) => {
      console.log("get answer");
      if (!pcRef.current) return;
      pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socketRef.on("getCandidate", async (candidate: RTCIceCandidateInit) => {
      if (!pcRef.current) return;
      await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }, []);
  const [chanelName, setChanelName] = useState("");
  const hanelChange = (e: any) => {
    setChanelName(e.target.value);
  };
  return (
    <div>
      <video
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        muted
        ref={localVideoRef}
        autoPlay
      />
      <input onChange={hanelChange} />
      <button onClick={setVideoTracks}>Go Live</button>
    </div>
  );
};

export default App;
