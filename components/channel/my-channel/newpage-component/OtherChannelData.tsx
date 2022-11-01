import React, { useEffect, useState } from "react";
import Vedio from "../../../video/Video";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/other-channel-data.module.css";
import basedGetUrlRequest from "../../../../utils/basedGetUrlRequest";
import { useRouter } from "next/router";
import AllVideosBeforLoad from "../../../modals/pages-boforload/AllVideosBeforLoad";
const OtherChannelData = () => {
  const { asPath } = useRouter();
  const [videos, setVideos] = useState([]);
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
      }
    };
    locaFetch();
  }, [asPath]);
  return <div className={Style.container}>dr</div>;
};

export default OtherChannelData;
