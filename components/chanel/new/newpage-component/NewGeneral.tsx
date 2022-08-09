import React, { useState } from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../../styles/pages/chanel/new/newpage-component/new-general.module.css";
import basedPostUrlRequest from "../../../../utils/basedPostUrlRequest";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import {
  ActionGeneral,
  ActionGenaralChanging,
} from "../../../../redux/chanel-slice/ChanelSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const NewGeneral = () => {
  const dispatch = useDispatch();
  const [title, settitle] = useState("");
  const [name, setname] = useState("");
  const Router = useRouter();
  const [description, setdescription] = useState("");

  const HandelChange = (e: any) => {
    if (e.target.id === "input_title") {
      settitle(e.target.value);
    } else if (e.target.id === "input_name") {
      dispatch(ActionGenaralChanging(e.target.value));
      setname(e.target.value);
    } else if (e.target.id === "text_desc") {
      setdescription(e.target.value);
    }
  };
  const HandelCancel = (e: any) => {
    settitle("");
    setname("");
    setdescription("");
  };
  const HandelSubmiteNewGeneral = async (e: any) => {
    e.preventDefault();
    const Body: any = { title, name, description };
    dispatch(ActionGeneral(Body));
    basedPostUrlRequestLogedIn(
      "/api/post/chanel/create-new-chanel/general",
      Body
    ).then((res) => {
      if (res) {
        dispatch(ActionGenaralChanging(""));
        Router.push("/chanels");
        Router;
        console.log(res);
      }
    });
  };
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Name</p>
          <label htmlFor="input_title" className={Style.input_label}>
            <input
              onChange={HandelChange}
              id="input_name"
              type="text"
              value={name}
              className={Style.input_title}
            />
          </label>
          <p className={Style.text}>This field cannot be changed.</p>
        </div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Tilte</p>
          <label htmlFor="input_title" className={Style.input_label}>
            <input
              id="input_title"
              onChange={HandelChange}
              type="text"
              value={title}
              className={Style.input_title}
            />
          </label>
        </div>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Description</p>
          <label htmlFor="text_desc" className={Style.label_description}>
            <textarea
              onChange={HandelChange}
              id="text_desc"
              value={description}
              className={Style.text_desc}
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
          <button className={Style.button_action_add} onClick={HandelCancel}>
            Cancel{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGeneral;
