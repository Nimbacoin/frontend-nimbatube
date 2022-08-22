import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { socketReduxRecuder } from "../redux/socket-slice/socketSlice";

interface SocketObj {
  conversationId: string;
}
const SocketHandler = () => {
  const dispatch = useDispatch();

  const socketInstance = useSelector(
    (state: any) => state.socketSlice.socketRedux
  );
  const isSocket = useSelector((state: any) => state.socketSlice.isSocket);

  useEffect(() => {
    const localFetch = () => {
      const socket = io(process.env.NEXT_PUBLIC_BACK_END_URL!, {
        transports: ["websocket", "polling"],
      });
      if (!isSocket) {
        dispatch(socketReduxRecuder(socket));
      }
      socket.on("connect_error", (err: any) => {
        console.log(`connect_error due to the ${err.message}`);
      });
      socket.on("connect", () => {
        console.log("you connnected");
      });
    };
    localFetch();
  }, [socketInstance]);

  return <></>;
};
export default SocketHandler;
