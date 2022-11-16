import React from "react";
import Style from "../../../styles/modals/pages-boforload/laodin-animation.module.css";

const LoadingRoom = () => (
  <div className="overflow-hidden flex flex-col h-full  w-full">
    <div className={Style.animated_background}>d</div>
    {Array.from({ length: 14 }, (_, index) => (
      <div
        key={index}
        // className="w-full h-16 flex flex-row items-center justify-evenly relative cursor-pointer"
        id=""
      >
        <div>
          <div
          // className="relative left-0 w-10 h-10 bg-[#EFEFEF] flex items-center justify-center rounded-full cursor-pointer"
          >
            {/* <div className={Style.animated_background}>d</div> */}
          </div>
        </div>
        <div
        // className="w-[65%] flex flex-col items-start justify-between"
        >
          <div
          //  className="mt-1 mb-2 rounded-lg bg-[#EFEFEF] w-16 h-2"
          >
            <div className={Style.animated_background_bar}></div>{" "}
          </div>
          <div className="mt-1 mb-2 rounded-lg bg-[#EFEFEF] w-48 h-3">
            <div className={Style.animated_background_bar_big}></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default LoadingRoom;
