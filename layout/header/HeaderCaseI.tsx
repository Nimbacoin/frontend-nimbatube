import React, { useState, useEffect } from "react";
import Style from "../../styles/layout/header/header-compnents/header-case-i.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  MenuWidth,
  ToggleMenu,
  ToggleMenuOverAll,
} from "../../redux/style-slice/menu/SideMenu";
import { useRouter } from "next/router";
import Link from "next/link";
import MainMenuDiv from "./MainMenuDiv";
import NavLinks from "./NavLinks";

const HeaderCaseI = () => {
  const [samllMenuItem, setSamllMenuItem] = useState(NavLinks);
  const [seconMenuItem, setSeconMenuItem] = useState(NavLinks);
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);

  const [UseMenu, setUseMenu] = useState(true);

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
      dispatch(ToggleMenuOverAll("true"));
    } else {
      if (window.innerWidth <= 900) {
        setUseMenu(true);
        dispatch(ToggleMenuOverAll("true"));
      } else {
        setUseMenu(false);
        dispatch(ToggleMenuOverAll("false"));
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
      setSamllMenuItem(NavLinks.slice(0, 5));
      setSeconMenuItem([]);
    } else {
      setSamllMenuItem(NavLinks.slice(0, 5));
      setSeconMenuItem(NavLinks.slice(5, NavLinks.length));
    }
  }, [MenuBoolean]);

  const HandelOver = () => {
    if (!MenuBoolean) {
      setIsOverfollow(true);
    }
  };
  const HandelLeave = () => {
    setIsOverfollow(false);
  };
  const Container = React.useRef<HTMLDivElement | null>(null);
  const ContainerWhite = React.useRef<HTMLDivElement | null>(null);
  const handelChangeMenu = () => {
    if (Container.current) {
      const data = Container.current.getBoundingClientRect();
      dispatch(MenuWidth(data.width));
    }
    if (Container.current && ContainerWhite.current) {
      const data = ContainerWhite.current.getBoundingClientRect();

      Container.current.style.left = `${data.left}px`;
      Container.current.style.width = `${data.width}px`;
    }
  };

  const menuBooleanAllOver = useSelector(
    (state: any) => state.SideMenu.menuBooleanAllOver
  );
  const handelChangeMenuAll = () => {
    if (ContainerWhite.current) {
      if (menuBooleanAllOver) {
        ContainerWhite.current.className = Style.hidden;
        console.log("hidden");
      } else {
        if (MenuBoolean) {
          ContainerWhite.current.className = Style.white_ontainer_home_avtive;
        } else {
          ContainerWhite.current.className = Style.white_ontainer_home;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      handelChangeMenuAll();

      handelChangeMenu();
    });

    handelChangeMenuAll();
    handelChangeMenu();
  });
  return (
    <div
      ref={ContainerWhite}
      className={
        MenuBoolean
          ? Style.white_ontainer_home_avtive
          : Style.white_ontainer_home
      }
    >
      {(() => {
        if (UseMenu === false) {
          return (
            <div
              onMouseEnter={HandelOver}
              onMouseLeave={HandelLeave}
              ref={Container}
              className={
                MenuBoolean ? Style.container_home_avtive : Style.container_home
              }
            >
              {" "}
              <div
                className={
                  IsOverfollow
                    ? Style.all_links
                    : Style.all_links_overflow_hidden
                }
              >
                {samllMenuItem.length ? (
                  <MainMenuDiv arrayMap={samllMenuItem} />
                ) : null}

                {seconMenuItem.length ? (
                  <MainMenuDiv arrayMap={seconMenuItem} />
                ) : null}
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default HeaderCaseI;
