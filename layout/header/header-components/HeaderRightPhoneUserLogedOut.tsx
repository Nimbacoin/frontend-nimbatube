import React, { useEffect, useState, useRef } from "react";
import Style from "../../../styles/layout/header/header-compnents/header-right-phone-user-loged-out.module.css";
import { IoLogInOutline } from "@react-icons/all-files/io5/IoLogInOutline";
import { IoPersonOutline } from "@react-icons/all-files/io5/IoPersonOutline";
import { IoPersonAddOutline } from "@react-icons/all-files/io5/IoPersonAddOutline";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { IoMdHelpCircleOutline } from "@react-icons/all-files/io/IoMdHelpCircleOutline";
import { useRouter } from "next/router";

const HeaderRightPhoneUserLogedOut = () => {
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
      name: "Sign in",
      link: "/auth/sign-in",
      icon: <IoLogInOutline />,
    },
    {
      name: "Sign up",
      link: "/auth/sign-up",
      icon: <IoPersonAddOutline />,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <IoSettingsOutline />,
    },

    {
      name: "Help",
      link: "/help",
      icon: <IoMdHelpCircleOutline />,
    },
  ];
  const HandelClick = (e: any, link: string) => {
    Router.push(link);
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
                {AllLink.map(({ link, name, icon }) => (
                  <div
                    key={name}
                    onClick={(e: any) => HandelClick(e, link)}
                    className={Style.link_container}
                    id={link}
                  >
                    {icon && <span className={Style.icon}> {icon}</span>}
                    <div className={Style.link_data}>
                      {name && <span className={Style.name}> {name}</span>}
                    </div>
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

export default HeaderRightPhoneUserLogedOut;
