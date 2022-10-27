import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Style from "../../styles/layout/header/header-compnents/header-case-i.module.css";

const MainMenuDiv = ({ arrayMap }: any) => {
  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);
  const { asPath } = useRouter();

  return (
    <div className={Style.main_menu_div}>
      {arrayMap.map(({ name, link, icon }: any) => (
        <div
          key={link}
          className={
            asPath === link ? Style.link_container_active : Style.link_container
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

export default MainMenuDiv;
