import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const LiveVideo = () => {
  const socketRef = useRef(io);
  const pcRef = useRef<RTCPeerConnection>();
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection>();
  const [ActiveVideoLive, setActiveVideoLive] = useState("");
  const socketRedux = useSelector(
    (state: any) => state.socketSlice.socketRedux
  );
  const { asPath } = useRouter();
  const isSocket = useSelector((state: any) => state.socketSlice.isSocket);

  async function init() {
    const peer = createPeer();
    if (peer) {
      peer.addTransceiver("video", { direction: "recvonly" });
      peer.addTransceiver("audio", { direction: "recvonly" });
    }
  }

  function createPeer() {
    const peer = peerRef.current;
    if (peer) {
      peer.ontrack = handleTrackEvent;
      peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    }

    return peer;
  }

  async function handleNegotiationNeededEvent(peer: any) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BACK_END_URL + "/api/post/stream/join-stream",
      { sdp: payload, roomId: ActiveVideoLive }
    );
    console.log(ActiveVideoLive, data);

    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e: any) => console.log(e));

    // socketRedux.emit("join-watch-stream", {
    //   body: payload,
    //   roomId: "123456787654323456",
    // });
  }

  function handleTrackEvent(e: any) {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = e.streams[0];
    }
  }
  useEffect(() => {
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    // if (isSocket) {
    //   socketRedux.on("start-watching-stream", async (data: any) => {
    //     console.log("here", data);
    //     const desc = new RTCSessionDescription(data.sdp);
    //     if (peerRef.current) {
    //       peerRef.current
    //         .setRemoteDescription(desc)
    //         .catch((e: any) => console.log(e));
    //     }
    //   });
    // }
  }, [socketRedux, isSocket]);
  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video: string | null = Params.get("video");
    const liveStreaming: string | null = Params.get("live-streaming");
    if (video) {
      setActiveVideoLive(video);
    }
  }, [asPath]);

  return (
    <div>
      <video
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
      <button onClick={init}>go Live </button>
    </div>
  );
};

export default LiveVideo;
