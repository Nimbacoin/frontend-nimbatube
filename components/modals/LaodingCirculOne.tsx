import React, { useRef } from "react";
import Style from "../../styles/modals/loaoding-all.module.css";

const LaodingCirculOne = () => {
  const CircleRef = useRef();
  return (
    <div className={Style.main_circl_container}>
      <svg
        className={Style.container_svg}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="60px"
        height="60px"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#673ab7" />
          </linearGradient>
        </defs>
        <circle
          className={Style.circle_circle_static}
          cx="30"
          cy="30"
          r="20"
          strokeLinecap="round"
        />
        <circle
          className={Style.circle_circle}
          cx="30"
          cy="30"
          r="20"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default LaodingCirculOne;
