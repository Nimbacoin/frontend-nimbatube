import React, { useState } from "react";
import Style from "../../../../styles/pages/chanel/my-chanel/my-chanel-component/profile-date.module.css";
import { BsPencilSquare } from "@react-icons/all-files/bs/BsPencilSquare";
import { RiMoneyDollarCircleLine } from "@react-icons/all-files/ri/RiMoneyDollarCircleLine";
import { IoShareSocialOutline } from "@react-icons/all-files/io5/IoShareSocialOutline";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import Content from "./Content";
import Community from "./Community";
import About from "./About";

const ProfileDate = () => {
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
  const Bg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
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
      return <About />;
    } else if (LinkKey === "community") {
      return <Community />;
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.container_main}>
        <div className={Style.upload_inputs_container}>
          <div className={Style.icons_container_right}>
            {IconsChanel.map(({ name, icon }) => (
              <button key={name} className={Style.camera_of_button}>
                {icon}
                {name}
              </button>
            ))}
            <span className={Style.edit__button_profile_1}>
              <BsPencilSquare />
            </span>
          </div>
          <div className={Style.image_name_conainer}>
            <div className={Style.profile_image_container}>
              <div
                className={Style.profile_image}
                style={{ backgroundImage: `url(${Bg})` }}
              ></div>
            </div>
            <span className={Style.name}>Mrbeast </span>
          </div>
          <span className={Style.edit__button_profile_2}>
            <BsPencilSquare />
          </span>
        </div>
        <div className={Style.links_container}>
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
