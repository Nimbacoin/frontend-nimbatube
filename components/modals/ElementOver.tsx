import React, { useEffect, useState } from "react";

import "cropperjs/dist/cropper.css";
import Style from "../../styles/modals/element-over.module.css";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { useDispatch, useSelector } from "react-redux";

import {
  CropperRef,
  Cropper,
  FixedCropper,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import BlueButton from "./BlueButton";
import IconHeader from "./IconHeader";
import {
  croppingRedcuer,
  elementOverLaytRedcuer,
  FinishCroppingRedcuer,
} from "../../redux/style-slice/general-style/GenrealStyle";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const ElementOver: React.FC = () => {
  const [image, setImage] = useState<string>();
  const dispatch = useDispatch();
  const onChangee = (cropper: CropperRef) => {
    setImage(cropper.getCanvas()?.toDataURL());
  };
  const croppingImg = useSelector(
    (state: any) => state.GenrealStyle.croppingImg
  );

  const handelClose = () => {
    dispatch(elementOverLaytRedcuer());
  };
  const handelFinshCropping = () => {
    if (image?.length) {
      dispatch(FinishCroppingRedcuer(image));
    }
  };
  const elementOverContent = useSelector(
    (state: any) => state.GenrealStyle.elementOverContent
  );
  const elementOverLayt = useSelector(
    (state: any) => state.GenrealStyle.elementOverLayt
  );
  //   dispatch(elementOverLaytRedcuer(4));
  return (
    <div className={Style.container}>
      <div className={Style.main_container_main}>
        {elementOverLayt && elementOverContent[0]}
      </div>
    </div>
  );
};

export default ElementOver;
