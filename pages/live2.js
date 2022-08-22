import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const useUserMedia = (requestedMedia) => {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
      } catch (err) {
        console.log(err);
      }
    };

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
};

const Broadcast = () => {
  const [broadcaster, setBroadcaster] = useState("");
  const [name, setName] = useState("");
  const [peerConnections, setPeerConnections] = useState({});
  const [broadcastLaunched, setBroadcastLaunched] = useState(false);
  const [constraints, setConstraints] = useState({
    audio: true,
    video: { facingMode: "user" },
  });

  const config = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302"],
      },
    ],
  };

  const ENDPOINT = "http://localhost:5000";
  const socket = io(ENDPOINT);

  const videoRef = useRef();
  const mediaStream = useUserMedia(constraints);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  useEffect(() => {
    socket.on("broadcaster", (id) => {
      setBroadcaster(id);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("watcher", (id) => {
      const peerConnection = new RTCPeerConnection(config);
      peerConnections[id] = peerConnection;

      setPeerConnections((peerConnections[id] = peerConnection));
      let stream = videoRef.current.srcObject;
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
      setNumberOfViewers(Object.keys(peerConnections).length);
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

  const handleCanPlay = () => {
    videoRef.current.play();
  };

  const handleNewBroadcaster = () => {
    socket.emit("broadcaster", socket.id);
  };

  const launchBroadcast = async () => {
    socket.emit("new-broadcaster", broadcaster);
  };

  return (
    <div className="broadcast__main-container">
      <div className="broadcast__sub-container">
        <h1 className="broadcast__header">Smile! You're on camera!</h1>
        <video
          className="video"
          autoPlay={true}
          muted
          ref={videoRef}
          onCanPlay={handleCanPlay}
          playsInline
        />
        <div className="name-input">
          <input
            placeholder="Enter your username"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <button
          className="broadcast__button"
          onClick={() => handleNewBroadcaster()}
        >
          Connect
        </button>
        <button
          disabled={broadcastLaunched ? true : false}
          onClick={(e) => (!name ? e.preventDefault : launchBroadcast())}
        >
          Start Broadcast
        </button>
      </div>
    </div>
  );
};

export default Broadcast;
