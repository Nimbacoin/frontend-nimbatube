import React, { useState, useEffect } from "react";
import Style from "../../styles/layout/header/header-compnents/header-case-i.module.css";
import { IoHomeOutline } from "@react-icons/all-files/io5/IoHomeOutline";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoRibbonOutline } from "@react-icons/all-files/io5/IoRibbonOutline";
import { IoTimeOutline } from "@react-icons/all-files/io5/IoTimeOutline";
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";
import { IoLayersOutline } from "@react-icons/all-files/io5/IoLayersOutline";
import { RiHistoryLine } from "@react-icons/all-files/ri/RiHistoryLine";
import { GiPartyHat } from "@react-icons/all-files/gi/GiPartyHat";
import { IoWaterOutline } from "@react-icons/all-files/io5/IoWaterOutline";
import { IoBrushOutline } from "@react-icons/all-files/io5/IoBrushOutline";
import { IoBookOutline } from "@react-icons/all-files/io5/IoBookOutline";
import { IoAccessibilityOutline } from "@react-icons/all-files/io5/IoAccessibilityOutline";
import { IoMusicalNotesOutline } from "@react-icons/all-files/io5/IoMusicalNotesOutline";
import { IoGameControllerOutline } from "@react-icons/all-files/io5/IoGameControllerOutline";
import { RiMoneyDollarCircleLine } from "@react-icons/all-files/ri/RiMoneyDollarCircleLine";
import { IoNewspaperOutline } from "@react-icons/all-files/io5/IoNewspaperOutline";
import { IoCompassOutline } from "@react-icons/all-files/io5/IoCompassOutline";
import { FiSmartphone } from "@react-icons/all-files/fi/FiSmartphone";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { useDispatch, useSelector } from "react-redux";
import { ToggleMenu } from "../../redux/style-slice/menu/SideMenu";
import { useRouter } from "next/router";
import Link from "next/link";

const HeaderCaseI = () => {
  const NavLinks = [
    { name: "Home", link: "/", icon: <IoHomeOutline /> },
    { name: "Following", link: "/following", icon: <IoHeartOutline /> },
    { name: "Premium", link: "/premium", icon: <IoRibbonOutline /> },
    { name: "Watch Later", link: "/watch-later", icon: <IoTimeOutline /> },
    { name: "Favorites", link: "/favorites", icon: <IoStarOutline /> },

    { name: "Lists", link: "/lists", icon: <IoLayersOutline /> },
    { name: "Watch History", link: "/watch-history", icon: <RiHistoryLine /> },

    { name: "Featured", link: "/featured", icon: <GiPartyHat /> },

    { name: "Artists", link: "/artists", icon: <IoBrushOutline /> },
    { name: "Education", link: "/education", icon: <IoBookOutline /> },
    { name: "Lifestyle", link: "/lifestyle", icon: <IoAccessibilityOutline /> },

    { name: "Music", link: "/music", icon: <IoMusicalNotesOutline /> },
    {
      name: "Gaming",
      link: "/gaming",
      icon: <IoGameControllerOutline />,
    },
    { name: "Tech", link: "/tech", icon: <FiSmartphone /> },
    {
      name: "Finance",
      link: "/finance",
      icon: <RiMoneyDollarCircleLine />,
    },
    {
      name: "News & politics",
      link: "/news-politics",
      icon: <IoNewspaperOutline />,
    },
    { name: "Explore", link: "/explore", icon: <IoCompassOutline /> },
  ];
  const [samllMenuItem, setSamllMenuItem] = useState(NavLinks);
  const [seconMenuItem, setSeconMenuItem] = useState(NavLinks);
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
      asPath.includes("/watch/")
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
  useEffect(() => {
    if (MenuBoolean) {
      setSamllMenuItem(NavLinks.slice(0, 6));
      setSeconMenuItem([]);
    } else {
      setSamllMenuItem(NavLinks.slice(0, 6));
      setSeconMenuItem(NavLinks.slice(6, NavLinks.length));
    }
  }, [MenuBoolean]);

  const HandelOver = () => {
    if (!MenuBoolean) {
      setIsOverfollow(false);
    }
  };
  const HandelLeave = () => {
    setIsOverfollow(true);
  };
  const mainMenuDiv = ({ arrayMap }: any) => {
    return (
      <div className={Style.main_menu_div}>
        {NavLinks.map(({ name, link, icon }: any) => (
          <div
            key={link}
            className={
              asPath === link
                ? Style.link_container_active
                : Style.link_container
            }
          >
            <Link href={link}>
              <div className={MenuBoolean ? Style.link_flex : Style.link}>
                <span className={Style.icon}>{icon}</span>

                <span className={MenuBoolean ? Style.text_all : Style.text}>
                  {name}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {(() => {
        if (UseMenu === false) {
          return (
            <div
              onMouseEnter={HandelOver}
              onMouseLeave={HandelLeave}
              className={
                MenuBoolean ? Style.container_home_avtive : Style.container_home
              }
            >
              <div
                className={
                  !IsOverfollow
                    ? Style.all_links
                    : Style.all_links_overflow_hidden
                }
              >
                {mainMenuDiv(samllMenuItem)}
                {mainMenuDiv(seconMenuItem)}
              </div>
            </div>
          );
        }
      })()}
    </>
  );
};

export default HeaderCaseI;
