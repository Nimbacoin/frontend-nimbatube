import React, { useRef } from "react";
import Style from "../../styles/modals/loaoding-all.module.css";
import LaodingCirculOne from "./LaodingCirculOne";

const LoaodingAll = () => {
  const CircleRef = useRef();
  return (
    <div className={Style.container}>
      <LaodingCirculOne />
    </div>
  );
};

export default LoaodingAll;
