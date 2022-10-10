import React from "react";
import { useDispatch } from "react-redux";
import {
  leaveTextReducer,
  overTextReducer,
} from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/icon-header.module.css";
import { useRouter } from "next/router";

const IconHeader = ({ TextValue, Icon, Url, NumberData, Number }: any) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const buttonRef = React.useRef<HTMLDivElement | null>(null);
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
    <div
      onClick={handelClick}
      onMouseOut={handelLeave}
      onMouseOver={handelOver}
      ref={buttonRef}
      className={Style.container}
    >
      {Number && <span className={Style.number}>{NumberData}</span>}

      {Icon}
    </div>
  );
};

export default IconHeader;
