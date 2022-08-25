import { useRouter } from "next/router";
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
const SOCKEtT_SERVER_URL = process.env.NEXT_PUBLIC_BACK_END_URL;

const App = () => {
  const { asPath } = useRouter();
  const socket = io(SOCKEtT_SERVER_URL);
  const videoRef = useRef(null);

  const [broadcasterId, setBroadcasterId] = useState("");
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video = Params.get("video");
    const watching = Params.get("streaming");
    if (video?.length && video?.length > 10) {
      setVideoId(video);
    }
  }, [asPath]);

  let peerConnection;

  useEffect(() => {
    socket.on("offer", (id, description) => {
      peerConnection = new RTCPeerConnection(pc_config);
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit("answer", id, peerConnection.localDescription);
        });
      peerConnection.ontrack = (event) => {
        videoRef.current.srcObject = event.streams[0];
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", id, event.candidate);
        }
      };
    });
  }, [socket]);

  useEffect(() => {
    socket.on("candidate", (id, candidate) => {
      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error(e));
    });
  }, [socket]);
  useEffect(() => {
    socket.on("new-broadcaster", (id) => {
      setBroadcasterId(id);
    });
  });

  const handleWatcher = () => {
    socket.emit("watcher", { broadcasterId, videoId });
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
        ref={videoRef}
        muted
        autoPlay
      />
      <button onClick={handleWatcher}>Start {broadcasterId}</button>
    </div>
  );
};

export default App;
