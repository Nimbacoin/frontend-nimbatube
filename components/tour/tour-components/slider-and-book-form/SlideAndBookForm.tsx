import React from "react";
import BookForm from "./BookForm";
import Path from "./Path";
import Slider from "./Slider";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";

import { GoVerified } from "@react-icons/all-files/go/GoVerified";

import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";

import Style from "../../../../styles/pages/tour/tour-components/slider-and-book-form/slider-and-book-form.module.css";
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
          <span className={Style.stars}>{repeat}</span> 523 Reviews |{" "}
          <GoVerified />
          Badge of Excellence | Marrakech, Morocco
        </h2>
      </div>
      <div className={Style.container_slider_and_form}>
        <Slider />
        <BookForm />
      </div>
    </div>
  );
};

export default SlideAndBookForm;
