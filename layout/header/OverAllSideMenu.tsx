import React, { useState, useEffect } from "react";
import Style from "../../styles/layout/header/header-compnents/over-all-sideMenu.module.css";

import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { useDispatch, useSelector } from "react-redux";
import { ToggleMenu } from "../../redux/style-slice/menu/SideMenu";
import { useRouter } from "next/router";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { MainHeaderLeft } from "./HeaderLeft";

const OverAllSideMenu = () => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);
  const [UseMenu, setUseMenu] = useState(true);

  const HandelToggleMenu = () => {
    dispatch(ToggleMenu());
  };
  useEffect(() => {
    HandelMenu();
  });
  const HandelMenu = () => {
    if (
      asPath.includes("/sign-in") ||
      asPath.includes("/chanel/new") ||
      asPath.includes("/sign-up") ||
      asPath.includes("/watch/") ||
      asPath.includes("/channel/create-new-channel/")
    ) {
      setUseMenu(true);
    } else {
      if (window.innerWidth <= 900) {
        setUseMenu(true);
      } else {
        setUseMenu(false);
      }
    }
  };
  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth <= 900) {
        setUseMenu(true);
      } else {
        setUseMenu(false);
      }
    };
  });
  const [IsOverfollow, setIsOverfollow] = useState(false);

  const HandelLeave = () => {
    setIsOverfollow(false);
  };

  const OverAllSideMenu = () => {
    const Container = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      // MenuBoolean
      //   ? (document.body.style.overflowY = "hidden")
      //   : (document.body.style.overflowY = "auto");

      if (Container.current) {
        Container.current.style.minHeight = `${window.outerHeight}px`;
      }
    });
    const Router = useRouter();
    const handelClick = (link: any) => {
      Router.push(link);
      setTimeout(() => {
        HandelToggleMenu();
      }, 500);
    };

    if (UseMenu === true) {
      return (
        <>
          {MenuBoolean && (
            <div className={Style.container} ref={Container}>
              <div className={Style.container_fixed}>
                <div className={Style.all_links_container}>
                  <div className={Style.top_container}>
                    <MainHeaderLeft />
                  </div>
                  <div className={Style.all_links}>
                    {NavLinks.map(({ name, link, icon }) => (
                      <div
                        key={link}
                        className={
                          asPath === link
                            ? Style.link_container_active
                            : Style.link_container
                        }
                      >
                        <div
                          onClick={() => {
                            handelClick(link);
                          }}
                          // href={link}
                        >
                          <div className={Style.link}>
                            <span className={Style.icon}>{icon}</span>
                            <span className={Style.text}>{name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={Style.hover} onClick={HandelToggleMenu}></div>
              </div>
            </div>
          )}
        </>
      );
    }
  };
  return <>{OverAllSideMenu()}</>;
};

export default OverAllSideMenu;
