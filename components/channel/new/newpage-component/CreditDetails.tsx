import React from "react";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";

import Style from "../../../../styles/pages/channel/new/newpage-component/credit-details.module.css";
import Link from "next/link";
import InputText from "../../../modals/InputText";
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
          
          <p className={Style.text}>
            Increasing your deposit can help your channel be discovered more
            easily. <FcCircuit />
            0.2581 available. .
          </p>
        </div>
        <div className={Style.div_button_action}>
          <button className={Style.button_action}>Submit</button>
          <button className={Style.button_action_add}>Cancel </button>
        </div>
      </div>
    </div>
  );
};

export default CreditDetails;
