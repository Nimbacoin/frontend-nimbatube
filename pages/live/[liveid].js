import { useEffect, useRef, useState } from "react";

function App() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          currentUsereVideoStrem(stream);
        });
      const peer = new Peer();
      peer.on("open", (id) => {
        setPeerId(id);
      });

      peer.on("call", (call) => {
        var getUserMedia = navigator.getUserMedia;
        getUserMedia({ video: true }, (mediaStream) => {
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

  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia;
    getUserMedia({ video: true, audio: false }, (mediaStream) => {
      currentUsereVideoStrem(mediaStream);
      sendCallToUser(remotePeerId, mediaStream);
    });
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

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        style={{ border: "1px solid #000" }}
        placeholder="enter your code here"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={currentUserVideoRef} />
      </div>
      <div>
        b
        <video ref={remoteVideoRef} />b
      </div>
    </div>
  );
}

export default App;
