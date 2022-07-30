import React, { useState, useEffect } from "react";
import Style from "../../styles/layout/header/header-compnents/side-header.module.css";
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

const SideHeader = () => {
  const NavLinks = [
    { name: "Home", link: "/", icon: <IoHomeOutline /> },
    { name: "Following", link: "/following", icon: <IoHeartOutline /> },
    { name: "Premium", link: "/premium", icon: <IoRibbonOutline /> },
    { name: "Watch Later", link: "/watch-later", icon: <IoTimeOutline /> },
    { name: "Favorites", link: "/favorites", icon: <IoStarOutline /> },

    { name: "Lists", link: "/lists", icon: <IoLayersOutline /> },
    { name: "Watch History", link: "/watch-history", icon: <RiHistoryLine /> },
    { name: "Featured", link: "/featured", icon: <GiPartyHat /> },
    { name: "Pop Culture", link: "/pop-culture", icon: <IoWaterOutline /> },

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
      asPath.includes("/log-in") ||
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
  const HandelOver = () => {
    setIsOverfollow(true);
  };
  const HandelLeave = () => {
    setIsOverfollow(false);
  };

  const HeaderCaseI = () => {
    if (UseMenu === false) {
      return (
        <div
          onMouseEnter={HandelOver}
          onMouseLeave={HandelLeave}
          className={
            MenuBoolean ? Style.container_home : Style.container_home_avtive
          }
        >
          <div className={Style.container_fixed_home}>
            <div
              className={
                MenuBoolean
                  ? Style.all_links_container
                  : Style.all_links_container_home
              }
            >
              <div
                className={
                  !IsOverfollow
                    ? Style.all_links_overflow_hidden
                    : Style.all_links
                }
              >
                {NavLinks.map(({ name, link, icon }) => (
                  <div
                    key={link}
                    className={
                      asPath === link
                        ? Style.link_container_active
                        : Style.link_container
                    }
                  >
                    <Link href={link}>
                      <div className={Style.link}>
                        <span className={Style.icon}>{icon}</span>
                        {MenuBoolean && (
                          <span className={Style.text}>{name}</span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  const HeaderCaseII = () => {
    const Container = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      MenuBoolean
        ? (document.body.style.overflowY = "hidden")
        : (document.body.style.overflowY = "auto");

      if (Container.current) {
        Container.current.style.minHeight = `${window.outerHeight}px`;
      }
    });

    if (UseMenu === true) {
      return (
        <>
          {MenuBoolean && (
            <div
              onMouseEnter={HandelOver}
              onMouseLeave={HandelLeave}
              className={Style.container}
              ref={Container}
            >
              <div className={Style.container_fixed}>
                <div className={Style.all_links_container}>
                  <div className={Style.top_container}>
                    <span onClick={HandelToggleMenu}>
                      {" "}
                      <FiMenu />
                    </span>
                    <Link href="/">
                      <p className={Style.logo}>NimbaTube</p>
                    </Link>
                  </div>
                  <div
                    className={
                      !IsOverfollow
                        ? Style.all_links_overflow_hidden
                        : Style.all_links
                    }
                  >
                    {NavLinks.map(({ name, link, icon }) => (
                      <div
                        key={link}
                        className={
                          asPath === link
                            ? Style.link_container_active
                            : Style.link_container
                        }
                      >
                        <Link href={link}>
                          <div className={Style.link}>
                            <span className={Style.icon}>{icon}</span>
                            <span className={Style.text}>{name}</span>
                          </div>
                        </Link>
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
  return (
    <>
      {HeaderCaseII()}
      {HeaderCaseI()}
    </>
  );
};

export default SideHeader;
