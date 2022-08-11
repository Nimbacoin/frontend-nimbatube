import React, { useState } from "react";
import Style from "../../../../styles/pages/chanel/new/newpage-component/profile-date.module.css";
import { IoCameraOutline } from "@react-icons/all-files/io5/IoCameraOutline";
import NewGeneral from "./NewGeneral";
import CreditDetails from "./CreditDetails";
import Tags from "./Tags";
import Other from "./Other";
import { useSelector, useDispatch } from "react-redux";
import basedPostUrlRequestLogedIn from "../../../../utils/basedPostUrlRequestLogedIn";
import { ImagesReducer } from "../../../../redux/chanel-slice/ChanelSlice";
const ProfileDate = () => {
  const dispatch = useDispatch();
  const [previewSourceProfile, setPreviewSourceProfile] = useState("");
  const [selectedFileProfile, setSelectedFileProfile] = useState();

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFileProfile(file);
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

  const handleSubmitFile = (e: any) => {
    e.preventDefault();
    if (!selectedFileProfile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFileProfile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadImage = async (file: any) => {
    const Body: any = { data: file };
    basedPostUrlRequestLogedIn("/api/post/chanel/upload-profile", Body).then(
      (res) => {
        if (res) {
          console.log(res);
        }
      }
    );
  };

  const general = useSelector((state: any) => state.ChanelSlice.general);

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

  return (
    <div className={Style.container}>
      <div className={Style.container_main}>
        <div className={Style.upload_inputs_container}>
          <label htmlFor="input_upload11111" className={Style.input_label}>
            <input
              onChange={handleFileInputChange}
              id="input_upload11111"
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
                <label htmlFor="input_upload" className={Style.input_label}>
                  <input
                    onChange={handleFileInputChange}
                    id="input_upload"
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
            <span className={Style.name}>{general.name && general.name} </span>
          </div>
        </div>
        <div className={Style.links_container}>
          <ul className={Style.chanel_links}>
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
      <button onClick={handleSubmitFile}> Add Image </button>
      {HandelLinkContent()}
    </div>
  );
};

export default ProfileDate;
