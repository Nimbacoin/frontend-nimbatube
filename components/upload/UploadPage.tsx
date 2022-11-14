import React, { useEffect } from "react";
import NameVideoUrl from "./upload-components/NameVideoUrl";
import Style from "../../styles/pages/upload/upload.module.css";
import Thumbnail from "./upload-components/Thumbnail";
import { useDispatch } from "react-redux";
import {
  elementOverLaytRedcuer,
  elementOverLaytRedcuerHide,
} from "../../redux/style-slice/general-style/GenrealStyle";
import IconHeader from "../modals/IconHeader";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { useRouter } from "next/router";

const UploadPage = () => {
  const Router = useRouter();
  // const dispatch = useDispatch();
  // useEffect(() => {}, []);
  // const handelClose = () => {
  //   dispatch(elementOverLaytRedcuerHide());
  //   Router.push("/");
  // };
  // dispatch(
  //   elementOverLaytRedcuer(
  //     <div className={Style.main_container}>
  //       {/* <div className={Style.div_main_container_top}>
  //         <IconHeader
  //           FuncOutSide={true}
  //           MainFuncOutSide={handelClose}
  //           Icon={<IoCloseOutline />}
  //           TextValue={"Close"}
  //         />
  //       </div> */}
  //       <div className={Style.second_container}>
  //         <NameVideoUrl />
  //         <Thumbnail />
  //       </div>
  //     </div>
  //   )
  // );
  return (
    <div className={Style.container}>
      <NameVideoUrl />
      <Thumbnail />
    </div>
  );
};

export default UploadPage;
