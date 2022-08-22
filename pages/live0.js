import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

import { useSelector } from "react-redux";
const Streaming = () => {
  const localVideoRef = useRef(null);
  const remteVideoRef = useRef(null);
  // const peerRef = useRef(null);

  // const socket = useSelector((state) => state.socketSlice.socketRedux);
  const channels = useSelector((state) => state.ChannelSlice.allChannels);
  const channelId = channels[0]?._id;
  const [roomId, setRoomId] = useState("");
  const isSocket = useSelector((state) => state.socketSlice.isSocket);
  const [isCaller, setIsCaller] = useState(false);

  const socket = io(process.env.NEXT_PUBLIC_BACK_END_URL);

  const handelChange = (e) => {
    setRoomId(e.target.value);
  };

  const handelJoinRoom = () => {
    socket.emit("joining-room", roomId);
  };

  //-------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun.l.google.com:19302" },
      ],
    });
    const onicecandidateHandelr = (event) => {
      if (event.candidate) {
        alert("candidate:", event.candidate);
        socket.emit("candidate", {
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
          room: roomId,
        });
      }
    };
    //-------------------------------------------------------------------------------------------------------------------

    const onAddStream = (event) => {
      remteVideoRef.current.srcObject = event.streams[0];
    };


    const handelJoin = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setIsCaller(false);
      socket.emit("ready", roomId);
      localVideoRef.current.srcObject = stream;
    };

    // -----------------------------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------------------------------------

    const handelOffer = (event) => {
      const stream = localVideoRef.current.srcObject;
      peer.onicecandidate = onicecandidateHandelr;
      peer.ontrack = onAddStream;
      peer.addTrack = (stream.getTracks()[0], stream);
      peer.addTrack = (stream.getTracks()[1], stream);
      peer.setRemoteDescription(new RTCSessionDescription(event));
      peer
        .createAnswer()
        .then((sassionDescreption) => {
          peer.setLocalDescription(sassionDescreption);
          console.log(sassionDescreption);
          socket.emit("answer", {
            type: "answer",
            sdp: sassionDescreption,
            room: roomId,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //-------------------------------------------------------------------------------------------------------------------
    let Offer = [];
    const handelAnswer = async (event) => {
      console.log(event);
      Offer.push(event);
      if (Offer.length > 0) {
        console.log(Offer);

        peer.setRemoteDescription(
          new RTCSessionDescription(Offer[Offer.length - 1])
        );
      }
    };

    //-------------------------------------------------------------------------------------------------------------------

    const handelCandidate = (event) => {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });
      peerRef.addIceCandidate(candidate);
      console.log("candidate");
    };
    //-------------------------------------------------------------------------------------------------------------------


    socket.on("joined-the-room", handelJoin);
    //-----------------------------------

    socket.on("ready", handelReady);
    //-----------------------------------

    socket.on("offer", handelOffer);
    //-----------------------------------

    socket.on("answer", handelAnswer);
    //-----------------------------------

    socket.on("candidate", handelCandidate);
    //-----------------------------------
  });

  useEffect(() => {});
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
        ref={remteVideoRef}
        autoPlay
      />
      <input onChange={handelChange} />

      <button onClick={handelJoinRoom}>watch a live</button>
    </div>
  );
};

export default Streaming;
