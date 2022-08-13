import React, { useEffect, useState } from "react";
import Style from "../../../../styles/pages/chanel/my-chanel/my-chanel-component/profile-date.module.css";
import { BsPencilSquare } from "@react-icons/all-files/bs/BsPencilSquare";
import { RiMoneyDollarCircleLine } from "@react-icons/all-files/ri/RiMoneyDollarCircleLine";
import { IoShareSocialOutline } from "@react-icons/all-files/io5/IoShareSocialOutline";
import { IoCameraOutline } from "@react-icons/all-files/io5/IoCameraOutline";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import Content from "./Content";
import Community from "./Community";
import About from "./About";

const ProfileDate = ({ ChanelData }: any) => {
  const UlLinks = [
    { name: "Content", key: "content" },
    { name: "Playlists", key: "playlists" },
    { name: "About", key: "about" },
    { name: "Community", key: "community" },
  ];
  const IconsChanel = [
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
      return <About ChanelData={ChanelData.chanelData} />;
    } else if (LinkKey === "community") {
      return <Community Name={Name} Id={ChanelData._id} />;
    }
  };
  const [BgUrl, setBgUrl] = useState(Bg);
  const [BgUrlCover, setBgUrlCover] = useState("");
  const [Name, setName] = useState("");
  const [Title, setTitle] = useState("");

  useEffect(() => {
    if (ChanelData && ChanelData.chanelData?.profileImg) {
      setBgUrl(ChanelData.chanelData.profileImg.url);
    }
    if (ChanelData && ChanelData.chanelData?.coverImg) {
      setBgUrlCover(ChanelData.chanelData.coverImg.url);
    }
    if (ChanelData && ChanelData.chanelData) {
      setName(ChanelData.chanelData.name);
      setTitle(ChanelData.chanelData?.title);
    }
  }, [ChanelData]);

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

          <ul className={Style.chanel_links}>
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
