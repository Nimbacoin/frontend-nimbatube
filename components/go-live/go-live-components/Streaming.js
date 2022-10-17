import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Style from "../../../styles/pages/go-live/go-live-components/stream.module.css";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
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

const Streaming = () => {
  const { asPath } = useRouter();
  const socket = io(SOCKEtT_SERVER_URL);
  const pcRef = useRef(null);
  const [peerConnections, setPeerConnections] = useState({});
  const VideoRef = useRef(null);
  const [videoId, setVideoId] = useState("");
  const [broadcaster, setBroadcaster] = useState("");
  const [viewers, setViewers] = useState([]);
  const WindowHeight = useSelector((state) => state.GenrealStyle.WindowHeight);

  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video = Params.get("video");
    if (video?.length && video?.length > 10) {
      setVideoId(video);
    }
  }, [asPath]);
  useEffect(() => {
    const localFetch = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (VideoRef.current) {
          VideoRef.current.srcObject = stream;
        }
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
    socket.on("watcher-leave", ({ viewers }) => {
      setViewers(viewers);
    });
    socket.on("watcher", ({ id, viewers }) => {
      setViewers(viewers);
      const peerConnection = new RTCPeerConnection(pc_config);
      peerConnections[id] = peerConnection;
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
    setStarted(false)
    socket.emit("broadcaster", { socketId: socket.id, videoId });
  };
  const [started, setStarted] = useState(true);
  return (
    <div className={Style.container}>
      <div className={Style.video_container}>
        {started && (
          <div className={Style.startLive}>
            <div className={Style.div_start_now_container}>
              are you ready to start live
              <button className={Style.button} onClick={handleNewBroadcaster}>
                Start
              </button>
            </div>
          </div>
        )}

        <video className={Style.video} muted ref={VideoRef} autoPlay />
        <p className={Style.viewers}>
          <IoEyeOutline />
          <span className={Style.file_text_title_bold_viewers}>
            {" "}
            {viewers.length} viewers
          </span>
        </p>
      </div>
      <div className={Style.video_container_comments}>
        <span className={Style.file_text_title_bold}>Comments : 0 </span>
        <div className={Style.comments_container}></div>
      </div>
    </div>
  );
};

export default Streaming;
