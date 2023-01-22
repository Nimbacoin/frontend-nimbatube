import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Style from "../../../styles/pages/go-live/go-live-components/stream.module.css";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import basedGetUrlRequest from "../../../utils/basedGetUrlRequest";
import StreamComment from "./StreamComment";
import InputStreamComment from "./InputStreamComment";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import { liveVideoLive } from "../../../redux/video-slice/VideoSlice";
import TextTilteInputMudum from "../../modals/text/TextTilteInputMudum";
import SmallTextBlack from "../../modals/SmallTextBlack";
import BlueButton from "../../modals/BlueButton";
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
  const second = useRef(null);
  const [videoId, setVideoId] = useState("");
  const [broadcaster, setBroadcaster] = useState("");
  const [viewers, setViewers] = useState([]);
  const WindowHeight = useSelector((state) => state.GenrealStyle.WindowHeight);

  const liveCommentsVideo = useSelector(
    (state) => state.VideoSlice.liveCommentsVideo
  );
  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video = Params.get("video");
    if (video?.length && video?.length > 10) {
      setVideoId(video);
    }
  }, [asPath]);
  useEffect(() => {
    const parts = [];
    const localFetch = async () => {
      // try {
      //   const stream = await navigator.mediaDevices.getUserMedia({
      //     video: true,
      //     audio: true,
      //   });
      //   // if (VideoRef.current) {
      //   // VideoRef.current.srcObject = stream;
      //   //}
      // } catch (err) {}
    };
    localFetch();
  }, []);
  let mediaRecorder;
  let parts = [];
  const startRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start(1000);
      mediaRecorder.ondataavailable = (e) => {
        parts.push(e.data);
        socket.emit("live-socket-recored", parts);
      };
    } catch (err) {}
  };
  function stopRecording() {
    mediaRecorder.stop();
    const blob = new Blob(parts, { type: "video/mp4" });
    // second.current.src = blob;
    const url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.textContent = a.download;
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = "test.mp4";
    a.click();
  }
  useEffect(() => {
    socket.on("broadcaster", (id) => {
      setBroadcaster(id);
    });
  }, [socket]);

  //useEffect(() => {
  //   socket.on("watcher-leave", ({ viewers }) => {
  //     setViewers(viewers);
  //   });
  //   socket.on("watcher", ({ id, viewers }) => {
  //     setViewers(viewers);
  //     const peerConnection = new RTCPeerConnection(pc_config);
  //     peerConnections[id] = peerConnection;
  //     setPeerConnections((peerConnections[id] = peerConnection));
  //     let stream = VideoRef.current.srcObject;
  //     stream
  //       .getTracks()
  //       .forEach((track) => peerConnection.addTrack(track, stream));

  //     peerConnection.onicecandidate = (event) => {
  //       if (event.candidate) {
  //         socket.emit("candidate", id, event.candidate);
  //       }
  //     };

  //     peerConnection
  //       .createOffer()
  //       .then((sdp) => peerConnection.setLocalDescription(sdp))
  //       .then(() => {
  //         socket.emit("offer", id, peerConnection.localDescription);
  //       });
  //   });
  // }, [socket]);

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
    setStarted(false);
    socket.emit("broadcaster", { socketId: socket.id, videoId });
  };
  const [started, setStarted] = useState(true);
  const [Comments, setComments] = useState([]);
  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video = Params.get("video");
    const localFetch = async () => {
      await basedGetUrlRequest(
        "/api/get/video/" + video + "/null" + "/null",
        true
      ).then((res) => {
        if (res.responseData) {
          const allResComments = res.responseData.comments;
          dispatch(
            liveVideoLive({
              comments: allResComments,
            })
          );
          setComments(allResComments);
        }
      });
    };
    localFetch();
  }, [asPath]);
  const socketInstance = useSelector((state) => state.socketSlice.socketRedux);
  const isSocket = useSelector((state) => state.socketSlice.isSocket);
  const [socketIdd, setSocketIdd] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const localFetch = () => {
      socket.on("new-comment", (data) => {
        setComments(data);
        dispatch(
          liveVideoLive({
            comments: data,
          })
        );
      });
    };
    localFetch();
  }, [socket]);
  const messagesEndRef = useRef();

  useEffect(() => {
    const scrollToBottomWithSmoothScroll = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTo({
          top: messagesEndRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };
    scrollToBottomWithSmoothScroll();
  }, [liveCommentsVideo]);
  return (
    <div className={Style.container}>
      <div className={Style.video_container}>
        {started && (
          <div className={Style.startLive}>
            <div className={Style.div_start_now_container}>
              <SmallTextBlack Text={"are you ready to start live"} />
              {/* <button className={Style.button} onClick={handleNewBroadcaster}>
                Start
              </button> */}
              <BlueButton HandelClick={handleNewBroadcaster} Text={"Start"} />
            </div>
          </div>
        )}
        {/* <video className={Style.video} muted ref={VideoRef} autoPlay /> */}
        <video className={Style.video} muted ref={second} autoPlay />

        <p className={Style.viewers}>
          <IoEyeOutline />
          <span className={Style.file_text_title_bold_viewers}>
            {" "}
            {viewers.length} viewers
          </span>
        </p>
        <p className={Style.viewers_red}>
          <IoVideocamOutline />
          <span className={Style.file_text_title_bold_viewers}> LIVE</span>
        </p>
      </div>

      <div className={Style.video_container_comments}>
        <div className={Style.div_cooment_top}>
          <button onClick={startRecord}>start button</button>
          <button onClick={stopRecording}>end button</button>
          <span className={Style.file_text_title_bold}>
            Comments : {liveCommentsVideo?.length}
          </span>
        </div>
        <div ref={messagesEndRef} className={Style.comments_main_container}>
          {liveCommentsVideo?.length
            ? liveCommentsVideo.map((comment, index) => (
                <StreamComment Key={index} key={index} CommentData={comment} />
              ))
            : null}
        </div>
        <div className={Style.div_input_container}>
          <InputStreamComment VideoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default Streaming;
