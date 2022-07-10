import React from "react";

import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoShareOutline } from "@react-icons/all-files/io5/IoShareOutline";
import { GoVerified } from "@react-icons/all-files/go/GoVerified";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import Style from "../../../../styles/pages/tour/tour-components/tour-details/tour-details.module.css";
import OverviewHighlitesPlaces from "./OverviewHighlitesPlaces";

const TourDetails = () => {
  return (
    <div className={Style.container}>
      <OverviewHighlitesPlaces />
    </div>
  );
};

export default TourDetails;
