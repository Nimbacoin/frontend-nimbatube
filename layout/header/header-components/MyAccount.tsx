import React from "react";
import { IoPersonCircleOutline } from "@react-icons/all-files/io5/IoPersonCircleOutline";
import Style from "../../../styles/layout/header/header-compnents/my-account.module.css";

const MyAccount = () => {
  return (
    <div className={Style.container_my_account}>
      <IoPersonCircleOutline />
    </div>
  );
};

export default MyAccount;
