import React, { useState } from "react";
import Style from "../../../../styles/pages/channel/new/newpage-component/profile-date.module.css";
import { IoCameraOutline } from "@react-icons/all-files/io5/IoCameraOutline";
import NewGeneral from "./NewGeneral";
import CreditDetails from "./CreditDetails";
import Tags from "./Tags";
import Other from "./Other";
import { useSelector, useDispatch } from "react-redux";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import { ImagesReducer } from "../../../../redux/channel-slice/ChannelSlice";
import { useRouter } from "next/router";
import AxiosPostLogedInFormData from "../../../../utils/AxiosPostLogedInFormData";
import NormalText from "../../../modals/NormalText";
const ProfileDate = () => {
  const coverRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const general = useSelector((state: any) => state.ChannelSlice.general);
  const previewSourceProfile = React.useRef<HTMLDivElement | null>(null);
  const [previewSourceCover, setPreviewSourceCover] = useState("");
  const { asPath } = useRouter();

  const UlLinks = [
    { name: "General", key: "general" },
    { name: "Credit Details", key: "credit-details" },
    { name: "Tags", key: "tags" },
    { name: "Other", key: "other" },
  ];
  const Bg = "/images/default-profile.png";

  const [LinkKey, setLinkKey] = useState("general");
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

  const Path = React.useRef(null);

  const readImageCover = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      Path.current = event.target.files[0];
      handelSubmitecoverRef();
    }
  };
  const handelSubmitecoverRef = async () => {
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
      "/api/post/channel/channel-cover-image/",
      formData
    ).then(({ data }) => {
      console.log(data);
      const { file }: any = data;
      if (coverRef.current) {
        coverRef.current.style.backgroundImage = `url(${
          process.env.NEXT_PUBLIC_BACK_END_URL +
          "/api/get/read/images/" +
          file.filename
        })`;
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

  return (
    <div className={Style.container}>
      <div className={Style.container_main}>
        <div
          ref={coverRef}
          // style={{
          //   backgroundImage: previewSourceCover && `url(${previewSourceCover})`,
          // }}
          className={Style.upload_inputs_container}
        >
          {previewSourceCover !== "" && (
            <div className={Style.hover_container}></div>
          )}

          <label htmlFor="cover" className={Style.input_label}>
            <input
              // onChange={handleFileInputChangeCover}
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
          <label htmlFor="profile" className={Style.image_name_conainer}>
            <div className={Style.profile_image_container}>
              <div className={Style.profile_image} ref={previewSourceProfile}>
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
          <span className={Style.name_contanier}>
            <span className={Style.name}>
              {general.name && general.name.slice(0, 40)}
              {general.name && general.name.length > 40 && "..."}
            </span>
            <span className={Style.title}>
              {general.title && general.title.slice(0, 40)}
              {general.title && general.title.length > 40 && "..."}
            </span>
          </span>

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
        Create a Page .
        <NormalText
          Text={
            "Your Page is where people go to learn more about you. Make sure yours has all the information they may need."
          }
        />
        {HandelLinkContent()}
      </div>
      {/* {HandelLinkContent()} */}
    </div>
  );
};

export default ProfileDate;
