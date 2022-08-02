import React from "react";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";

import Style from "../../../../styles/pages/chanel/new/newpage-component/credit-details.module.css";
import Link from "next/link";
const CreditDetails = () => {
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>
            <FcCircuit /> Deposit
          </p>
          <label htmlFor="input_title" className={Style.input_label}>
            <input
              id="input_title"
              type="number"
              className={Style.input_title}
            />
          </label>
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
