import React from "react";
import Style from "../../styles/pages/watch-later/video-watch-later.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import moment from "moment";
import { useRouter } from "next/router";

const VideoWatchLater = ({ VideoData }: any) => {
  const Router = useRouter();

  const Bg = VideoData?.channelData?.channelData?.profileImg?.url
    ? VideoData?.channelData?.channelData?.profileImg?.url
    : "/images/default-profile.png";

  const verLi = React.useRef<HTMLButtonElement>(null);

  const handelClick = (e: any) => {
    const refany = verLi.current;
    if (verLi && verLi.current && refany?.contains(e.target)) {
    } else {
      Router.push(
        "/watch/watch?watching=true&video=" + VideoData?.videoData?._id
      );
    }
  };
  return (
    <div onClick={handelClick} className={Style.container}>
      <div className={Style.video_container}>
        <video width="100%" height="30px" autoPlay muted loop>
          <source
            src="https://www.w3schools.com/html/movie.mp4"
            type="video/mp4"
          />
        </video>
        <span className={Style.time}> 5:50</span>
      </div>
      <div className={Style.video_date_containe}>
        <span className={Style.chanel_name}>{VideoData?.videoData?.title}</span>
        <div className={Style.chanel_container}>
          <div
            style={{ backgroundImage: `url(${Bg})` }}
            className={Style.img}
          ></div>
          <p className={Style.chanel_followers}>
            <span className={Style.username}>
              {VideoData?.channelData?.channelData?.name}
            </span>
            <span className={Style.Followers}>
              {moment(VideoData?.videoData?.createdAt)
                .startOf("hour")
                .fromNow()}
            </span>
          </p>
        </div>
      </div>
      <div className={Style.right_container}>
        <button ref={verLi} className={Style.IoEllipsisVertical}>
          <IoEllipsisVertical />
        </button>
      </div>
    </div>
  );
};

export default VideoWatchLater;
