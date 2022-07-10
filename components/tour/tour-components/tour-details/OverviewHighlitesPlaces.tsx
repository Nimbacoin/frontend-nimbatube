import React from "react";
import Style from "../../../../styles/pages/tour/tour-components/tour-details/overview-highlites-places.module.css";
import DestinationsSamllCard from "../../../destinations/destinations-components/DestinationsSamllCard";

const OverviewHighlitesPlaces = () => {
  const Overview =
    "Discover the Berber villages of the Atlas Mountains on a full-day trip from Marrakech that explores broad valleys and lush orchards with views of Mount Toubkal, the highest peak in North Africa. Ride a camel through a broad gorge, pause for tea in Imlil Valley, then hike to the isolated village of Ait Souka to share a meal in a Berber family’s home. Throughout the day, take in the mountains’ beautiful scenery: terraced gardens that climb steep hillsides, tumbling waterfalls, and an alpine kasbah.";
  return (
    <div className={Style.container}>
      <b className={Style.detail_title}>Places You’ll See</b>
      <div className={Style.places}>
        <DestinationsSamllCard />
        <DestinationsSamllCard />
        <DestinationsSamllCard />
        <DestinationsSamllCard />
        <DestinationsSamllCard />
      </div>
      <b className={Style.detail_title}>Overview</b>
      {Overview}
    </div>
  );
};

export default OverviewHighlitesPlaces;
