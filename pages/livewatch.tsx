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
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BACK_END_URL!;
let cccc = "df";
const App = () => {
  const socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket", "polling"],
  });
  const pcRef = useRef<RTCPeerConnection>();

  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const setVideoTracks = async () => {
    try {
      if (pcRef.current && socket) {
        pcRef.current.onicecandidate = (e) => {
          if (e.candidate) {
            if (!socket) return;
            socket.emit("candidate", e.candidate);
          }
        };
        pcRef.current.ontrack = (ev) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = ev.streams[0];
          }
        };
        socket.emit("join_room", {
          room: cccc,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    console.log("create offer");
    if (!(pcRef.current && socket)) return;
    try {
      const sdp = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
      socket.emit("offer", sdp);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socket.on("connect_error", (err: any) => {
      console.log(`connect_error due to the ${err.message}`);
    });
    socket.on("connect", () => {
      console.log("you connnected 2");
    });
    pcRef.current = new RTCPeerConnection(pc_config);

    socket.on("all_users", (allUsers: Array<{ id: string }>) => {
      if (allUsers.length > 0) {
       
        createOffer();
      }
    });

    socket.on("getAnswer", (sdp: RTCSessionDescription) => {
      console.log("get answer");
      if (!pcRef.current) return;
      pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socket.on("getCandidate", async (candidate: RTCIceCandidateInit) => {
      if (!pcRef.current) return;
      await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }, []);
  // useEffect(() => {
  //   socket.on("all_users", (allUsers: Array<{ id: string }>) => {
  //     if (allUsers.length > 0) {
  //       alert("1");
  //       setStreams(allUsers);
  //       createOffer();
  //     }
  //   });
  // }, [socket]);
  const [streams, setStreams] = useState([]);
  const [chanelName, setChanelName] = useState("");
  const hanelChange = (e: any) => {
    setChanelName(e.target.value);
    cccc = e.target.value;
  };
  return (
    <div>
      remote video
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        muted
        autoPlay
      />
      <input onChange={hanelChange} />
      <button onClick={setVideoTracks}>Start Watching</button>
    </div>
  );
};

export default App;
