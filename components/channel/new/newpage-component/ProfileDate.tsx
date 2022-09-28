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
const ProfileDate = () => {
  const coverRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const general = useSelector((state: any) => state.ChannelSlice.general);
  const [previewSourceProfile, setPreviewSourceProfile] = useState("");
  const [previewSourceCover, setPreviewSourceCover] = useState("");
  const asPath = useRouter();
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const handleFileInputChangeCover = (e: any) => {
    const file = e.target.files[0];
    previewFileCover(file);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(
        ImagesReducer({
          id: "profileImage",
          profileImage: reader.result,
        })
      );
      console.log(reader.result);
      if (typeof reader !== "undefined" && reader.result !== "undefined") {
        setPreviewSourceProfile(`${reader?.result}`);
      }
    };
  };
  const previewFileCover = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(
        ImagesReducer({
          id: "coverImage",
          coverImage: reader.result,
        })
      );
      if (typeof reader !== "undefined" && reader.result !== "undefined") {
        setPreviewSourceCover(`${reader?.result}`);
      }
    };
  };

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
    const channelId = asPath.replace("/channel/new/", "");
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
          <div className={Style.image_name_conainer}>
            <div className={Style.profile_image_container}>
              <div
                className={Style.profile_image}
                style={{
                  backgroundImage: previewSourceProfile
                    ? `url(${previewSourceProfile})`
                    : `url(${Bg})`,
                }}
              >
                <label htmlFor="profile" className={Style.input_label}>
                  <input
                    onChange={handleFileInputChange}
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
          </div>
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
      {HandelLinkContent()}
    </div>
  );
};

export default ProfileDate;
