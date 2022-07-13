import React, { useEffect, useState, useRef } from "react";
import Style from "../../../styles/layout/header/header-compnents/header-drop-down.module.css";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import { IoPersonOutline } from "@react-icons/all-files/io5/IoPersonOutline";
import Link from "next/link";
import { useRouter } from "next/router";
import { link } from "fs";

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
      name: "Uploads",
      link: "uploads",
      icon: <IoCloudUploadOutline />,
      classname: Style.link_container,
      username : "@mrbeast",
      chanelname: "MrBeasr",
    },
    {
      name: "Uploads",
      link: "uploads",
      icon: <IoCloudUploadOutline />,
      classname: Style.link_container,
    },
    {
      name: "Sing Out",
      link: "Sing Out",
      icon: <IoCloudUploadOutline />,
      classname: Style.link_container,
    },
  ];
  const HandelClick = (e: any, link: string) => {
    if (e.target.id === "Sing Out") {
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
            <div className={Style.drop_down_option} ref={InputSearch}>
              <IoPersonOutline />
            </div>
            {ShowDiv && (
              <div className={Style.drop_down_container} ref={Ref}>
                {AllLink.map(({ link, name, icon, classname }) => (
                  <div
                    key={name}
                    onClick={(e) => HandelClick(e, link)}
                    className={classname}
                    id={name}
                  >
                    {name} {icon}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}
    </>
  );
};

export default HeaderDropDown;
