import React from "react";
import { useDispatch } from "react-redux";
import {
  leaveTextReducer,
  overTextReducer,
} from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/icon-header.module.css";
import { useRouter } from "next/router";

const IconHeader = ({ TextValue, Icon, Url }: any) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const handelOver = () => {
    if (buttonRef.current) {
      const data = buttonRef.current.getBoundingClientRect();

      const top = data.top + data.height;
      const left = data.left;

      dispatch(overTextReducer({ top: top, left: left, text: TextValue }));
    }
  };
  const handelLeave = () => {
    dispatch(leaveTextReducer());
  };
  const handelClick = () => {
    dispatch(leaveTextReducer());
    Url && Router.push(Url);
  };
  return (
    <button
      onClick={handelClick}
      onMouseOut={handelLeave}
      onMouseOver={handelOver}
      ref={buttonRef}
      className={Style.container}
    >
      {Icon}
    </button>
  );
};

export default IconHeader;
