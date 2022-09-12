import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/main-video.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { AiFillDislike } from "@react-icons/all-files/ai/AiFillDislike";

import { AiOutlineDislike } from "@react-icons/all-files/ai/AiOutlineDislike";
import { IoArrowRedoOutline } from "@react-icons/all-files/io5/IoArrowRedoOutline";
import { RiPlayListAddFill } from "@react-icons/all-files/ri/RiPlayListAddFill";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { ToggleDescreption } from "../../../../redux/style-slice/video/MainVideo";
import Descreption from "./Descreption";
import Comments from "./Comments";
import { useRouter } from "next/router";
import LiveVideo from "../live/LiveVideo";
import basedGetUrlRequest from "../../../../utils/basedGetUrlRequest";
import basedGetUrlRequestLogedIn from "../../../../utils/basedGetUrlRequestLogedIn";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";

const MainVideo = () => {
  const { asPath, pathname } = useRouter();
  const Router = useRouter();
  const [ActiveVideo, setActiveVideo] = useState(true);
  const [videoData, setVideoData] = useState<{ [key: string]: any }>({});
  const [channelData, setChannelData] = useState<{ [key: string]: any }>({});
  const userSignIn = useSelector((state: any) => state.UserSignIn.userdata);
  const [videoId, setVideoId] = useState<string>("");

  const unique_id = uuid();

  const videoSrc = React.useRef<HTMLSourceElement | null>(null);
  const videoTag = React.useRef<HTMLVideoElement | null>(null);

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

      videoTag.current.src =
        process.env.NEXT_PUBLIC_BACK_END_URL + "/api/get/read/video/" + video;
      videoTag.current.play();
    }
  }, [asPath]);
  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video: string | null = Params.get("video");
    let fetched = false;
    const localFetch = async () => {
      let getting = unique_id;
      if (video && video.length > 10 && !fetched) {
        const thisVideoData = await basedGetUrlRequest(
          "/api/get/video/" + video + "/" + getting,
          true
        );
        if (
          thisVideoData &&
          thisVideoData?.responseData &&
          thisVideoData?.channelData
        ) {
          setVideoData(thisVideoData?.responseData);
          setChannelData(thisVideoData?.channelData);
          getting = thisVideoData?.getting;
          fetched = true;
        }
      }
    };
    localFetch();
  }, []);

  const dispatch = useDispatch();
  const HandelDescreptionToggle = () => {
    dispatch(ToggleDescreption());
  };
  useEffect(() => {
    if (videoTag.current !== null) {
      const Height = videoTag.current.videoHeight;
      const Width = videoTag.current.videoWidth;
      videoTag.current.style.minHeight = "500px";
    }
  }, [videoTag]);

  const Bg = channelData?.channelData?.profileImg?.url
    ? channelData?.channelData?.profileImg?.url
    : "/images/default-profile.png";

  const [IsLiked, setIsLiked] = useState(false);
  const [IsDisLiked, setIsDisLiked] = useState(false);

  const HandelLike = async () => {
    const userId = userSignIn.email;
    alert(userId);
    const body: any = { userId: userId, IsLiked, IsDisLiked, videoId };
    if (userId) {
      await basedPostUrlRequestLogedIn(
        "/api/post/video/like-video/",
        body
      ).then((responseData) => {
        if (responseData) {
          console.log(responseData);
          setIsLiked(!IsLiked);
          setIsDisLiked(false);
        }
      });
    } else {
      Router.push("/auth/sign-in");
    }
  };
  const HandelDisLike = () => {
    setIsLiked(false);
    setIsDisLiked(!IsDisLiked);
  };

  const [IsFollowed, setIsFollowed] = useState(false);
  const HandelFollow = () => {
    setIsFollowed(!IsFollowed);
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
      <div className={Style.video_data}>
        <div className={Style.title}>
          <p className={Style.title_text}>{videoData?.title}</p>
          <button onClick={HandelDescreptionToggle}>
            <IoIosArrowDown />
          </button>
        </div>
        <div className={Style.data_container}>
          <span className={Style.date}>
            {videoData?.views?.length} views -{" "}
            {moment(videoData?.createdAt).startOf("hour").fromNow()}
          </span>
          <div className={Style.icons_container}>
            <p className={Style.icon} onClick={HandelLike}>
              {IsLiked ? <AiFillLike /> : <AiOutlineLike />}

              <span className={Style.nubmer_of_likes}>
                {videoData?.likes?.length}
              </span>
            </p>
            <p className={Style.icon} onClick={HandelDisLike}>
              {IsDisLiked ? <AiFillDislike /> : <AiOutlineDislike />}
              Dislike
            </p>
            <p className={Style.icon}>
              <IoArrowRedoOutline />
              Share
            </p>
            <p className={Style.icon}>
              <RiPlayListAddFill />
              Save
            </p>
            <p className={Style.icon}>
              <IoEllipsisHorizontalSharp />
            </p>
          </div>
        </div>
      </div>
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
            <span className={Style.Followers}>
              {channelData?.followers?.length} Followers
            </span>
          </p>
        </div>
        <div className={Style.right_container}>
          {!IsFollowed ? (
            <button onClick={HandelFollow} className={Style.follow_button}>
              Follow
            </button>
          ) : (
            <div className={Style.followed_button_container}>
              <button onClick={HandelFollow} className={Style.followed_button}>
                Followed
              </button>
              {/* <button onClick={HandelFollow} className={Style.notf_button}>
                <IoNotificationsOutline />
              </button> */}
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
