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
  let main0 = 0;
  let main1 = 0;
  const { asPath } = useRouter();
  const socket = io(SOCKEtT_SERVER_URL);
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [broadcasterId, setBroadcasterId] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isConnected, setIsConnected] = useState(false);

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
        if (videoRef.current) {
          if (event.streams[0]) {
            videoRef.current.srcObject = event.streams[0];
            main0 = main0 + 1;
            console.log("data", event.streams[0], main0);
            setIsConnected(true);
            alert("yes");
          } else {
            alert("no");
            setIsConnected(false);
          }
        }

        dispatch(videoLiveIsConnectedReducer());
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", id, event.candidate);
        }
      };
    });

    socket.on("candidate", (id, candidate) => {
      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error(e));
    });
  }, [socket]);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to the ${err.message}`);
    });
    socket.on("new-broadcaster", (id) => {
      setBroadcasterId(id);
    });
    main1 = main1 + 1;
    console.log("is changing", main1);
  });

  useEffect(() => {
    socket.emit("watcher", { broadcasterId, videoId });
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
