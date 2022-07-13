import React, { useEffect, useState, useRef } from "react";
import Style from "../../../styles/layout/header/header-compnents/header-drop-down.module.css";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import { IoPersonOutline } from "@react-icons/all-files/io5/IoPersonOutline";
import { IoPeopleOutline } from "@react-icons/all-files/io5/IoPeopleOutline";
import { IoRibbonOutline } from "@react-icons/all-files/io5/IoRibbonOutline";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { IoMdHelpCircleOutline } from "@react-icons/all-files/io/IoMdHelpCircleOutline";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";

import Link from "next/link";
import { useRouter } from "next/router";
import { link } from "fs";
const Bg =
  "https://scontent.fvit1-1.fna.fbcdn.net/v/t39.30808-6/288368479_5078956948868473_6446883941384535955_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=843cd7&_nc_ohc=QVdNmwF0fz0AX9TaBdI&_nc_ht=scontent.fvit1-1.fna&oh=00_AT8WMfSBJToD6yYf9L12f5oau_uE1Cjj6R15cLiUa_GukQ&oe=62D3771B";
const SearchDropDown = () => {
  const [ShowDiv, setShowDiv] = useState(false);
  const Router = useRouter();

  const AllLink = [
    {
      name: "Your Chanel",
      link: "/chanel",
      classname: Style.chanel_container,
      img: Bg,
      chanelname: "MrBeasr",
    },
    {
      name: "Uploads",
      link: "/uploads",
      icon: <IoCloudUploadOutline />,
      classname: Style.link_container,
    },

    {
      name: "invite",
      link: "/invite",
      icon: <IoPeopleOutline />,
      classname: Style.link_container,
    },
    {
      name: "nimbatube premium",
      link: "/premium",
      icon: <IoRibbonOutline />,
      classname: Style.link_container,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <IoSettingsOutline />,
      classname: Style.link_container,
    },

    {
      name: "Help",
      link: "/help",
      icon: <IoMdHelpCircleOutline />,
      classname: Style.link_container,
    },
    {
      name: "Sing Out",
      link: "sing-out",
      icon: <IoLogOutOutline />,
      chanelname: "mrbeasr-chancel@minbatube.com",

      classname: Style.sing_out_container,
    },
  ];
  const HandelClick = (e: any, link: string) => {
    if (e.target.id === "sing-out") {
      alert(e);
    } else {
      Router.push(link);
    }
  };
  return (
    <>
      {(() => {
        return (
          <div className={Style.container}>
            <div className={Style.drop_down_container}>
              
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default SearchDropDown;
