import React, { useEffect, useState } from "react";

import "cropperjs/dist/cropper.css";
import Style from "../../styles/modals/cropper-com.module.css";
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
  FinishCroppingRedcuer,
} from "../../redux/style-slice/general-style/GenrealStyle";
import { saveAs } from "file-saver";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const CropperCom: React.FC = () => {
  const [image, setImage] = useState<string>();
  const dispatch = useDispatch();
  const onChangee = (cropper: CropperRef) => {
    setImage(cropper.getCanvas()?.toDataURL());
  };
  const croppingImg = useSelector(
    (state: any) => state.GenrealStyle.croppingImg
  );

  const handelClose = () => {
    dispatch(croppingRedcuer(undefined));
  };
  const handelFinshCropping = () => {
    if (image?.length) {
      dispatch(FinishCroppingRedcuer(image));
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.main_container_main}>
        <div className={Style.div_main_container_top}>
          <BlueButton HandelClick={handelFinshCropping} Text="crop" />
          <IconHeader
            FuncOutSide={true}
            MainFuncOutSide={handelClose}
            Icon={<IoCloseOutline />}
            TextValue={"Close"}
          />
        </div>
        <div className={Style.main_container_overfollow}>
          <div className={Style.container_img}>
            <FixedCropper
              src={croppingImg}
              onChange={onChangee}
              stencilSize={{
                width: 500,
                height: 250,
              }}
              stencilProps={{
                handlers: false,
                lines: true,
                movable: false,
                resizable: false,
              }}
              imageRestriction={ImageRestriction.stencil}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropperCom;
