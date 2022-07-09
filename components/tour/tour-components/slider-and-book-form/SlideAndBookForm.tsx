import React from "react";
import BookForm from "./BookForm";
import Path from "./Path";
import Slider from "./Slider";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoShareOutline } from "@react-icons/all-files/io5/IoShareOutline";
import { GoVerified } from "@react-icons/all-files/go/GoVerified";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import Style from "../../../../styles/pages/tour/tour-components/slider-and-book-form/slider-and-book-form.module.css";
import TourData from "./TourData";


const SlideAndBookForm = () => {
  const repeat = Array(5)
    .fill(0)
    .map((_, i) => (
      <i key={i}>
        <BsStarFill />
      </i>
    ));
  //<IoHeartOutline /i>
  return (
    <div className={Style.container}>
      <Path />
      <h2 className={Style.title}>
        Atlas Mountains and 3 Valleys & Waterfalls & Desert Agafay - Day Trip
        Marrakech
      </h2>
      <div className={Style.rating_date}>
        <h2 className={Style.reveiws}>
          <span className={Style.stars}>{repeat}</span>
          <span className={Style.reveiws_number}>523 Reviews </span>|
          <span className={Style.badge}>
            <GoVerified /> Badge of Excellence
          </span>
          |<span className={Style.location}>Marrakech, Morocco</span>
        </h2>
        <div className={Style.add_to_wish_list}>
          <span className={Style.share}>
            <IoShareOutline /> Share
          </span>
          <span className={Style.wish_list}>
            <IoHeartOutline />
            Add to wish list
          </span>
        </div>
      </div>
      <div className={Style.container_slider_and_form}>
        <Slider />
        <BookForm />
      </div>
      <TourData />
    </div>
  );
};

export default SlideAndBookForm;
