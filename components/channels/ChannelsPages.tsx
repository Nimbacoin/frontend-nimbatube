import Link from "next/link";
import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/channels/channels.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
import { useDispatch, useSelector } from "react-redux";
import Channel from "../following/components/ChannelCard";
import { AllChannelsRedcuer } from "../../redux/channel-slice/ChannelSlice";

const ChannelsPages = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state: any) => state.ChannelSlice.allChannels);
  console.log(channels);
  return (
    <div className={Style.container}>
      <div className={Style.head_container}>
        <div className={Style.title}>Your Active channels </div>
        <Link href="/channel/new">
          <button className={Style.button}> New Chanel </button>
        </Link>
      </div>

      {channels &&
        channels.map(({ _id, channelData, followers, uploads }: any) => (
          <Channel
            key={_id}
            Id={_id}
            LinkChannel={"/channel/" + _id}
            IsChanelPage={false}
            Title={channelData?.title}
            Username={channelData && channelData.name}
            ProfileImg={channelData && channelData.profileImg}
            Uploads={uploads.length}
            Followers={followers.length}
          />
        ))}
    </div>
  );
};

export default ChannelsPages;
