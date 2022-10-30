import React from "react";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";

import Style from "../../../../styles/pages/channel/new/newpage-component/credit-details.module.css";
import Link from "next/link";
import InputText from "../../../modals/InputText";
import SmallTextBlack from "../../../modals/SmallTextBlack";
import BlueButton from "../../../modals/BlueButton";
import CancelButton from "../../../modals/CancelButton";
const CreditDetails = () => {
  const HandelChangeDeposit = () => {};
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <InputText
            Number={true}
            Icon={<FcCircuit />}
            HandelChange={HandelChangeDeposit}
            Text={"Deposit "}
            Placeholder="enter your channel title"
          />

          <SmallTextBlack
            Text={
              "Increasing your deposit can help your channel be discovered more easily."
            }
          />
          <SmallTextBlack Icon={<FcCircuit />} Text={"0.2581 available. ."} />
        </div>
        <div className={Style.div_button_action}>
          <BlueButton Text={"Submite"}/>
          <CancelButton Text={"Cancel"} />
        </div>
      </div>
    </div>
  );
};

export default CreditDetails;
