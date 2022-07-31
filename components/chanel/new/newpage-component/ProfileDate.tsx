import React, { useState } from "react";
import Style from "../../../../styles/pages/chanel/new/newpage-component/profile-date.module.css";
import { IoCameraOutline } from "@react-icons/all-files/io5/IoCameraOutline";
import NewGeneral from "./NewGeneral";
import CreditDetails from "./CreditDetails";
const ProfileDate = () => {
  const UlLinks = [
    { name: "General", key: "general" },
    { name: "Credit Details", key: "credit-details" },
    { name: "Tags", key: "Tags" },
    { name: "Other", key: "other" },
  ];
  const Bg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";
  const [LinkKey, setLinkKey] = useState("general");
  const HandelClick = (key: string) => {
    setLinkKey(key);
  };
  return (
    <div className={Style.container}>
      <div className={Style.container_main}>
        <div className={Style.upload_inputs_container}>
          <label htmlFor="input_upload" className={Style.input_label}>
            <input
              id="input_upload"
              type="file"
              className={Style.input_upload}
            />
            <span className={Style.camera_of_button}>
              <IoCameraOutline />
            </span>
          </label>
        </div>
        <div className={Style.links_container}>
          <div
            className={Style.profile_image}
            style={{ backgroundImage: `url(${Bg})` }}
          >
            <label htmlFor="input_upload" className={Style.input_label}>
              <input
                id="input_upload"
                type="file"
                className={Style.input_upload}
              />
              <span className={Style.camera_of_button_profile}>
                <IoCameraOutline />
              </span>
            </label>
          </div>
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

      <NewGeneral />
      <CreditDetails />
    </div>
  );
};

export default ProfileDate;
