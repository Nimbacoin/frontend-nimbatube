import React from "react";
import SlideAndBookForm from "./tour-components/slider-and-book-form/SlideAndBookForm";
import Style from "../../styles/pages/tour/tour.module.css";
import TourDetails from "./tour-components/tour-details/TourDetails";

const TourPage = () => {
  return (
    <div className={Style.container}>
      <SlideAndBookForm />
      <TourDetails />
    </div>
  );
};

export default TourPage;
