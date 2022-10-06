import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/main-video.module.css";
import { v4 as uuid } from "uuid";

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
      //alert("sdddsd");
      setActiveVideo(false);
    }
    if (videoTag.current) {
      if (video) {
        setVideoId(video);
      }
      if (typeof window !== "undefined") {
        videoTag.current.src =
          process.env.NEXT_PUBLIC_BACK_END_URL + "/api/get/read/video/" + video;
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

  return (
    <div className={Style.container}>
      {!ActiveVideo && <LiveVideo />}
      {ActiveVideo && (
        <div className={Style.video_container}>
          <div className={Style.video_container_2}>
            <video ref={videoTag} autoPlay muted loop controls>
              <source ref={videoSrc} className={Style.video} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
      <VideoInfo />
      <div className={Style.chanel}>
        <div
          style={{ backgroundImage: `url(${Bg})` }}
          className={Style.img}
        ></div>
        <div className={Style.chanel_container}>
          <span className={Style.chanel_name}>
            {channelData?.channelData?.name}
          </span>
          <p className={Style.chanel_followers}>
            <span className={Style.Followers}>{followers} - Followers</span>
          </p>
        </div>
        <div className={Style.right_container}>
          {!IsFollowed ? (
            <button
              onClick={HandelFollow}
              className={Style.follow_button_black}
            >
              Follow
            </button>
          ) : (
            <div className={Style.followed_button_container}>
              <button onClick={HandelFollow} className={Style.follow_button}>
                Following
              </button>
              <button onClick={HandelFollow} className={Style.notf_button}>
                <IoNotificationsOutline />
              </button>
            </div>
          )}
        </div>
      </div>
      <Descreption VideoData={videoData} />
      <Comments VideoData={videoData} />
    </div>
  );
};

export default MainVideo;
