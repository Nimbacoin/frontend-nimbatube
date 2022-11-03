import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { poPUppRedcuer } from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/share-video.module.css";

const ButtonAndInputAction = ({ CopyValue }: any) => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(CopyValue);
    dispatch(poPUppRedcuer({ data: "video  link is copied" }));
    setTimeout(() => {
      dispatch(poPUppRedcuer({ data: "" }));
    }, 5000);
  };
  return (
    <div className={Style.link_container}>
      <input value={CopyValue} className={Style.main_link_container} />

      <button onClick={copyToClipboard} className={Style.button_copy}>
        Copy
      </button>
    </div>
  );
};

export default ButtonAndInputAction;
