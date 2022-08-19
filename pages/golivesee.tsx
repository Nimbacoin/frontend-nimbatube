import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
const App = () => {
  const socketRef = useRef(io);
  const pcRef = useRef<RTCPeerConnection>();
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  async function init() {
    const peer = createPeer();
    peer.addTransceiver("video", { direction: "recvonly" });
  }

  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
  }

  async function handleNegotiationNeededEvent(peer: any) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const { data } = await axios.post(process.env.NEXT_PUBLIC_BACK_END_URL +"/consumer", payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e: any) => console.log(e));
  }

  function handleTrackEvent(e: any) {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = e.streams[0];
    }
  }

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
        ref={remoteVideoRef}
        autoPlay
      />
      <button onClick={init}>go Live </button>
    </div>
  );
};

export default App;
