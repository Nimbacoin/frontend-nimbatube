import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/main-video.module.css";
import { v4 as uuid } from "uuid";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";

import { useDispatch, useSelector } from "react-redux";
import Descreption from "./Descreption";
import Comments from "./Comments";
import { useRouter } from "next/router";
import LiveVideo from "../live/LiveVideo";
import basedGetUrlRequestLogedIn from "../../../../utils/basedGetUrlRequestLogedIn";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import VideoInfo from "./VideoInfo";
import { MainVideoDataReducer } from "../../../../redux/video-slice/VideoSlice";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";
import VideoTag from "./VideoTag";
import CancelButton from "../../../modals/CancelButton";
import ButtonBlack from "../../../modals/ButtonBlack";
import VideoName from "./VideoName";

const MainVideo = () => {
  const ResDD = useSelector(
    (state: any) => state.VideoSlice.mainVideoDataWatch
  );
  const { asPath, pathname } = useRouter();
  const Router = useRouter();
  const [ActiveVideo, setActiveVideo] = useState(true);
  const [videoData, setVideoData] = useState<{ [key: string]: any }>(
    ResDD?.responseData
  );
  const [channelData, setChannelData] = useState<{ [key: string]: any }>(
    ResDD?.channelData
  );
  const userSignIn = useSelector((state: any) => state.UserSignIn.userdata);
  const [videoId, setVideoId] = useState<string>("");
  const [videoLikes, setVideoLikes] = useState<number>(videoData?.likes?.likes);
  const [videoDisLikes, setVideoDisLikes] = useState<number>(
    videoData?.disLikes?.disLikes
  );
  const Bg = channelData?.channelData?.profileImg?.url
    ? process.env.NEXT_PUBLIC_BACK_END_URL +
      "/api/get/read/images/" +
      channelData?.channelData?.profileImg?.url
    : "/images/default-profile.png";

  const unique_id = uuid();
  const videoSrc = React.useRef<HTMLSourceElement | null>(null);
  const videoTag = React.useRef<HTMLVideoElement | null>(null);
  const dispatch = useDispatch();
  const [IsFollowed, setIsFollowed] = useState(
    channelData?.followers?.followed
  );
  const [followers, setFollowers] = useState(channelData?.followers?.followers);
  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video: string | null = Params.get("video");
    const watching: string | null = Params.get("watching");
    const streaming: string | null = Params.get("streaming");
    if (watching === "true") {
      setActiveVideo(true);
    } else if (streaming === "true") {
      setActiveVideo(false);
    }
    if (videoTag.current) {
      if (video) {
        setVideoId(video);
      }
    }
  }, [asPath]);

  const HandelFollow = async () => {
    const userId = userSignIn.email;
    setIsFollowed(!IsFollowed);
    if (userId) {
      const body: any = {
        channelId: channelData._id,
        isFollowing: !IsFollowed,
      };
      await basedPostUrlRequestLogedIn(
        "/api/post/channel/follow-channel",
        body
      ).then((responseData) => {
        if (responseData) {
          console.log(responseData);
          setFollowers(responseData?.responseData?.followers);
          dispatch(
            MainVideoDataReducer({
              message: "followers",
              followers: responseData?.responseData,
            })
          );
        }
      });
    } else {
      Router.push("/auth/sign-in");
    }
  };
  const handelChannelName = () => {
    Router.push("/channel/@/" + channelData?._id);
  };

  return (
    <div className={Style.container}>
      {!ActiveVideo && <LiveVideo />}
      {ActiveVideo && <VideoTag />}
      <VideoName />
      <div className={Style.container_video_data}>
        <div className={Style.chanel}>
          <div className={Style.main_img_container}>
            <div
              style={{ backgroundImage: `url(${Bg})` }}
              className={Style.img}
            ></div>
          </div>
          <div className={Style.chanel_container}>
            <span onClick={handelChannelName} className={Style.chanel_name}>
              {channelData?.channelData?.name}
            </span>
            <p className={Style.chanel_followers}>
              <span className={Style.Followers}>{followers} - Followers</span>
            </p>
          </div>
          <div className={Style.right_container}>
            {!IsFollowed ? (
              <ButtonBlack Text={"follow"} HandelClick={HandelFollow} />
            ) : (
              <div className={Style.followed_button_container}>
                <CancelButton HandelClick={HandelFollow} Text={"following"} />
              </div>
            )}
          </div>
        </div>
        <VideoInfo ActiveVideoStream={ActiveVideo} />
      </div>

      <Descreption VideoData={videoData} />
      <Comments VideoData={videoData} />
    </div>
  );
};

export default MainVideo;
