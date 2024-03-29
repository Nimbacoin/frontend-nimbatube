import React from "react";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";

import { IoAddOutline } from "@react-icons/all-files/io5/IoAddOutline";

import Style from "../../../../styles/pages/channel/new/newpage-component/tags.module.css";
import Link from "next/link";
import InputText from "../../../modals/InputText";

const Tags = () => {
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Selected Tags</p>
          <div className={Style.tags_container}>
            <div className={Style.tag}>
              Videos <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Crypto <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoCloseOutline />
            </div>
          </div>
        </div>
        <div className={Style.upload_input}>
          <InputText
            // HandelChange={HandelChangeTilte}
            Text={"Add Tags"}
            Placeholder="enter your Tags"
          />
        </div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Known Tags</p>
          <div className={Style.tags_container}>
            <div className={Style.tag}>
              Videos <IoAddOutline />
            </div>
            <div className={Style.tag}>
              Crypto <IoAddOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoAddOutline />
            </div>
            <div className={Style.tag}>
              Selected <IoAddOutline />
            </div>
          </div>
        </div>
        {/* <div className={Style.div_button_action}>
          <button className={Style.button_action}>Submit</button>
          <button className={Style.button_action_add}>Cancel </button>
        </div> */}
      </div>
    </div>
  );
};

export default Tags;
