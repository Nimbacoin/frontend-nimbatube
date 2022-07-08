import React from "react";
import SlideAndBookForm from "./tour-components/slider-and-book-form/SlideAndBookForm";
import Style from "../../styles/pages/tour/tour.module.css";

const TourPage = () => {
  return (
    <div className={Style.container}>
      <SlideAndBookForm />
    </div>
  );
};

export default TourPage;
