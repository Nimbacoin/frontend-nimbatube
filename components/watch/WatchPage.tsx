import React from "react";
import LeftSide from "./watch-page/LeftSide";
import RightSide from "./watch-page/RightSide";
import Style from "../../styles/pages/watch/watch.module.css";
const WatchPage = () => {
  return (
    <div className={Style.container}>
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default WatchPage;
