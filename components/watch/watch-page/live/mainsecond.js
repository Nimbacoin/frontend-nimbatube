import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import Style from "../../../../styles/pages/watch/leftside/video.module.css";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import { useDispatch } from "react-redux";
import { videoLiveIsConnectedReducer } from "../../../../redux/video-slice/VideoSlice";

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
  const dispatch = useDispatch();
  const [broadcasterId, setBroadcasterId] = useState("");
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    socket.on("new-live-record", (data) => {
      const blob = new Blob(data, { type: "video/mp4" });
      // second.current.src = blob;
      const url = URL.createObjectURL(blob);
      videoRef.current.src = url;
    });
  }, [socket]);

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
              0 viewers
            </span>
          </div>
        </div>
        <div className={Style.video_container_2}>
          <video
            className={Style.video}
            id="remotevideo"
            ref={videoRef}
            autoPlay
          ></video>
        </div>
      </div>
    </>
  );
};

export default App;
