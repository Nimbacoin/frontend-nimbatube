import React from "react";
import Style from "../../styles/modals/pop-upp.module.css";
import { IoMailOpenOutline } from "@react-icons/all-files/io5/IoMailOpenOutline";
import { IoCloseCircleOutline } from "@react-icons/all-files/io5/IoCloseCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import { poPUppRedcuer } from "../../redux/style-slice/general-style/GenrealStyle";
export const PopUpp = ({
  TextDown,
  PlaceHolder,
  TextTop,
  HandelChange,
  DefaultValueInput,
}: any) => {
  const popUppData = useSelector((state: any) => state.GenrealStyle.popUppData);
  const dispatch = useDispatch();
  const handelClick = () => dispatch(poPUppRedcuer({ data: "" }));
  return (
    <div className={Style.container}>
      <div className={Style.container_second}>
        <p>{popUppData}</p>
        <button onClick={handelClick} className={Style.svg}>
          <IoCloseCircleOutline />
        </button>
      </div>
    </div>
  );
};
