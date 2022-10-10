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

const ChannelsPages = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const channels = useSelector((state: any) => state.ChannelSlice.allChannels);
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
        {/* <Link href="/channel/new"> */}
        <button onClick={HandelSubmiteInitChannel} className={Style.button}>
          {" "}
          New Chanel{" "}
        </button>
        {/* </Link> */}
      </div>
      <div className={Style.channels_container}>
        {channels.length ? (
          channels.map(({ _id, channelData, followers, uploads }: any) => (
            <Channel
              key={_id}
              Id={_id}
              LinkChannel={"/channel/@/" + _id}
              IsChanelPage={false}
              Title={channelData?.title}
              Username={channelData && channelData.name}
              ProfileImg={channelData && channelData.profileImg}
              Uploads={uploads.length}
              Followers={followers.length}
            />
          ))
        ) : (
          <ChannelsLaoding />
        )}
      </div>

      {/* <ChannelsLaoding /> */}
    </div>
  );
};

export default ChannelsPages;
