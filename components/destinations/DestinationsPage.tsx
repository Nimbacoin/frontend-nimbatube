import React from "react";
import DestinationsCard from "./destinations-components/DestinationsCard";
import Style from "../../styles/pages/destinations/destinations.module.css";
const DestinationsPage = () => {
  return (
    <div className={Style.container}>
      <div className={Style.destinations_container}>
        <DestinationsCard />
        <DestinationsCard />
        <DestinationsCard />
        <DestinationsCard />
        <DestinationsCard />
        <DestinationsCard />
        <DestinationsCard />
        <DestinationsCard />
      </div>
    </div>
  );
};

export default DestinationsPage;
