import React, { useState } from "react";
import Style from "../../../../styles/pages/watch/rightside/video-option.module.css";
import { IoEllipsisVerticalSharp } from "@react-icons/all-files/io5/IoEllipsisVerticalSharp";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import moment from "moment";
import { useRouter } from "next/router";

const VideoOption = ({ VideoData }: any) => {
  const Router = useRouter();
  const HandelIsOverVideoLeave = () => {
    setIsOverVideo(false);
  };
  const HandelIsOverVideoOver = () => {
    setIsOverVideo(true);
  };
  const [IsOverVideo, setIsOverVideo] = useState(false);
  const InputSearch = React.useRef<HTMLSpanElement>(null);

  const Title = VideoData?.videoData?.title;
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg =
    process.env.NEXT_PUBLIC_BACK_END_URL +
    "/api/get/read/images/" +
    VideoData?.videoData?.thumbnail;

  const handelClickhh = (e: any) => {
    const refany = InputSearch.current;
    if (InputSearch && InputSearch.current && refany?.contains(e.target)) {
    } else {
      Router.push(
        "/watch/watch?watching=true&video=" + VideoData?.videoData?._id
      );
    }
  };
  return (
    <div onClick={handelClickhh} className={Style.container}>
      <div
        className={Style.video_container}
        onMouseOver={HandelIsOverVideoOver}
        onMouseLeave={HandelIsOverVideoLeave}
      >
        {!IsOverVideo ? (
          <div
            style={{
              backgroundImage: `url(${Bg})`,
            }}
            className={Style.video_container_img}
          >
            <p className={Style.time}>
              {VideoData?.videoData?.duration} <IoVideocamOutline />{" "}
            </p>
          </div>
        ) : (
          <video width="100%" height="30px" autoPlay muted loop>
            <source
              src={
                process.env.NEXT_PUBLIC_BACK_END_URL +
                "/api/get/read/video/" +
                VideoData?.videoData?._id
              }
              type="video/mp4"
            />
          </video>
        )}
      </div>
      <div className={Style.chanel_data}>
        <h3 className={Style.title}>
          {Title}
          <span className={Style.icon_phone}>
            <IoEllipsisVerticalSharp />
          </span>
        </h3>
        <div className={Style.chanel_data_container}>
          <div
            style={{ backgroundImage: `url(${Bg})` }}
            className={Style.chanel_img}
          ></div>
          <p className={Style.chanel_details}>
            <span className={Style.chanel_name}>
              {VideoData?.channelData?.channelData?.name}
            </span>
            <span className={Style.date}>
              {moment(VideoData?.videoData?.createdAt)
                .startOf("hour")
                .fromNow()}
            </span>
          </p>
        </div>
      </div>
      <span ref={InputSearch} className={Style.icon}>
        <IoEllipsisVerticalSharp />
      </span>
    </div>
  );
};

export default VideoOption;
