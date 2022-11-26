import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import {
  copyLinkRedcuer,
  poPUppRedcuer,
} from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/share-video.module.css";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import OverAll from "./OverAll";
const ShareVideo = () => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_ClIENT_URL + asPath);
    dispatch(poPUppRedcuer({ data: "video  link is copied" }));
    setTimeout(() => {
      dispatch(poPUppRedcuer({ data: "" }));
    }, 5000);
  };
  const handelClickClose = () => {
    dispatch(copyLinkRedcuer({ value: "false" }));
  };

  return (
    <div className={Style.container}>
      <OverAll>
      <div className={Style.main_first_container}>
        <div className={Style.main_container}>
          <div className={Style.share_container}>
            <div className={Style.text_container}>
              <p className={Style.text}> Share </p>
              <button onClick={handelClickClose} className={Style.svg}>
                <IoCloseOutline />
              </button>
            </div>
            <div className={Style.link_container}>
              <input
                value={process.env.NEXT_PUBLIC_ClIENT_URL + asPath}
                className={Style.main_link_container}
              />

              <button onClick={copyToClipboard} className={Style.button_copy}>
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
      </OverAll>
      
    </div>
  );
};

export default ShareVideo;
