import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

import Style from "../../../../styles/pages/watch/rightside/live-comments-videos.module.css";
import { IoEyeOutline } from "@react-icons/all-files/io5/IoEyeOutline";
import StreamComment from "../../../go-live/go-live-components/StreamComment";
import InputStreamComment from "../../../go-live/go-live-components/InputStreamComment";
import { liveVideoLive } from "../../../../redux/video-slice/VideoSlice";
import basedGetUrlRequest from "../../../../utils/basedGetUrlRequest";

const SOCKEtT_SERVER_URL = process.env.NEXT_PUBLIC_BACK_END_URL;

const LiveCommentsVideos = () => {
  const { asPath } = useRouter();
  const socket = io(SOCKEtT_SERVER_URL!);
  const [videoId, setVideoId] = useState("");
  const liveCommentsVideo = useSelector(
    (state: any) => state.VideoSlice.liveCommentsVideo
  );
  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video = Params.get("video");
    if (video?.length && video?.length > 10) {
      setVideoId(video);
    }
  }, [asPath]);

  const [Comments, setComments] = useState([]);
  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video = Params.get("video");
    const localFetch = async () => {
      await basedGetUrlRequest(
        "/api/get/video/" + video + "/null" + "/null",
        true
      ).then((res: any) => {
        if (res.responseData) {
          const allResComments = res.responseData.comments;
          console.log(allResComments);
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
  const socketInstance = useSelector(
    (state: any) => state.socketSlice.socketRedux
  );
  const isSocket = useSelector((state: any) => state.socketSlice.isSocket);
  const [socketIdd, setSocketIdd] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const localFetch = () => {
      socket.on("new-comment", (data: any) => {
        dispatch(
          liveVideoLive({
            comments: data,
          })
        );
      });
    };
    localFetch();
  }, [socket]);
  return (
    <div className={Style.container}>
      <div className={Style.div_comment_top}>comment 0 </div>
      <div className={Style.comments_container}>
        {liveCommentsVideo?.length &&
          liveCommentsVideo.map((comment: any) => (
            <StreamComment CommentData={comment} />
          ))}
      </div>
      <div className={Style.container_hidden}></div>
      <InputStreamComment VideoId={videoId} />
    </div>
  );
};

export default LiveCommentsVideos;
