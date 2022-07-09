import Style from "../../../../styles/pages/tour/tour-components/slider-and-book-form/tour-data.module.css";
import React, { useEffect, useState, useRef } from "react";
import { IoTimeOutline } from "@react-icons/all-files/io5/IoTimeOutline";
import { IoCarOutline } from "@react-icons/all-files/io5/IoCarOutline";
import { IoMdPhonePortrait } from "@react-icons/all-files/io/IoMdPhonePortrait";
import { IoChatbubblesOutline } from "@react-icons/all-files/io5/IoChatbubblesOutline";
import { IoPeopleOutline } from "@react-icons/all-files/io5/IoPeopleOutline";

const TourData = () => {
  const TourDataItems = [
    { name: "Professional", icon: <IoTimeOutline /> },
    { name: "Hotel pickup offered", icon: <IoCarOutline /> },
    { name: "Mobile ticket", icon: <IoMdPhonePortrait /> },
    { name: "Offered in: English", icon: <IoChatbubblesOutline /> },
    { name: "Good for avoiding crowds", icon: <IoPeopleOutline /> },
  ];
  return (
    <div className={Style.container}>
      {TourDataItems.map(({ name, icon }) => (
        <div className={Style.data_container}>
          <i className={Style.icon}>{icon}</i>
          <span className={Style.data}>{name}</span>
        </div>
      ))}
    </div>
  );
};

export default TourData;
