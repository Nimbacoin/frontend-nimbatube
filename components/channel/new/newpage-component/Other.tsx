import Style from "../../../../styles/pages/channel/new/newpage-component/other.module.css";
import React, { useState } from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import {
  ActionGenaralChanging,
  ActionOther,
  ResetNewChannel,
} from "../../../../redux/channel-slice/ChannelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import InputText from "../../../modals/InputText";
import CancelButton from "../../../modals/CancelButton";
import BlueButton from "../../../modals/BlueButton";
const Other = () => {
  const dispatch = useDispatch();
  const [website, setwebsite] = useState("");
  const [email, setemail] = useState("");
  const other = useSelector((state: any) => state.ChannelSlice.other);

  const handelChangeWebsite = (e: any) => {
    dispatch(ActionOther({ id: "website", website: e.target.value }));
    setwebsite(e.target.value);
  };

  const handelChangeEmail = (e: any) => {
    dispatch(ActionOther({ id: "email", email: e.target.value }));
    setemail(e.target.value);
  };

  const HandelCancel = (e: any) => {
    setwebsite("");
    setemail("");
  };

  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <InputText
            HandelChange={handelChangeWebsite}
            Text={"website"}
            Value={other.website && other.website}
            Placeholder="enter your website address"
          />
        </div>
        <div className={Style.upload_input}>
          <InputText
            HandelChange={handelChangeEmail}
            Text={"email address"}
            Value={other.email && other.email}
            Placeholder="enter your email address"
          />
        </div>
        {/* <div className={Style.div_button_action}>
          <BlueButton HandelClick={HandelSubmiteNewGeneral} Text={"Submite"} />
          <CancelButton HandelClick={HandelCancel} Text={"Cancel"} />
        </div> */}
        {/* <div className={Style.upload_input}>
          <p className={Style.upload_file}> Delete this Channel</p>
          <div className={Style.div_button_action}>
            <button className={Style.button_action_delete}>
              Delete Channel
            </button>
          </div>
          <p className={Style.text}>
            Once you delete a Channel, there is no going back. Please be certain.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Other;
