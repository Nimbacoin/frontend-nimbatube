import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
const Streaming = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  async function init() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      const peer = createPeer();
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    }
  }

  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
  }

  async function handleNegotiationNeededEvent(peer: any) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BACK_END_URL + "/broadcast",
      payload
    );
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e: any) => console.log(e));
  }
  useEffect(() => {}, []);

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
      <button onClick={init}>go Live </button>
    </div>
  );
};

export default Streaming;
