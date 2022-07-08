import React from "react";
import Style from "../../../styles/pages/tours/tours-card.module.css";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import Link from "next/link";

const Bg =
  "https://morokotour.vercel.app/images/ait-ben-haddou-images/ourzazate-aitbenhadou3.jpg";
const Name = "2 Days Tour Marrakech to Zagora Desert";
const Desc =
  "Like the cities of Fez, Rabat and Meknes, Marrakech has the privilege of being a Makhzen city, i.e. imperial, and the successive dynasties that have populated it have enriched it. It also enjoys a special prestige: that of giving its name to the whole country. Marrakech is listed as one of the most important cultural centers of Morocco.";
const ToursCard = () => {
  return (
    <Link href="/tours/3days">
      <div className={Style.container}>
        <>
          <div
            className={Style.container_img}
            style={{ backgroundImage: `url(${Bg})` }}
          >
            <IoHeartOutline />
          </div>
          <div className={Style.container_desc}>
            <b className={Style.title}>{Name}</b>
            <p className={Style.data_line}>
              <span className={Style.days}>8 days - </span>
              <b className={Style.rating}>
                5.0 <BsStarFill />
              </b>
              <span className={Style.reviews}>(15)</span>
            </p>
            <p className={Style.desc}>{Desc.slice(0, 100) + "..."}</p>
            <div className={Style.price_data}>
              <span className={Style.price}> From €1,672 </span>
              <button className={Style.book_now}>Book Now</button>
            </div>
          </div>
        </>
      </div>
    </Link>
  );
};

export default ToursCard;
