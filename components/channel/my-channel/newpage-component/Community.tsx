import React from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/community.module.css";
import TextArea from "../../../modals/TextArea";
import BlueButton from "../../../modals/BlueButton";
import OtherChannelData from "./OtherChannelData";
const Community = ({ Name, Id }: any) => {
  console.log(Name, Id);
  const handelChangeDesc = () => {};
  const handelSubmitComment = () => {};
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <TextArea
          HandelChange={handelChangeDesc}
          Text={"Comment as " + Name}
          Placeholder="Description"
        />
        <div className={Style.div_button_action}>
          <BlueButton HandelClick={handelSubmitComment} Text={"Submit"} />
        </div>
      </div>
      <div className={Style.right_side_container}>
        <OtherChannelData />
      </div>
    </div>
  );
};

export default Community;
