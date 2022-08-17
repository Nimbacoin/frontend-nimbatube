import React from "react";
import Chanel from "./components/ChannelCard";
import Style from "../../styles/pages/following/following.module.css";
const FollowingPage = () => {
  
  return (
    <div className={Style.container}>
      <Chanel IsChanelPage={true} />
      <Chanel />
      <Chanel />
      <Chanel />
      <Chanel />
      <Chanel />
      <Chanel />
      <Chanel />
      <Chanel />
    </div>
  );
};

export default FollowingPage;
