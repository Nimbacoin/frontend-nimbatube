import React, { useState } from "react";
import Style from "../../../../styles/pages/chanel/my-chanel/my-chanel-component/profile-date.module.css";

import { RiMoneyDollarCircleLine } from "@react-icons/all-files/ri/RiMoneyDollarCircleLine";
import { IoCameraOutline } from "@react-icons/all-files/io5/IoCameraOutline";
import { IoShareSocialOutline } from "@react-icons/all-files/io5/IoShareSocialOutline";

import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";

import NewGeneral from "./NewGeneral";
import Content from "./Content";
import Tags from "./Tags";
import Other from "./Other";
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
      return <Tags />;
    } else if (LinkKey === "community") {
      return <Other />;
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
          </div>
          <div className={Style.image_name_conainer}>
            <div className={Style.profile_image_container}>
              <div
                className={Style.profile_image}
                style={{ backgroundImage: `url(${Bg})` }}
              >
                <label htmlFor="input_upload" className={Style.input_label}>
                  <input
                    id="input_upload"
                    type="file"
                    className={Style.input_upload}
                  />
                  <span className={Style.camera_of_button_profile}>
                    <IoCameraOutline />
                  </span>
                </label>
              </div>
            </div>
            <span className={Style.name}>Mrbeast </span>
          </div>
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
