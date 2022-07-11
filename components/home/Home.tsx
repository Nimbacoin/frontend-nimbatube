import React from "react";
import Style from "../../styles/pages/home/home.module.css";
import Vedio from "../vedio/Vedio";

const Home = () => {
  return (
    <div className={Style.container}>
      <div className={Style.vedio_container}>
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
        <Vedio />
      </div>
    </div>
  );
};

export default Home;
