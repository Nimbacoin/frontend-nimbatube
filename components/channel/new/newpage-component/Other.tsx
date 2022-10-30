import Style from "../../../../styles/pages/channel/new/newpage-component/other.module.css";
import React, { useState } from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import {
  ActionGenaralChanging,
  ResetNewChannel,
} from "../../../../redux/channel-slice/ChannelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import InputText from "../../../modals/InputText";
import CancelButton from "../../../modals/CancelButton";
import BlueButton from "../../../modals/BlueButton";
const Other = () => {
  const [website, setwebsite] = useState("");
  const [email, setemail] = useState("");

  const HandelChange = (e: any) => {
    if (e.target.id === "input_website") {
      setwebsite(e.target.value);
    } else if (e.target.id === "input_email") {
      setemail(e.target.value);
    }
  };

  const HandelCancel = (e: any) => {
    setwebsite("");
    setemail("");
  };
  const HandelSubmiteNewGeneral = async (e: any) => {
    e.preventDefault();
    const Body: any = { website, email };
    basedPostUrlRequestLogedIn(
      "/api/post/channel/create-new-channel/other",
      Body
    ).then((res) => {
      if (res) {
        console.log(res);
      }
    });
  };
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <InputText
            HandelChange={HandelChange}
            Text={"website"}
            Placeholder="enter your website address"
          />
        </div>
        <div className={Style.upload_input}>
          <InputText
            HandelChange={HandelChange}
            Text={"email address"}
            Placeholder="enter your email address"
          />

          <input
            onChange={HandelChange}
            id="input_email"
            type="text"
            value={email}
            className={Style.input_title}
          />
        </div>
        <div className={Style.div_button_action}>
          <BlueButton HandelClick={HandelSubmiteNewGeneral} Text={"Submite"} />
          <CancelButton HandelClick={HandelCancel} Text={"Cancel"} />
        </div>
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
