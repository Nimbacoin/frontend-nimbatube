import React, { useEffect, useState, useRef } from "react";
import Style from "../../../styles/layout/header/header-compnents/header-drop-down.module.css";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import { IoPersonOutline } from "@react-icons/all-files/io5/IoPersonOutline";
import { IoPeopleOutline } from "@react-icons/all-files/io5/IoPeopleOutline";
import { IoRibbonOutline } from "@react-icons/all-files/io5/IoRibbonOutline";
import { IoSettingsOutline } from "@react-icons/all-files/io5/IoSettingsOutline";
import { IoMdHelpCircleOutline } from "@react-icons/all-files/io/IoMdHelpCircleOutline";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { UserSignOut } from "../../../redux/user-slice/UserSignIn";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";

import Cookies from "js-cookie";
import basedPostUrlRequestLogedIn from "../../../utils/basedPostUrlRequestLogedIn";

const HeaderDropDown = () => {
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);
  const UserData = useSelector((state: any) => state.UserSignIn.userdata);
  const dispatch = useDispatch();
  const [ShowDiv, setShowDiv] = useState(false);
  const Router = useRouter();
  const Ref = React.useRef<HTMLDivElement>(null);
  const InputSearch = React.useRef<HTMLDivElement>(null);
  const [Bg, setBg] = useState("/images/default-profile.png");
  const [Name, setName] = useState("");
  const allChannelsFetched = useSelector(
    (state: any) => state.ChannelSlice.allChannelsFetched
  );
  const [channel, setChannel] = useState<{ [key: string]: any }>({});
  const length = Object.keys(channel).length;
  useEffect(() => {
    const handelClick = (e: any) => {
      if (InputSearch && InputSearch.current) {
        const refany = InputSearch.current;
        if (refany.contains(e.target)) {
          setShowDiv(!ShowDiv);
        } else if (Ref && Ref.current) {
          const refany = Ref.current;
          if (!refany.contains(e.target)) {
            setShowDiv(false);
          }
        }
      }
    };
    window.addEventListener("click", handelClick);
  }, [ShowDiv]);
  useEffect(() => {
    if (Channels && Channels?.length) {
      setChannel(Channels[0]);
    }
    if (
      channel?.channelData?.profileImg &&
      typeof channel?.channelData?.profileImg !== "undefined"
    ) {
      setName(channel.channelData.name);
      setBg(
        process.env.NEXT_PUBLIC_BACK_END_URL +
          "/api/get/read/images/" +
          channel.channelData?.profileImg?.url
      );
    }
  });
  const allLinks = [
    {
      name: "Upload",
      link: "/upload",
      icon: <IoCloudUploadOutline />,
      classname: Style.link_container,
    },
    {
      name: "Channels",
      link: "/channels",
      icon: "@",
      classname: Style.link_container,
    },
    {
      name: "Go live",
      link: "/go-live/go-live",
      icon: <IoVideocamOutline />,
      classname: Style.link_container,
    },
    {
      name: "invite",
      link: "/invite",
      icon: <IoPeopleOutline />,
      classname: Style.link_container,
    },
    {
      name: "nimbatube premium",
      link: "/premium",
      icon: <IoRibbonOutline />,
      classname: Style.link_container,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <IoSettingsOutline />,
      classname: Style.link_container,
    },

    {
      name: "Help",
      link: "/help",
      icon: <IoMdHelpCircleOutline />,
      classname: Style.link_container,
    },
    {
      name: "Sign Out",
      link: "/",
      id: "sign-out",
      icon: <IoLogOutOutline />,
      channelname: UserData && UserData.email,
      classname: Style.sing_out_container,
    },
  ];
  const HandelSubmiteInitChannel = async () => {
    const ReqData: any = { general: "", images: "" };
    await basedPostUrlRequestLogedIn(
      "/api/post/channel/init-channel/",
      ReqData
    ).then((res) => {
      if (res?.responsData) {
        Router.push("/channel/create-new-channel/" + res?.responsData?._id);
      }
    });
  };
  const handelClick = (e: any, link: string, id: any) => {
    if (id === "sign-out") {
      e.preventDefault();
      //.removeItem("user");
      Cookies.remove("user");
      dispatch(UserSignOut());
      Router.push("/");
    } else if (id === "channel") {
      if (Channels && Channels?.length) {
        Router.push("/channel/@/" + channel?._id);
      } else {
        HandelSubmiteInitChannel();
      }
    } else {
      Router.push(link);
    }
    setTimeout(() => {
      setShowDiv(false);
    }, 500);
  };
  return (
    <>
      {(() => {
        return (
          <div className={Style.container}>
            <div className={Style.drop_down_option_sold}>
              <FcCircuit />
              <span className={Style.sold}>0.25</span>
            </div>
            <div className={Style.drop_down_option} ref={InputSearch}>
              {Bg !== "/images/default-profile.png" ? (
                <div
                  style={{ backgroundImage: `url(${Bg})` }}
                  className={Style.img_img}
                ></div>
              ) : (
                <IoPersonOutline />
              )}
            </div>
            {ShowDiv && (
              <div className={Style.drop_down_container} ref={Ref}>
                <div
                  onClick={(e) => handelClick(e, "channel", "channel")}
                  className={Style.channel_container}
                >
                  <div
                    style={{ backgroundImage: `url(${Bg})` }}
                    className={Style.img}
                  ></div>

                  <div className={Style.link_data}>
                    {Channels?.length >= 1 ? (
                      <>
                        <span className={Style.name}>Your Channel </span>
                        <span className={Style.channelname}>
                          {Channels?.length >= 1 &&
                            Channels[0]?.channelData?.name}
                        </span>
                      </>
                    ) : (
                      <button>create channel</button>
                    )}
                  </div>
                </div>
                {allLinks.map(
                  ({ link, id, name, channelname, icon, classname }) => (
                    <div
                      key={name}
                      onClick={(e) => handelClick(e, link, id)}
                      className={classname}
                      id={link === "/" ? id : link}
                    >
                      {icon && <span className={Style.icon}> {icon}</span>}

                      <div className={Style.link_data}>
                        {name && <span className={Style.name}> {name}</span>}

                        <span className={Style.channelname}>{channelname}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        );
      })()}
    </>
  );
};

export default HeaderDropDown;
