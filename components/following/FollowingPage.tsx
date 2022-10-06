import React, { useEffect, useState } from "react";
import Chanel from "./components/ChannelCard";
import Style from "../../styles/pages/following/following.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
const FollowingPage = ({  }: any) => {
  const [ChannelsData, setChannelsData] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      await basedGetUrlRequestLogedIn(
        "/api/get/channel/following-channels/"
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
      {/* <Chanel IsChanelPage={true} /> */}
      {ChannelsData.length
        ? ChannelsData.map(({ _id, channelData }: any) => (
            <Chanel
              Id={_id}
              LinkChannel={"/channel/" + _id}
              IsChanelPage={false}
              Title={channelData?.title}
              Username={channelData?.name}
              ProfileImg={channelData?.profileImg}
              // Uploads={uploads.length}
              // Followers={followers.length}
            />
          ))
        : null}
    </div>
  );
};

export default FollowingPage;
