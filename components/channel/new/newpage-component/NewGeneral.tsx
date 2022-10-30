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
import { poPUppRedcuer } from "../../../../redux/style-slice/general-style/GenrealStyle";
import InputText from "../../../modals/InputText";
import TextArea from "../../../modals/TextArea";
import CancelButton from "../../../modals/CancelButton";
import BlueButton from "../../../modals/BlueButton";

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
  const HandelChangeName = (e: any) => {
    dispatch(
      ActionGenaralChanging({ id: "input_name", input_name: e.target.value })
    );
  };
  const HandelChangeTilte = (e: any) => {
    settitle(e.target.value);
    dispatch(
      ActionGenaralChanging({
        id: "input_title",
        input_title: e.target.value,
      })
    );
  };
  const handelChangeDesc = (e: any) => {
    dispatch(
      ActionGenaralChanging({ id: "text_desc", text_desc: e.target.value })
    );
    setdescription(e.target.value);
  };
  const HandelCancel = () => {
    settitle("");
    setname("");
    setdescription("");
    dispatch(ResetNewChannel());
  };
  const HandelSubmiteNewGeneral = async (e: any) => {
    const channelId = asPath.replace("/channel/create-new-channel/", "");
    const isValid = channelId.toString();
    console.log(channelId);
    const ReqData: any = { general, images, channelId: isValid };
    await basedPostUrlRequestLogedIn(
      "/api/post/channel/create-new-channel",
      ReqData
    ).then((res) => {
      if (res) {
        dispatch(poPUppRedcuer({ data: "new channel created" }));
        setTimeout(() => {
          dispatch(poPUppRedcuer({ data: "" }));
        }, 5000);
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
          <InputText
            HandelChange={HandelChangeName}
            Text={"Name"}
            Placeholder="enter your channel name"
          />
          <p className={Style.text}>This field cannot be changed.</p>
        </div>
        <InputText
          HandelChange={HandelChangeTilte}
          Text={"Title"}
          Placeholder="enter your channel title"
        />
        <TextArea
          HandelChange={handelChangeDesc}
          Text={"Description"}
          Placeholder="Description"
        />
        <div className={Style.div_button_action}>
          <BlueButton HandelClick={HandelSubmiteNewGeneral} Text={"Submit"} />
          <CancelButton HandelClick={HandelCancel} Text={"Cancel"} />
        </div>
      </div>
    </div>
  );
};

export default NewGeneral;
