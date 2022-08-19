import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useRouter } from "next/router";
const socket = io(process.env.NEXT_PUBLIC_BACK_END_URL, {
  transports: ["websocket", "polling"],
});
function App() {
  const channels = useSelector((state) => state.ChannelSlice.allChannels);
  const { asPath } = useRouter();
  const [peerId, setPeerId] = useState("");
  const [channelId, setChannelId] = useState("");
  const [goLive, setGoLive] = useState(false);

  const SocketCurrent = useRef(null);

  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia;
    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUsereVideoStrem(mediaStream);
      sendCallToUser(remotePeerId, mediaStream);
    }).stop();
  };

  const sendCallToUser = (remotePeerId, stream) => {
    const call = peerInstance.current.call(remotePeerId, stream);
    call.on("stream", (userVideoStrem) => {
      remoteVideoRef.current.srcObject = userVideoStrem;
      remoteVideoRef.current.play();
    });
  };
  const currentUsereVideoStrem = (mediaStream) => {
    currentUserVideoRef.current.srcObject = mediaStream;
    currentUserVideoRef.current.play();
  };

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACK_END_URL, {
      transports: ["websocket", "polling"],
    });
    let Params = new URL(window.location.href).searchParams;
    const video = Params.get("video");
    const streaming = Params.get("streaming");
    if (streaming === "true") {
      socket.emit("join-stream", video);
      socket.on("joined-stream-id", (streamId) => {
        const call = () => {
          if (streamId) {
            var getUserMedia = navigator.getUserMedia;
            getUserMedia({ video: true, audio: false }, (mediaStream) => {
              currentUsereVideoStrem(mediaStream);
              sendCallToUser(streamId, mediaStream);
            });
          }
        };
        call();
      });
    }
  }, [asPath]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACK_END_URL, {
      transports: ["websocket", "polling"],
    });
    const LocalData = () => {
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to the ${err.message}`);
      });
      socket.on("connect", () => {});
      const channel = channels[0];
      if (channel && peerId.length >= 10 && goLive) {
        setChannelId(channel._id);
        socket.emit("live-stream", { channelId, peerId });
      }
    };
    LocalData();
  }, [peerId]);

  const peerInstance = useRef(null);
  useEffect(() => {}, [channelId]);

  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer();
      peer.on("open", (id) => {
        setPeerId(id);
      });

      peer.on("call", (call) => {
        var getUserMedia = navigator.getUserMedia;
        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        });
      });
      peerInstance.current = peer;
    });
  }, []);
  const GoLiveStream = () => {
    setGoLive(true);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        const channel = channels[0];
        if (channel && peerId.length >= 10) {
          setChannelId(channel._id);
          const channelID = channel._id;
          socket.emit("live-stream", { channelId: channelID, peerId });
        }

        currentUsereVideoStrem(stream);
      });
  };
  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      {/* <input
        type="text"
        style={{ border: "1px solid #000" }}
        placeholder="enter your code here"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      /> */}
      <button onClick={GoLiveStream}>Go Live</button>
      <div>
        <video ref={currentUserVideoRef} muted />{" "}
      </div>
      <div>
        b
        <video ref={remoteVideoRef} />b
      </div>
    </div>
  );
}

export default App;
