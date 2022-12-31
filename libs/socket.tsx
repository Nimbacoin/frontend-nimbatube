import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { socketReduxRecuder } from "../redux/socket-slice/socketSlice";
import NofyNewVideo from "./NofyNewVideo";
import { v4 as uuid } from "uuid";

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
      const sessionStorageUnicId = sessionStorage.unicId;
      const socket = io(process.env.NEXT_PUBLIC_BACK_END_URL!, {
        transports: ["websocket", "polling"],
        query: {
          sessionStorageUnicId: sessionStorageUnicId,
        },
      });
      if (!isSocket) {
        dispatch(socketReduxRecuder(socket));
      }
      socket.on("connect_error", (err: any) => {
        console.log(`connect_error due to the ${err.message}`);
      });
      socket.on("connect", () => {});
      socket.on("unicId", (unicId: any) => {
        const sessionStorageUnicId = sessionStorage.unicId;
        if (
          !sessionStorageUnicId &&
          typeof sessionStorageUnicId === "undefined"
        ) {
          sessionStorage.setItem("unicId", unicId);
          socket.emit("send-id", unicId);
        } else {
          socket.emit("send-id", sessionStorageUnicId);
        }
      });
    };
    localFetch();
  }, [socketInstance]);
  return (
    <div></div>
    // <NofyNewVideo />
  );
};
export default SocketHandler;
