import React, { useEffect, useState, useRef } from "react";
import Style from "../../../styles/layout/header/header-compnents/search-drop-down.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
const SearchDropDown = () => {
  return (
    <>
      {(() => {
        return (
          <div className={Style.container}>
            <div className={Style.drop_down_container}></div>
          </div>
        );
      })()}
    </>
  );
};

export default SearchDropDown;
