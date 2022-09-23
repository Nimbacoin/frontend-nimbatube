import React from "react";
import Chanel from "./components/ChannelCard";
import Style from "../../styles/pages/following/following.module.css";
const FollowingPage = ({ ChannelsData }: any) => {
  console.log(ChannelsData);
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
