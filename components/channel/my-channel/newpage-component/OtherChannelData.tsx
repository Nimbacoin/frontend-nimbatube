import React, { useEffect, useState } from "react";
import Vedio from "../../../video/Video";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/other-channel-data.module.css";
import basedGetUrlRequest from "../../../../utils/basedGetUrlRequest";
import { useRouter } from "next/router";
import AllVideosBeforLoad from "../../../modals/pages-boforload/AllVideosBeforLoad";
import { useSelector } from "react-redux";
import BoldText from "../../../modals/BoldText";
const OtherChannelData = () => {
  const { asPath } = useRouter();
  const [videos, setVideos] = useState([]);
  const ChannelSlice = useSelector(
    (state: any) => state.ChannelSlice.activeChannelData
  );
  console;
  // useEffect(() => {
  //   const dataUrl = asPath.replace("/channel/@/", "");
  //   const locaFetch = async () => {
  //     if (dataUrl !== "[channel]") {
  //       const dataRes: any = await basedGetUrlRequest(
  //         "/api/get/channel/all-vidoes/" + dataUrl,
  //         false
  //       );
  //       console.log(dataRes);
  //       setVideos(dataRes.responseData);
  //     }
  //   };
  //   locaFetch();
  // }, [asPath]);
  console.log(ChannelSlice);
  return (
    <div className={Style.container}>
      <div className={Style.channel_data_followrs}>
        <div className={Style.container_data_item}>
          <span className={Style.followers}>
            {ChannelSlice?.followers?.length}
          </span>{" "}
          <span className={Style.title}>followers</span>
        </div>
        <div className={Style.container_data_item}>
          <span className={Style.followers}>
            {ChannelSlice.channelData?.numbers?.uploads}
          </span>
          <span className={Style.title}>Videos</span>
        </div>
        <div className={Style.container_data_item}>
          <span className={Style.followers}>{"25534"}</span>{" "}
          <span className={Style.title}>Likes</span>
        </div>
      </div>
    </div>
  );
};

export default OtherChannelData;
