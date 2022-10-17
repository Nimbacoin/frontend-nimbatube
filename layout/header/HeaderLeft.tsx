import Image from "next/image";
import Link from "next/link";
import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-left.module.css";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { useDispatch } from "react-redux";
import { ToggleMenu } from "../../redux/style-slice/menu/SideMenu";
import { FaPlayCircle } from "@react-icons/all-files/fa/FaPlayCircle";
const HeaderLeft = () => {
  const dispatch = useDispatch();
  const HandelToggleMenu = () => {
    dispatch(ToggleMenu());
  };
  return (
    <div className={Style.container}>
      <span onClick={HandelToggleMenu}>
        <FiMenu />
      </span>
      <Link href="/">
        <p className={Style.logo}>
          <span className={Style.icon}>
            {" "}
            <FaPlayCircle />
          </span>
          NimbaTube
        </p>
      </Link>
    </div>
  );
};
//Fdf
export default HeaderLeft;
