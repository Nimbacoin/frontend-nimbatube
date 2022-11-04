import React, { useEffect, useState } from "react";

import "cropperjs/dist/cropper.css";
import Style from "../../styles/modals/cropper-com.module.css";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { useDispatch } from "react-redux";

import {
  CropperRef,
  Cropper,
  FixedCropper,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import BlueButton from "./BlueButton";
import IconHeader from "./IconHeader";
import { croppingRedcuer } from "../../redux/style-slice/general-style/GenrealStyle";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const CropperCom: React.FC = () => {
  const [image, setImage] = useState<string>();
  const dispatch = useDispatch();
  const onChangee = (cropper: CropperRef) => {
    setImage(cropper.getCanvas()?.toDataURL());
  };

  const handelClose = () => {
    alert("dlkf");
    dispatch(croppingRedcuer());
  };
  return (
    <div className={Style.container}>
      <div className={Style.main_container_main}>
        <div className={Style.div_main_container_top}>
          <BlueButton Text="crop" />
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
              src={
                "https://images.pexels.com/photos/5006465/pexels-photo-5006465.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              }
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
