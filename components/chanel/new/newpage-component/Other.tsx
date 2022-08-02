import React from "react";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";

import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline";

import Style from "../../../../styles/pages/chanel/new/newpage-component/other.module.css";
import Link from "next/link";

const Tags = () => {
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Website</p>
          <label htmlFor="input_title" className={Style.input_label}>
            <input id="input_title" type="text" className={Style.input_title} />
          </label>
        </div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}> Email</p>
          <label htmlFor="input_title" className={Style.input_label}>
            <input id="input_title" type="text" className={Style.input_title} />
          </label>
        </div>
        <div className={Style.div_button_action}>
          <button className={Style.button_action}>Submit</button>
          <button className={Style.button_action_add}>Cancel </button>
        </div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}> Delete this Chanel</p>
          <div className={Style.div_button_action}>
            <button className={Style.button_action_delete}>
              Delete Chanel
            </button>
          </div>
          <p className={Style.text}>
            Once you delete a Chanel, there is no going back. Please be certain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tags;
