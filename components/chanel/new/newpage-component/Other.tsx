import Style from "../../../../styles/pages/chanel/new/newpage-component/other.module.css";
import React, { useState } from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import {
  ActionGenaralChanging,
  ResetNewChanel,
} from "../../../../redux/chanel-slice/ChanelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
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
      "/api/post/chanel/create-new-chanel/other",
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
          <p className={Style.upload_file}>Website</p>
          <label htmlFor="input_website" className={Style.input_label}>
            <input
              onChange={HandelChange}
              id="input_website"
              type="text"
              value={website}
              className={Style.input_title}
            />
          </label>
        </div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}> Email</p>
          <label htmlFor="input_email" className={Style.input_label}>
            <input
              onChange={HandelChange}
              id="input_email"
              type="text"
              value={email}
              className={Style.input_title}
            />
          </label>
        </div>
        <div className={Style.div_button_action}>
          <button
            onClick={HandelSubmiteNewGeneral}
            className={Style.button_action}
          >
            Submit
          </button>
          <button onClick={HandelCancel} className={Style.button_action_add}>
            Cancel{" "}
          </button>
        </div>
        {/* <div className={Style.upload_input}>
          <p className={Style.upload_file}> Delete this Chanel</p>
          <div className={Style.div_button_action}>
            <button className={Style.button_action_delete}>
              Delete Chanel
            </button>
          </div>
          <p className={Style.text}>
            Once you delete a Chanel, there is no going back. Please be certain.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Other;
