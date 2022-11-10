import React, { useEffect, useState } from "react";
import Vedio from "../../../video/Video";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/content.module.css";
import basedGetUrlRequest from "../../../../utils/basedGetUrlRequest";
import { useRouter } from "next/router";
import AllVideosBeforLoad from "../../../modals/pages-boforload/AllVideosBeforLoad";
import OtherChannelData from "./OtherChannelData";
import ActiveVideo from "./ActiveVideo";
const Home = () => {
  const { asPath } = useRouter();
  const [videos, setVideos] = useState([]);
  const [mainVideo, setMainVideo] = useState([]);
  useEffect(() => {
    const dataUrl = asPath.replace("/channel/@/", "");
    const locaFetch = async () => {
      if (dataUrl !== "[channel]") {
        const dataRes: any = await basedGetUrlRequest(
          "/api/get/channel/all-vidoes/" + dataUrl,
          false
        );
        console.log(dataRes);
        setVideos(dataRes.responseData);
        const filter = dataRes.responseData.filter(
          ({ videoData }: any) => videoData.location !== undefined
        );
        setMainVideo(filter.slice(0, 1));
        console.log(mainVideo);
      }
    };
    locaFetch();
  }, [asPath]);

  return (
    <div className={Style.container}>
      <div className={Style.div_container_top}>
        {" "}
        {mainVideo.map((VideoData: any) => (
          <ActiveVideo VideoData={VideoData} />
        ))}
      </div>

      <div className={Style.vedio_container}>
        {videos?.length ? (
          videos.map((vid) => <Vedio VideoData={vid} />)
        ) : (
          <AllVideosBeforLoad />
        )}
      </div>
    </div>
  );
};

export default Home;
