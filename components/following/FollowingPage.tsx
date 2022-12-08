import React, { useEffect, useState } from "react";
import Chanel from "./components/ChannelCard";
import Style from "../../styles/pages/following/following.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";

import TopTitle from "../modals/TopTitle";
const FollowingPage = ({}: any) => {
  const [ChannelsData, setChannelsData] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      await basedGetUrlRequestLogedIn(
        "/api/get/channel/following-channels"
      ).then((res) => {
        if (res?.responseData) {
          console.log(res?.responseData);
          setChannelsData(res.responseData);
        }
      });
    };
    locaFetch();
  }, []);
  return (
    <div className={Style.container}>
      <TopTitle Icon={<IoHeartOutline />} Text={"following"} />
      {/* <Chanel IsChanelPage={true} /> */}
      {ChannelsData.length
        ? ChannelsData.map(({ _id, channelData }: any) => (
            <Chanel
              channelData={channelData}
              IsChannelPage={true}
              Id={_id}
              LinkChannel={"/channel/@/" + _id}
              Title={channelData?.title}
              Username={channelData?.name}
              ProfileImg={channelData?.profileImg}
              // Uploads={uploads.length}
              Followers={channelData?.followers?.length}
              // Followers={followers.length}
            />
          ))
        : null}
    </div>
  );
};

export default FollowingPage;
