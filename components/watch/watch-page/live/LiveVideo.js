import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import Style from "../../../../styles/pages/watch/leftside/video.module.css";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";

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

  useEffect(() => {
    if (videoId.length > 10) {
      socket.emit("watcher", { broadcasterId, videoId });
    }
  }, [videoId]);

  return (
    <>
    <div className={Style.div_container_video_1000}></div>
      <div className={Style.video_container}>
        <div className={Style.on_live_container}>
          <div className={Style.viewers_red}>
            <IoVideocamOutline />
            <span className={Style.file_text_title_bold_viewers}>· LIVE</span>
          </div>
          <div className={Style.viewers}>
            <IoEyeOutline />
            <span className={Style.file_text_title_bold_viewers}>
              12 viewers
            </span>
          </div>
        </div>
        <div className={Style.video_container_2}>
          <video
            clasasName={Style.video}
            id="remotevideo"
            ref={videoRef}
            autoPlay
            muted
          ></video>
        </div>
      </div>
    </>
  );
};

export default App;
