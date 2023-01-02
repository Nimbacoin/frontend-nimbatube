import React, { useState, useRef } from "react";
import Style from "../../styles/modals/over-all.module.css";

const OverAll = ({ children }: any) => {
  return <div className={Style.container}>{children}</div>;
};

export default OverAll;
