import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Style from "../../../../styles/pages/watch/rightside/live-comments-videos.module.css";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import StreamComment from "../../../go-live/go-live-components/StreamComment";
import InputStreamComment from "../../../go-live/go-live-components/InputStreamComment";
import {
  liveVideoCommentsReducer,
  liveVideoLive,
} from "../../../../redux/video-slice/VideoSlice";
import basedGetUrlRequest from "../../../../utils/basedGetUrlRequest";
import BoldText from "../../../modals/BoldText";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
const SOCKEtT_SERVER_URL = process.env.NEXT_PUBLIC_BACK_END_URL;

const LiveCommentsVideos = () => {
  const { asPath } = useRouter();
  // const socket = io(SOCKEtT_SERVER_URL!);
  const [videoId, setVideoId] = useState("");
  const liveCommentsVideo = useSelector(
    (state: any) => state.VideoSlice.liveCommentsVideo
  );
  // useEffect(() => {
  //   let Params = new URL(window.location.href).searchParams;
  //   const video = Params.get("video");
  //   if (video?.length && video?.length > 10) {
  //     setVideoId(video);
  //   }
  // }, [asPath]);

  const [Comments, setComments] = useState([]);

  // useEffect(() => {
  //   let Params = new URL(window.location.href).searchParams;
  //   const video = Params.get("video");
  //   const localFetch = async () => {
  //     await basedGetUrlRequest(
  //       "/api/get/video/" + video + "/null" + "/null",
  //       true
  //     ).then((res: any) => {
  //       if (res.responseData) {
  //         const allResComments = res.responseData.comments;
  //         dispatch(
  //           liveVideoLive({
  //             comments: allResComments,
  //           })
  //         );
  //         setComments(allResComments);
  //       }
  //     });
  //   };
  //   localFetch();
  // }, [asPath]);
  const socketInstance = useSelector(
    (state: any) => state.socketSlice.socketRedux
  );
  const isSocket = useSelector((state: any) => state.socketSlice.isSocket);
  const liveVideoComments = useSelector(
    (state: any) => state.VideoSlice.liveVideoComments
  );
  const [socketIdd, setSocketIdd] = useState("");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const localFetch = () => {
  //     socket.on("new-comment", (data: any) => {
  //       dispatch(
  //         liveVideoLive({
  //           comments: data,
  //         })
  //       );
  //     });
  //   };
  //   localFetch();
  // }, [socket]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const scrollToBottomWithSmoothScroll = () => {
  //     if (messagesEndRef.current) {
  //       messagesEndRef.current.scrollTo({
  //         top: messagesEndRef.current.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     }
  //   };
  //   scrollToBottomWithSmoothScroll();
  // }, [liveCommentsVideo]);
  const [isPhone, setIsPhone] = useState(false);
  const handelCloseCommets = () => {
    // setIsPhone(!isPhone);
    dispatch(liveVideoCommentsReducer());
  };
  return (
    <div
      className={!liveVideoComments ? Style.container : Style.container_phone}
    >
      <div className={Style.div_cooment_top}>
        <BoldText text={"Comments: " + liveCommentsVideo?.length} />
        <button onClick={handelCloseCommets} className={Style.close_button}>
          <IoCloseOutline />
        </button>
      </div>

      {/* <div ref={messagesEndRef} className={Style.comments_container}>
        {liveCommentsVideo?.length
          ? liveCommentsVideo.map((comment: any, index: number) => (
              <StreamComment Key={index} key={index} CommentData={comment} />
            ))
          : ""}
      </div> */}
      <div className={Style.container_hidden}>
        <InputStreamComment VideoId={videoId} />
      </div>
    </div>
  );
};

export default LiveCommentsVideos;
