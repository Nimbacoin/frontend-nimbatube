import React, { useEffect, useRef, useState } from "react";
import Style from "../../../../styles/pages/watch/leftside/main-video.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";
import { v4 as uuid } from "uuid";

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

const MainVideo = () => {
  const { asPath, pathname } = useRouter();
  const [ActiveVideo, setActiveVideo] = useState(true);
  const [videoData, setVideoData] = useState<{ [key: string]: any }>({});
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
          "/api/get/video/" + video + "/" + getting
        );
        if (thisVideoData && thisVideoData?.responseData) {
          setVideoData(thisVideoData?.responseData);
          getting = thisVideoData?.getting;
          fetched = true;
        }
      }
    };
    localFetch();
  }, []);
  const DescreptionBoolean = useSelector(
    (state: any) => state.MainVideo.Descreption
  );
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

  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
  const [IsLiked, setIsLiked] = useState(false);
  const [IsDisLiked, setIsDisLiked] = useState(false);

  const HandelLike = () => {
    setIsLiked(!IsLiked);
    setIsDisLiked(false);
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
            {videoData?.views?.length} views - {videoData?.createdAt}
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
          <span className={Style.chanel_name}>MrBeast</span>
          <p className={Style.chanel_followers}>
            <span className={Style.Followers}>100 Followers</span>
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
