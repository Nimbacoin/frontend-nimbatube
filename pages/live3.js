import React, { useEffect, useRef, useState } from "react";

import io from "socket.io-client";

const Watch = () => {
  const config = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"],
      },
    ],
  };

  const ENDPOINT = "http://localhost:5000";
  const socket = io(ENDPOINT);

  let peerConnection;
  const videoRef = useRef();

  useEffect(() => {
    socket.on("offer", (id, description) => {
      peerConnection = new RTCPeerConnection(config);
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
    socket.on("disconnectPeer", () => {
      peerConnection.close();
    });
  }, [socket]);

  const handleWatcher = () => {
    socket.emit("watcher", User);
  };
  const [User, setUser] = useState("");
  useEffect(() => {
    socket.emit("users", "");
    socket.on("here-is-all-ids", (id) => {
      alert("here-is-all-ids", id);
      setUser(id);
    });
  }, [socket]);

  return (
    <div className="watch__main-container">
      <div className="watch__sub-container">
        <h1 className="watch__header">Watch {User}</h1>
        <video className="video" autoPlay={true} ref={videoRef} />
      </div>
      <button className="watch__button" onClick={() => handleWatcher()}>
        Connect
      </button>
    </div>
  );
};

export default Watch;
