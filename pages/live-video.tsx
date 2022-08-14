import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
//import {Howl} from 'howler';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

interface SocketObj {
  conversationId: string;
}
const MessageSocket = () => {
  const Video = React.useRef<HTMLVideoElement | null>(null);
  const Canvas = React.useRef<HTMLCanvasElement | null>(null);
  const Context = Canvas?.current?.getContext("2d");
  const [laod, setlaod] = useState(false);

  const [Bg, setBg] = useState("");
  const socket = io(process.env.NEXT_PUBLIC_BACK_END_URL!, {
    transports: ["websocket", "polling"],
  });
  useEffect(() => {
    const locaFetch = () => {
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to the ${err.message}`);
      });
      socket.on("connect", () => {});
      socket.on("streaming", (data) => {
        setBg(data);
        console.log("data", data);
      });
    };
    locaFetch();
  });

  const errorLoadCam = (stram: any) => {
    console.log("camera failed");
  };

  const loadVideo = (video: any) => {
    if (Canvas.current && Context) {
      const Height = Canvas.current?.height;
      const Width = Canvas.current?.width;
      Context.drawImage(video, 0, 0, Height, Width);
      socket.emit("stream", Canvas.current.toDataURL("image/webp"));
    }
  };

  const handelLoadVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        const videos = Video.current;
        if (videos) {
          videos.srcObject = stream;
          videos.play();
          setInterval(function () {
            loadVideo(videos);
          }, 10);
        }
      });
  };

  useEffect(() => {
    setInterval(() => {
      setlaod(!laod);
    }, 1000);
  }, []);

  useEffect(() => {
    handelLoadVideo();
  }, [laod]);

  return (
    <div>
      <button onClick={handelLoadVideo}>Start video</button>
      <video
        ref={Video}
        style={{ height: "700px", width: "700px" }}
        autoPlay={true}
      ></video>

      <div
        style={{
          backgroundImage: `url(${Bg})`,
          height: "700px",
          width: "700px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <canvas
        ref={Canvas}
        height="700"
        width="700"
        style={{ height: "700px", width: "700px", display: "none" }}
      ></canvas>
    </div>
  );
};
export default MessageSocket;
