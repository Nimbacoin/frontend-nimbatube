import Link from "next/link";
import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/channels/channels.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
import { useDispatch, useSelector } from "react-redux";
import Channel from "../following/components/ChannelCard";
import { AllChannelsRedcuer } from "../../redux/channel-slice/ChannelSlice";
import basedPostUrlRequestLogedIn from "../../utils/basedPostUrlRequestLogedIn";
import { useRouter } from "next/router";
import ChannelsLaoding from "../modals/pages-boforload/ChannelsLaoding";
import BlueButton from "../modals/BlueButton";

const ChannelsPages = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const channels = useSelector((state: any) => state.ChannelSlice.allChannels);
  const allChannelsFetched = useSelector(
    (state: any) => state.ChannelSlice.allChannelsFetched
  );
  const HandelSubmiteInitChannel = async (e: any) => {
    const ReqData: any = { general: "", images: "" };
    await basedPostUrlRequestLogedIn(
      "/api/post/channel/init-channel/",
      ReqData
    ).then((res) => {
      if (res?.responsData) {
        Router.push("/channel/create-new-channel/" + res?.responsData?._id);
      }
    });
  };

  return (
    <div className={Style.container}>
      <div className={Style.head_container}>
        <div className={Style.title}>Your Active channels </div>

        <BlueButton
          HandelClick={HandelSubmiteInitChannel}
          Text={"New Chanel"}
        />
      </div>
      <div className={Style.channels_container}>
        {channels && channels.length ? (
          channels.map(({ _id, channelData, followers, uploads }: any) => (
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
        ) : allChannelsFetched ? (
          "you have no channel you"
        ) : (
          <ChannelsLaoding />
        )}
      </div>
    </div>
  );
};

export default ChannelsPages;
