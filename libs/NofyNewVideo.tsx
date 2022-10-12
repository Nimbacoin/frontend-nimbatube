import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { socketReduxRecuder } from "../redux/socket-slice/socketSlice";

interface SocketObj {
  conversationId: string;
}
const NofyNewVideo = () => {
  const dispatch = useDispatch();

  const socketInstance = useSelector(
    (state: any) => state.socketSlice.socketRedux
  );
  const isSocket = useSelector((state: any) => state.socketSlice.isSocket);

  useEffect(() => {
    const localFetch = () => {
      if (isSocket) {
        socketInstance.on("nofy-new-video", () => {});
        alert("new video");
      }
    };
    localFetch();
  }, [socketInstance]);

  return <></>;
};
export default NofyNewVideo;
