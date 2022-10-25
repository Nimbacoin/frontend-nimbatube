import React, { useState, useEffect } from "react";
import Style from "../../styles/layout/header/header-compnents/side-header.module.css";
import HeaderCaseI from "./HeaderCaseI";
import HeaderCaseII from "./OverAllSideMenu";

const SideHeader = () => {
  return (
    <>
      <HeaderCaseI />
      <HeaderCaseII />
    </>
  );
};

export default SideHeader;
