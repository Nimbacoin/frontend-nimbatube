import React, { useEffect, useState } from "react";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/profile-date.module.css";
import { BsPencilSquare } from "@react-icons/all-files/bs/BsPencilSquare";
import { RiMoneyDollarCircleLine } from "@react-icons/all-files/ri/RiMoneyDollarCircleLine";
import { IoShareSocialOutline } from "@react-icons/all-files/io5/IoShareSocialOutline";
import { IoCameraOutline } from "@react-icons/all-files/io5/IoCameraOutline";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import Content from "./Content";
import Community from "./Community";
import About from "./About";

const ProfileDate = ({ ChannelData }: any) => {
  const UlLinks = [
    { name: "Content", key: "content" },
    { name: "Playlists", key: "playlists" },
    { name: "About", key: "about" },
    { name: "Community", key: "community" },
  ];
  const IconsChannel = [
    { name: "Content", icon: <IoShareSocialOutline /> },
    { name: "Support", icon: <RiMoneyDollarCircleLine /> },
    { name: "Follow", icon: "" },
    { name: "", icon: <IoEllipsisVertical /> },
  ];
  const Bg = "/images/default-profile.png";

  const [LinkKey, setLinkKey] = useState("content");
  const HandelClick = (key: string) => {
    setLinkKey(key);
  };
  const HandelLinkContent = () => {
    if (LinkKey === "content") {
      return <Content />;
    } else if (LinkKey === "playlists") {
      return <Content />;
    } else if (LinkKey === "about") {
      return <About ChannelData={ChannelData.channelData} />;
    } else if (LinkKey === "community") {
      return <Community Name={Name} Id={ChannelData._id} />;
    }
  };
  const [BgUrl, setBgUrl] = useState(Bg);
  const [BgUrlCover, setBgUrlCover] = useState("");
  const [Name, setName] = useState("");
  const [Title, setTitle] = useState("");

  useEffect(() => {
    if (ChannelData && ChannelData.channelData?.profileImg) {
      console.log(ChannelData.channelData?.profileImg);
      setBgUrl(
        process.env.NEXT_PUBLIC_BACK_END_URL +
          "/api/get/read/images/" +
          ChannelData.channelData.profileImg.url
      );
    }
    if (ChannelData && ChannelData.channelData?.coverImg) {
      setBgUrlCover(
        process.env.NEXT_PUBLIC_BACK_END_URL +
          "/api/get/read/images/" +
          ChannelData.channelData.coverImg.url
      );
    }
    if (ChannelData && ChannelData.channelData) {
      setName(ChannelData.channelData.name);
      setTitle(ChannelData.channelData?.title);
    }
  }, [ChannelData]);

  return (
    <div className={Style.container}>
      <div className={Style.container_main}>
        <div
          style={{
            backgroundImage: BgUrlCover.length
              ? `url(${BgUrlCover})`
              : `url(${undefined})`,
          }}
          className={Style.upload_inputs_container}
        >
          {BgUrlCover.length ? (
            <div className={Style.hover_container}></div>
          ) : (
            ""
          )}

          <div className={Style.image_name_conainer}>
            <div className={Style.profile_image_container}>
              <div
                className={Style.profile_image}
                style={{
                  backgroundImage: `url(${BgUrl})`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className={Style.links_container}>
          <span className={Style.name_contanier}>
            <span className={Style.name}> {Name} </span>
            <span className={Style.title}> {Title} </span>
          </span>

          <ul className={Style.channel_links}>
            {UlLinks.map(({ name, key }) => (
              <li
                key={key}
                className={LinkKey === key ? Style.link_active : Style.link}
                onClick={() => {
                  HandelClick(key);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {HandelLinkContent()}
    </div>
  );
};

export default ProfileDate;
