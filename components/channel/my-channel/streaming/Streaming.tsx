import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
const Streaming = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection>();

  const socketRedux = useSelector(
    (state: any) => state.socketSlice.socketRedux
  );
  const channels = useSelector((state: any) => state.ChannelSlice.allChannels);
  const channelId = channels[0]?._id;
  const isSocket = useSelector((state: any) => state.socketSlice.isSocket);

  async function init() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    const peer = createPeer();
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  }

  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
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

  // useEffect(() => {
  //   peerRef.current = new RTCPeerConnection({
  //     iceServers: [
  //       {
  //         urls: "stun:stun.stunprotocol.org",
  //       },
  //     ],
  //   });

  //   // if (isSocket) {
  //   //   socketRedux.on("broadcasting-stream", async (data: any) => {
  //   //     const desc = new RTCSessionDescription(data.sdp);
  //   //     if (peerRef.current) {
  //   //       peerRef.current
  //   //         .setRemoteDescription(desc)
  //   //         .catch((e: any) => console.log(e));
  //   //     }
  //   //   });
  //   // }
  // }, [socketRedux]);

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
