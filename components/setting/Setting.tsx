import React from "react";
import Style from "../../styles/pages/setting/setting.module.css";
import BoldText from "../modals/BoldText";
import DivItem from "./DivItem";
const Settings = () => {
  const Items = [{ name: "Account", value: "account" }];
  return (
    <div className={Style.container}>
      {/* <div className={Style.side_bar}>
        <BoldText text={"Settings"} />
        {Items.map((item) => (
          <DivItem Item={item} />
        ))}
      </div> */}
      <div className={Style.side_bar_setting}></div>
    </div>
  );
};

export default Settings;
