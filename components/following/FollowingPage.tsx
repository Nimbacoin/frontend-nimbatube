import React, { useEffect, useState } from "react";
import Channel from "./components/ChannelCard";
import Style from "../../styles/pages/following/following.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";

import TopTitle from "../modals/TopTitle";
import ChannelsLaoding from "../modals/pages-boforload/ChannelsLaoding";
const FollowingPage = ({}: any) => {
  const [ChannelsData, setChannelsData] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      await basedGetUrlRequestLogedIn(
        "/api/get/channel/following-channels"
      ).then((res) => {
        if (res?.responseData) {
          setChannelsData(res.responseData);
        }
      });
    };
    locaFetch();
  }, []);
  return (
    <div className={Style.container}>
      <div className={Style.head_container}>
        <TopTitle Icon={<IoHeartOutline />} Text={"following"} />
      </div>
      <div className={Style.channels_container}>
        {ChannelsData && ChannelsData.length ? (
          ChannelsData.map(({ _id, channelData, followers, uploads }: any) => (
            <Channel
              key={_id}
              Id={_id}
              LinkChannel={"/channel/@/" + _id}
              Title={channelData?.title}
              Username={channelData && channelData?.name}
              ProfileImg={channelData && channelData?.profileImg}
              Uploads={uploads?.length}
              Followers={followers?.length}
              AllFollowers={followers}
              channelData={channelData}
              IsChannelPage={false}
            />
          ))
        ) : (
          <ChannelsLaoding />
        )}
      </div>
    </div>
    
  );
};

export default FollowingPage;
