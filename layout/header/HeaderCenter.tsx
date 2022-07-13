import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Style from "../../styles/layout/header/header-compnents/header-center.module.css";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import { useRouter } from "next/router";
import SearchDropDown from "./header-components/SearchDropDown";

const HeaderCenter = () => {
  const { asPath } = useRouter();
  const [ShowDiv, setShowDiv] = useState(false);
  const Ref = React.useRef<HTMLDivElement>(null);
  const InputSearch = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const HandelClick = (e: any) => {
      if (InputSearch && InputSearch.current) {
        const refany = InputSearch.current;
        if (refany.contains(e.target)) {
          setShowDiv(true);
        } else if (InputSearch && InputSearch.current) {
          const refany = InputSearch.current;
          if (!refany.contains(e.target)) {
            setShowDiv(false);
          }
        }
      }
    };
    window.addEventListener("click", HandelClick);
  }, [ShowDiv]);

  return (
    <div className={Style.container}>
      {ShowDiv && <SearchDropDown />}
      <div className={Style.container_search}>
        <input
          ref={InputSearch}
          className={Style.search_input}
          placeholder="search"
        />
        <button className={Style.search_button}>
          <IoSearchOutline />
        </button>
      </div>
      <div className={Style.buttons_container}>
        <button className={Style.rest_of_button}>
          <IoCloudUploadOutline />
        </button>
        <button className={Style.rest_of_button}>
          <IoNotificationsOutline />
        </button>
        <button className={Style.rest_of_button}>
          <IoVideocamOutline />
        </button>
      </div>
    </div>
  );
};

export default HeaderCenter;
