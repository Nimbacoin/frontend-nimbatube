import React from "react";
import Style from "../../../../styles/pages/tour/tour-components/tour-details/overview-highlites-places.module.css";
// const DestinationsSamllCard



const OverviewHighlitesPlaces = () => {
  const Bg =
    "https://morokotour.vercel.app/images/ait-ben-haddou-images/ourzazate-aitbenhadou3.jpg";
  return (
    <div className={Style.container}>
      <b className={Style.detail_title}>Places You’ll See</b>
      <div className={Style.places}>
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
      </div>
      <b className={Style.detail_title}>Overview</b>
    </div>
  );
};

export default OverviewHighlitesPlaces;
