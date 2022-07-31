import React, { useEffect, useState, useRef } from "react";
import Style from "../../../styles/layout/header/header-compnents/header-drop-down.module.css";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import { IoPersonOutline } from "@react-icons/all-files/io5/IoPersonOutline";
import { IoPeopleOutline } from "@react-icons/all-files/io5/IoPeopleOutline";
import { IoRibbonOutline } from "@react-icons/all-files/io5/IoRibbonOutline";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { IoMdHelpCircleOutline } from "@react-icons/all-files/io/IoMdHelpCircleOutline";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import Link from "next/link";
import { useRouter } from "next/router";
import { link } from "fs";
const Bg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
const HeaderDropDown = () => {
  const [ShowDiv, setShowDiv] = useState(false);
  const Router = useRouter();
  const Ref = React.useRef<HTMLDivElement>(null);
  const InputSearch = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const HandelClick = (e: any) => {
      if (InputSearch && InputSearch.current) {
        const refany = InputSearch.current;
        if (refany.contains(e.target)) {
          setShowDiv(!ShowDiv);
        } else if (Ref && Ref.current) {
          const refany = Ref.current;
          if (!refany.contains(e.target)) {
            setShowDiv(false);
          }
        }
      }
    };
    window.addEventListener("click", HandelClick);
  }, [ShowDiv]);
  const AllLink = [
    {
      name: "Your Chanel",
      link: "/chanel/@mrbeast",
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
      name: "Chanels",
      link: "/chanels",
      icon: "@",
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
            <div className={Style.drop_down_option_sold}>
              <FcCircuit />
              <span className={Style.sold}>0.25</span>
            </div>
            <div className={Style.drop_down_option} ref={InputSearch}>
              <IoPersonOutline />
            </div>
            {ShowDiv && (
              <div className={Style.drop_down_container} ref={Ref}>
                {AllLink.map(
                  ({ link, img, name, chanelname, icon, classname }) => (
                    <div
                      key={name}
                      onClick={(e) => HandelClick(e, link)}
                      className={classname}
                      id={link}
                    >
                      {icon && <span className={Style.icon}> {icon}</span>}
                      {img && (
                        <div
                          style={{ backgroundImage: `url(${img})` }}
                          className={Style.img}
                        ></div>
                      )}
                      <div className={Style.link_data}>
                        {name && <span className={Style.name}> {name}</span>}
                        {chanelname && (
                          <span className={Style.chanelname}>
                            {" "}
                            {chanelname}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        );
      })()}
    </>
  );
};

export default HeaderDropDown;
