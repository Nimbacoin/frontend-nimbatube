import Link from "next/link";
import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-center.module.css";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";
import { HiOutlineSun } from "@react-icons/all-files/hi/HiOutlineSun";
import { useRouter } from "next/router";

const HeaderCenter = () => {
  const NavLinks = [
    { name: "Tours", link: "/tours" },
    { name: "Excursions", link: "/excursions" },
    { name: "Destinations", link: "/destinations" },
    { name: "Contact", link: "/contact" },
  ];
  const { asPath } = useRouter();
  return (
    <div className={Style.container}>
      <div className={Style.container_search}>
        <input className={Style.search_input} placeholder="search" />
        <button className={Style.search_button}>
          <IoSearchOutline />
        </button>
      </div>
      <div className={Style.buttons_container}>
        <button className={Style.rest_of_button}>
          <IoCloudUploadOutline />
        </button>
        <button className={Style.rest_of_button}>
          <IoNotificationsOutline />
        </button>
        <button className={Style.rest_of_button}>
          <HiOutlineSun />
        </button>
      </div>
    </div>
  );
};

export default HeaderCenter;
