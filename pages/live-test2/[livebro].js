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
  const pcRef = useRef(null);
  const [peerConnections, setPeerConnections] = useState({});
  const VideoRef = useRef(null);
  // const VideoRef = useRef(null);
  const [roomId, setRooomId] = useState("");
  const [broadcaster, setBroadcaster] = useState("");

  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video = Params.get("video");
    const watching = Params.get("streaming");
    if (video?.length && video?.length > 10) {
      setRooomId(video);
      // setVideoTracks();
    }
  }, [asPath]);
  useEffect(() => {
    const localFetch = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (VideoRef.current) VideoRef.current.srcObject = stream;
      } catch (err) {
        console.log(err);
      }
    };
    localFetch();
  }, []);

  useEffect(() => {
    socket.on("broadcaster", (id) => {
      setBroadcaster(id);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("watcher", (id) => {
      const peerConnection = new RTCPeerConnection(pc_config);
      peerConnections[id] = peerConnection;
      console.log("new watcher");
      setPeerConnections((peerConnections[id] = peerConnection));
      let stream = VideoRef.current.srcObject;
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", id, event.candidate);
        }
      };

      peerConnection
        .createOffer()
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit("offer", id, peerConnection.localDescription);
        });
    });
  }, [socket]);

  useEffect(() => {
    socket.on("answer", (id, description) => {
      peerConnections[id].setRemoteDescription(description);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("candidate", (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });
  }, [socket]);

  const handleNewBroadcaster = () => {
    socket.emit("broadcaster", socket.id);
  };

  return (
    <div>
      local video
      <video
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        muted
        ref={VideoRef}
        autoPlay
      />
      <button onClick={handleNewBroadcaster}>Start</button>
    </div>
  );
};

export default App;
