import React, { useState } from "react";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Style from "../../../../styles/pages/channel/new/newpage-component/new-general.module.css";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import {
  ActionGenaralChanging,
  ResetNewChannel,
} from "../../../../redux/channel-slice/ChannelSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AxiosPostLogedInFormData from "../../../../utils/AxiosPostLogedInFormData";

const NewGeneral = () => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const [title, settitle] = useState("");
  const [name, setname] = useState("");
  const Router = useRouter();
  const [description, setdescription] = useState("");
  const general = useSelector((state: any) => state.ChannelSlice.general);
  const images = useSelector((state: any) => state.ChannelSlice.images);

  const ChannelCreated = useSelector(
    (state: any) => state.ChannelSlice.ChannelCreated
  );
  const HandelChange = (e: any) => {
    if (e.target.id === "input_title") {
      settitle(e.target.value);
      dispatch(
        ActionGenaralChanging({
          id: "input_title",
          input_title: e.target.value,
        })
      );
    } else if (e.target.id === "input_name") {
      dispatch(
        ActionGenaralChanging({ id: "input_name", input_name: e.target.value })
      );
      setname(e.target.value);
    } else if (e.target.id === "text_desc") {
      dispatch(
        ActionGenaralChanging({ id: "text_desc", text_desc: e.target.value })
      );
      setdescription(e.target.value);
    }
  };
  const HandelCancel = () => {
    settitle("");
    setname("");
    setdescription("");
    dispatch(ResetNewChannel());
  };
  const HandelSubmiteNewGeneral = async (e: any) => {
    const channelId = asPath.replace("/channel/new/", "");
    const ReqData: any = { general, images, channelId };
    await basedPostUrlRequestLogedIn(
      "/api/post/channel/create-new-channel",
      ReqData
    ).then((res) => {
      if (res) {
        dispatch(ActionGenaralChanging(""));
        dispatch(ResetNewChannel());
        HandelCancel();
        Router.push("/channels");
      }
    });
  };
  
  return (
    <div className={Style.container}>
      <div className={Style.upload_inputs_container}>
        <div className={Style.upload_input}>
          <p className={Style.upload_file}>Name</p>
          <label htmlFor="input_name" className={Style.input_label}>
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
            style={{ backgroundColor: ChannelCreated ? "" : "#cccccc" }}
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
