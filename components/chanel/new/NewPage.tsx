import React from "react";
import ProfileDate from "./newpage-component/ProfileDate";
import Style from "../../../styles/pages/chanel/new/new-page.module.css";
const NewPage = () => {
  return (
    <div className={Style.container}>
      <ProfileDate />
    </div>
  );
};

export default NewPage;
