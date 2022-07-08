import React from "react";
import TourCard from "./tours-components/TourCard";
import Style from "../../styles/pages/tours/tours.module.css";
const ToursPage = () => {
  return (
    <div className={Style.container}>
      <div className={Style.tours_container}>
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
        <TourCard />
      </div>
    </div>
  );
};

export default ToursPage;
