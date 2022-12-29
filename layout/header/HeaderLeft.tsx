import Image from "next/image";
import Link from "next/link";
import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-left.module.css";
import { BsList } from "@react-icons/all-files/bs/BsList";
import { useDispatch } from "react-redux";
import { ToggleMenu } from "../../redux/style-slice/menu/SideMenu";
import { FaPlayCircle } from "@react-icons/all-files/fa/FaPlayCircle";
import GoogleIcon from "../../components/modals/GoogleIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
export const MainHeaderLeft = () => {
  const dispatch = useDispatch();
  const HandelToggleMenu = () => {
    dispatch(ToggleMenu());
  };
  return (
    <div className={Style.container_main}>
      <div className={Style.container_menu} onClick={HandelToggleMenu}>
        <BsList />
      </div>
      <Link href="/">
        <p className={Style.logo}>
          <span className={Style.icon}>
            <PlayArrowIcon />
          </span>
          NimbaTube
        </p>
      </Link>
    </div>
  );
};
const HeaderLeft = () => {
  const dispatch = useDispatch();
  const HandelToggleMenu = () => {
    dispatch(ToggleMenu());
  };

  return (
    <div className={Style.container}>
      <MainHeaderLeft />
    </div>
  );
};

export default HeaderLeft;
