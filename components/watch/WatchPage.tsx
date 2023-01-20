import React from "react";
import LeftSide from "./watch-page/LeftSide";
import RightSide from "./watch-page/RightSide";
import Style from "../../styles/pages/watch/watch.module.css";
import { useDispatch } from "react-redux";
import { MainVideoDataReducer } from "../../redux/video-slice/VideoSlice";
const WatchPage = ({ VideoData }: any) => {
  const dispatch = useDispatch();
  dispatch(MainVideoDataReducer({ message: "data", data: VideoData }));
  return (
    <div className={Style.container}>
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default WatchPage;
