import React from "react";
import Style from "../../../styles/pages/destinations/destinations-samll-card.module.css";
import { IoLocationOutline } from "@react-icons/all-files/io5/IoLocationOutline";
const Bg =
  "https://morokotour.vercel.app/images/ait-ben-haddou-images/ourzazate-aitbenhadou3.jpg";
const DestinationsSamllCard = () => {
  return (
    <div className={Style.container_place}>
      <div
        className={Style.container_img}
        style={{ backgroundImage: `url(${Bg})` }}
      ></div>
      <div className={Style.container_desc}>
        <b className={Style.title}>Marrakech</b>
        <p className={Style.desc}>More then 1222 Tours </p>
      </div>
    </div>
  );
};

export default DestinationsSamllCard;
