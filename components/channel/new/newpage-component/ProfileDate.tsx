import React, { useEffect, useState } from "react";
import Style from "../../../../styles/pages/channel/new/newpage-component/profile-date.module.css";
import { IoCameraOutline } from "@react-icons/all-files/io5/IoCameraOutline";
import { IoCropOutline } from "@react-icons/all-files/io5/IoCropOutline";
import NewGeneral from "./NewGeneral";

import CreditDetails from "./CreditDetails";
import Tags from "./Tags";
import Other from "./Other";
import { useSelector, useDispatch } from "react-redux";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import {
  ActionGenaralChanging,
  ImagesReducer,
  ResetNewChannel,
} from "../../../../redux/channel-slice/ChannelSlice";
import { useRouter } from "next/router";
import AxiosPostLogedInFormData from "../../../../utils/AxiosPostLogedInFormData";
import NormalText from "../../../modals/NormalText";
import BoldText from "../../../modals/BoldText";
import TextTilteInputMudum from "../../../modals/text/TextTilteInputMudum";
import CropperCom from "../../../modals/Cropper";
import {
  croppingRedcuer,
  poPUppRedcuer,
} from "../../../../redux/style-slice/general-style/GenrealStyle";
import IconHeader from "../../../modals/IconHeader";
import BlueButton from "../../../modals/BlueButton";
import CancelButton from "../../../modals/CancelButton";
import { seoReducer } from "../../../../redux/seo-slice/seoSlice";
const ProfileDate = () => {
  const coverRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const images = useSelector((state: any) => state.ChannelSlice.images);

  const previewSourceProfile = React.useRef<HTMLDivElement | null>(null);
  const [previewSourceCover, setPreviewSourceCover] = useState("");
  const { asPath } = useRouter();
  const general = useSelector((state: any) => state.ChannelSlice.general);
  const other = useSelector((state: any) => state.ChannelSlice.other);
  const [LinkKey, setLinkKey] = useState("general");
  const [linkName, setLinkName] = useState("General");
  const Router = useRouter();
  const UlLinks = [
    { name: "General", key: "general" },
    { name: "Credit Details", key: "credit-details" },
    { name: "Tags", key: "tags" },
    { name: "Other", key: "other" },
  ];
  dispatch(seoReducer({ title: "create new channnel" + linkName }));

  const Bg = "/images/default-profile.png";

  const HandelClick = (key: string) => {
    setLinkKey(key);
  };
  const HandelLinkContent = () => {
    if (LinkKey === "general") {
      return <NewGeneral />;
    } else if (LinkKey === "credit-details") {
      return <CreditDetails />;
    } else if (LinkKey === "tags") {
      return <Tags />;
    } else if (LinkKey === "other") {
      return <Other />;
    }
  };
  useEffect(() => {
    const HandelLinkContentName = () => {
      if (LinkKey === "general") {
        setLinkName("General");
      } else if (LinkKey === "credit-details") {
        setLinkName("Credit Details");
      } else if (LinkKey === "tags") {
        setLinkName("tags");
      } else if (LinkKey === "other") {
        setLinkName("other");
      }
    };
    HandelLinkContentName();
  }, [LinkKey]);
  const handelCropp = () => {
    if (Path.current) {
      const coverImgData = URL.createObjectURL(Path.current);
      dispatch(croppingRedcuer(coverImgData));
    }
  };

  const Path = React.useRef(null);

  const readImageCover = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      Path.current = event.target.files[0];
      if (coverRef.current) {
        // coverRef.current.style.backgroundImage = `url(${
        // )})`;
        handelSubmitecoverRef(Path.current);
        //
      }

      //
    }
  };
  const handelSubmitecoverRef = async (imageData: any) => {
    const channelId = asPath.replace("/channel/create-new-channel/", "");
    const isValid = channelId.toString();
    console.log("image is here ");
    let formData = new FormData();
    if (imageData) {
      if (isValid) {
        formData.append("channelId", isValid);
      }
      formData.append("thumbnail", imageData);
    }
    await AxiosPostLogedInFormData(
      "/api/post/channel/channel-cover-image/",
      formData
    ).then(({ data }) => {
      console.log("recieved", data);
      const { file }: any = data;
      if (coverRef.current) {
        coverRef.current.style.backgroundImage = `url(${
          process.env.NEXT_PUBLIC_BACK_END_URL +
          "/api/get/read/images/" +
          file.filename
        })`;
        console.log(
          "image set",
          process.env.NEXT_PUBLIC_BACK_END_URL +
            "/api/get/read/images/" +
            file.filename
        );
      }
    });
  };

  //------------------------------------
  const readImageProfile = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      Path.current = event.target.files[0];
      handelSubmiteProfileRef();
    }
  };
  const handelSubmiteProfileRef = async () => {
    const channelId = asPath.replace("/channel/create-new-channel/", "");
    const isValid = channelId.toString();
    console.log(channelId);
    let formData = new FormData();
    if (Path.current) {
      if (isValid) {
        formData.append("channelId", isValid);
      }
      formData.append("thumbnail", Path.current);
    }
    await AxiosPostLogedInFormData(
      "/api/post/channel/channel-profile-image/",
      formData
    ).then(({ data }) => {
      console.log(data);
      const { file }: any = data;
      if (previewSourceProfile.current) {
        previewSourceProfile.current.style.backgroundImage = `url(${
          process.env.NEXT_PUBLIC_BACK_END_URL +
          "/api/get/read/images/" +
          file.filename
        })`;
      }
    });
  };

  //
  const croppedImg = useSelector((state: any) => state.GenrealStyle.croppedImg);
  useEffect(() => {
    if (croppedImg.length && coverRef.current) {
      const urltoFile = async (url: any, filename: any, mimeType: any) => {
        mimeType = mimeType || (url.match(/^data:([^;]+);/) || "")[1];
        return fetch(url)
          .then(function (res) {
            return res.arrayBuffer();
          })
          .then(function (buf) {
            return new File([buf], filename, { type: mimeType });
          });
      };

      //Usage example:
      urltoFile(croppedImg, "imgageee", "image/png").then(function (file: any) {
        handelSubmitecoverRef(file);
        // console.log("main-file", file);
      });
      // coverRef.current.style.backgroundImage = `url(${croppedImg})`;
    }
  }, [croppedImg]);
  const HandelCancel = () => {
    // settitle("");
    // setname("");
    // setdescription("");
    dispatch(ResetNewChannel());
  };

  const HandelSubmiteNewGeneral = async (e: any) => {
    const channelId = asPath.replace("/channel/create-new-channel/", "");
    const isValid = channelId.toString();
    const ReqData: any = { general, images, other, channelId: isValid };
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
        // HandelCancel();
        // Router.push("/channels");
      }
    });
  };

  return (
    <div className={Style.container}>
      <div className={Style.container_main}>
        <div ref={coverRef} className={Style.upload_inputs_container}>
          {previewSourceCover !== "" && (
            <div className={Style.hover_container}></div>
          )}
          <div className={Style.container_icons}>
            <IconHeader
              FuncOutSide={true}
              MainFuncOutSide={handelCropp}
              Icon={<IoCropOutline />}
              TextValue={"cropp"}
            />
            <label htmlFor="cover" className={Style.input_label}>
              <input
                onChange={readImageCover}
                id="cover"
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                className={Style.input_upload}
              />
              <span className={Style.camera_of_button}>
                <IoCameraOutline />
              </span>
            </label>
          </div>

          <label htmlFor="profile" className={Style.image_name_conainer}>
            <div className={Style.profile_image_container}>
              <div
                className={Style.profile_image}
                style={{
                  backgroundImage: `url(${"/images/default-profile.png"})`,
                }}
                ref={previewSourceProfile}
              >
                <label htmlFor="profile" className={Style.input_label}>
                  <input
                    onChange={readImageProfile}
                    id="profile"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    className={Style.input_upload}
                  />
                  <span className={Style.camera_of_button_profile}>
                    <IoCameraOutline />
                  </span>
                </label>
              </div>
            </div>
          </label>
        </div>
        <div className={Style.links_container}>
          <p className={Style.name_contanier}>
            <span className={Style.name}>
              {general.name && general.name.slice(0, 30)}
              {general.name && general.name.length > 30 && "..."}
            </span>
            <span className={Style.title}>
              {general.title && general.title.slice(0, 40)}
              {general.title && general.title.length > 40 && "..."}
            </span>
          </p>

          <ul className={Style.channel_links}>
            {UlLinks.map(({ name, key }) => (
              <li
                key={key}
                className={LinkKey === key ? Style.link_active : Style.link}
                onClick={() => {
                  HandelClick(key);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={Style.second_div_channel_info}>
        <div className={Style.container_top}>
          <TextTilteInputMudum Text={"Create a Channel    > " + linkName} />
          <NormalText
            Text={
              "Your Channel is where people go to learn more about you. Make sure yours has all the information they may need."
            }
          />
        </div>
        {HandelLinkContent()}
        <div className={Style.div_button_action}>
          <CancelButton HandelClick={HandelCancel} Text={"Cancel"} />
          <BlueButton HandelClick={HandelSubmiteNewGeneral} Text={"Submit"} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDate;
