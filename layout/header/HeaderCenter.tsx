import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Style from "../../styles/layout/header/header-compnents/header-center.module.css";
import { IoSearchOutline } from "@react-icons/all-files/io5/IoSearchOutline";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
// import IoNotificationsOutline from "@mui/icons-material/NotificationsSharp";
import { useRouter } from "next/router";
import SearchDropDown from "./header-components/SearchDropDown";
import IconHeader from "../../components/modals/IconHeader";
import NotfyDropDown from "./header-components/NotfyDropDown";
import { useSelector } from "react-redux";
import GoogleIcon from "../../components/modals/GoogleIcon";
import BackupSharpIcon from "@mui/icons-material/BackupSharp";

const HeaderCenter = ({ UserIsSignedIn }: any) => {
  const { asPath } = useRouter();
  const [ShowDiv, setShowDiv] = useState(false);
  const [showDivNotfy, setShowDivNotfy] = useState(false);
  const [showDivNotfyPhone, setShowDivNotfyPhone] = useState(false);
  const [IsPhone, setIsPhone] = useState(false);

  const Ref = React.useRef<HTMLDivElement>(null);
  const InputSearch = React.useRef<HTMLInputElement>(null);
  const notifyIcon = React.useRef<HTMLDivElement>(null);

  const notfyDropDown = React.useRef<HTMLDivElement>(null);
  const notfyDropDownPhone = React.useRef<HTMLDivElement>(null);
  const notifyIconPhone = React.useRef<HTMLDivElement>(null);
  const handelToggelNotfy = () => {
    setShowDivNotfy(!showDivNotfy);
  };
  useEffect(() => {
    const HandelClick = (e: any) => {
      if (notifyIconPhone && notifyIconPhone.current) {
        const refany = notifyIconPhone.current;
        if (refany.contains(e.target)) {
          setShowDivNotfyPhone(!showDivNotfyPhone);
        } else if (notfyDropDownPhone && notfyDropDownPhone.current) {
          const refany = notfyDropDownPhone.current;
          if (!refany.contains(e.target)) {
            setShowDivNotfyPhone(false);
          }
        }
      }
    };
    window.addEventListener("click", HandelClick);
  }, [showDivNotfyPhone]);

  useEffect(() => {
    const HandelClick = (e: any) => {
      if (notifyIcon && notifyIcon.current) {
        const refany = notifyIcon.current;
        if (refany.contains(e.target)) {
          handelToggelNotfy();
        } else if (notfyDropDown && notfyDropDown.current) {
          const refany = notfyDropDown.current;
          if (!refany.contains(e.target)) {
            setShowDivNotfy(false);
          }
        }
      }
    };
    window.addEventListener("click", HandelClick);
  }, [showDivNotfy]);
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
  const HandelSearchPhone = () => {
    setIsPhone(!IsPhone);
    setShowDivPhone(!showDivPhone);
  };
  const notificationNoSeen = useSelector(
    (state: any) => state.UserSignIn.notificationNoSeen
  );
  const notification = useSelector(
    (state: any) => state.UserSignIn.notification
  );
  const Notification = notification;

  const numberNotfy = notificationNoSeen.length;
  const [showDivPhone, setShowDivPhone] = useState(false);
  return (
    <div className={IsPhone ? Style.container_phone : Style.container}>
      <div
        className={
          IsPhone ? Style.container_search_phone : Style.container_search
        }
      >
        <input
          ref={InputSearch}
          className={Style.search_input}
          placeholder="search"
        />
        <button className={Style.search_button}>
          <IoSearchOutline />
        </button>

        {ShowDiv && <SearchDropDown />}
      </div>
      {showDivPhone && <div className={Style.div_searching}></div>}

      <div className={Style.buttons_container}>
        {UserIsSignedIn ? (
          <>
            <IconHeader
              Url={"/upload"}
              Icon={<IoCloudUploadOutline />}
              TextValue={"upload"}
            />

            <div className={Style.notfy_drop_down} ref={notfyDropDown}>
              <div
                // onClick={handelToggelNotfy}
                ref={notifyIcon}
                className={Style.icon_con}
              >
                <IconHeader
                  Number={true}
                  NumberData={numberNotfy}
                  Icon={<IoNotificationsOutline />}
                  TextValue={"Notification"}
                />
              </div>
              {showDivNotfy && Notification?.length ? (
                <NotfyDropDown Notification={Notification} />
              ) : null}
            </div>

            <IconHeader
              Url={"/go-live/go-live"}
              Icon={<IoVideocamOutline />}
              TextValue={"Go lIVE"}
            />
          </>
        ) : (
          <>
            <IconHeader
              Url={"/auth/sign-in"}
              Icon={<IoCloudUploadOutline />}
              TextValue={"upload"}
            />

            <div className={Style.notfy_drop_down}>
              <IconHeader
                Url={"/auth/sign-in"}
                Icon={<IoNotificationsOutline />}
                TextValue={"Notification"}
              />
            </div>
            <IconHeader
              Url={"/auth/sign-in"}
              Icon={<IoVideocamOutline />}
              TextValue={"Go lIVE"}
            />
          </>
        )}
      </div>
      <button
        onClick={HandelSearchPhone}
        className={Style.rest_of_button_search_phone}
      >
        <IconHeader
          Icon={IsPhone ? <IoCloseOutline /> : <IoSearchOutline />}
          TextValue={IsPhone ? "Search" : "Close"}
        />
      </button>
      {!IsPhone && (
        <div className={Style.notfy_drop_down_phone} ref={notfyDropDownPhone}>
          <div
            // onClick={handelToggelNotfy}
            ref={notifyIconPhone}
            className={Style.icon_con}
          >
            <IconHeader
              Number={true}
              NumberData={numberNotfy}
              Icon={<IoNotificationsOutline />}
              TextValue={"Notification"}
            />
          </div>
          {showDivNotfyPhone ? (
            <NotfyDropDown Notification={Notification} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default HeaderCenter;
