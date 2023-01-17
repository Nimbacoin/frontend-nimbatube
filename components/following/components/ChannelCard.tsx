import React, { useEffect, useState } from "react";
import Style from "../../../styles/pages/following/components/channel.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { BsPencilSquare } from "@react-icons/all-files/bs/BsPencilSquare";
import { IoIosLink } from "@react-icons/all-files/io/IoIosLink";
import { IoTrashSharp } from "@react-icons/all-files/io5/IoTrashSharp";

import { useRouter } from "next/router";
import basedDeleteUrlRequestLogedIn from "../../../utils/basedDeleteUrlRequestLogedIn";
import { AllChannelsRedcuer } from "../../../redux/channel-slice/ChannelSlice";
import { useDispatch, useSelector } from "react-redux";
import basedPostUrlRequestLogedIn from "../../../utils/basedPostUrlRequestLogedIn";
import {
  poPUppRedcuer,
  supportReducer,
} from "../../../redux/style-slice/general-style/GenrealStyle";
import { MainVideoDataReducer } from "../../../redux/video-slice/VideoSlice";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";
import ButtonBlack from "../../modals/ButtonBlack";
import CancelButton from "../../modals/CancelButton";
const Channel = ({
  IsChannelPage,
  Title,
  Username,
  Uploads,
  Followers,
  LinkChannel,
  AllFollowers,
  Id,
  ProfileImg,
  channelData,
}: any) => {
  const userSignIn = useSelector((state: any) => state.UserSignIn.mainUserData);
  const [IsFollowed, setIsFollowed] = useState(
    AllFollowers?.length &&
      AllFollowers.some(({ id }: any) => id === userSignIn?._id)
  );

  const followeddd = AllFollowers?.some(
    ({ id }: any) => id === userSignIn?._id
  );
  const [ShowDiv, setShowDiv] = useState(false);
  const Ref = React.useRef<HTMLDivElement>(null);
  const Container = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const inputSearch = React.useRef<HTMLButtonElement>(null);
  const Router = useRouter();
  const [followers, setFollowers] = useState(channelData?.followers?.followers);
  const handelSupport = () => {
    dispatch(supportReducer({ value: true }));
  };
  const HandelFollow = async () => {
    const userId = userSignIn.email;
    setIsFollowed(!IsFollowed);
    if (userId) {
      const body: any = {
        channelId: channelData._id,
        isFollowing: !IsFollowed,
      };
      await basedPostUrlRequestLogedIn(
        "/api/post/channel/follow-channel",
        body
      ).then((responseData) => {
        if (responseData) {
          setFollowers(responseData?.responseData?.followers);
          dispatch(
            MainVideoDataReducer({
              message: "followers",
              followers: responseData?.responseData,
            })
          );
        }
      });
    } else {
      Router.push("/auth/sign-in");
    }
  };
  useEffect(() => {
    const handelClick = (e: any) => {
      if (inputSearch && inputSearch.current) {
        const refany = inputSearch.current;
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

  const handelClickUrl = (e: any) => {
    Router.push(LinkChannel);
  };
  let Body: any = { channelId: Id };

  const handelDeleteChannel = async () => {
    await basedPostUrlRequestLogedIn(
      "/api/post/channel/delete-channel/",
      Body
    ).then((res: any) => {
      dispatch(poPUppRedcuer({ data: "channel removed" }));
      setTimeout(() => {
        dispatch(poPUppRedcuer({ data: "" }));
      }, 5000);
      setShowDiv(false);
      dispatch(AllChannelsRedcuer(res.responsData));
    });
  };
  function copyToClipboard(value: any) {
    navigator.clipboard.writeText(
      window.location.hostname + "/channel/@/" + Id
    );

    dispatch(poPUppRedcuer({ data: "channle link is copied" }));
    setTimeout(() => {
      dispatch(poPUppRedcuer({ data: "" }));
    }, 5000);
    setShowDiv(false);
  }
  const HandelFunc = () => {
    // alert(Id);
    Router.push("/edit-channel/" + Id);
    //
  };
  const AllLink = [
    {
      name: "Support",
      func: handelSupport,
      icon: <FcCircuit />,
    },
    {
      name: "Edit",
      func: HandelFunc,
      icon: <BsPencilSquare />,
    },
    {
      name: "Delete",
      func: handelDeleteChannel,
      icon: <IoTrashSharp />,
    },
    {
      name: "Copy Link",
      func: copyToClipboard,
      icon: <IoIosLink />,
    },
  ];

  const Bg = "/images/default-profile.png";

  return (
    <div key={Id} ref={Container} className={Style.container}>
      <div onClick={handelClickUrl} className={Style.img_container}>
        <div
          onClick={handelClickUrl}
          style={{
            backgroundImage: `url(${ProfileImg?.url ? ProfileImg.url : Bg})`,
          }}
          className={Style.img}
        ></div>
      </div>
      <div onClick={handelClickUrl} className={Style.channel_container}>
        <span className={Style.channel_name}>{Title}</span>
        <span className={Style.username}>@{Username}</span>
        <p className={Style.channel_followers}>
          <span className={Style.Followers}>
            {" "}
            {Followers ? Followers : "0 - "} {" followers"} &nbsp; &nbsp;
            {"    " + channelData?.numbers?.uploads
              ? channelData?.numbers?.uploads
              : "0 "}{" "}
            {" - uploads"}
          </span>
        </p>
        {(() => {
          if (IsChannelPage) {
            if (followeddd) {
              return (
                <CancelButton HandelClick={HandelFollow} Text={"following"} />
              );
            } else {
              return <ButtonBlack Text={"follow"} HandelClick={HandelFollow} />;
            }
          }
        })()}
      </div>
      <div className={Style.right_container}>
        <button ref={inputSearch} className={Style.IoEllipsisVertical}>
          <IoEllipsisVertical />
        </button>
        {ShowDiv && (
          <div className={Style.drop_down_container} ref={Ref}>
            {AllLink.map(({ name, icon, func }) => (
              <div className={Style.link_container} key={name} onClick={func}>
                <span className={Style.icon}> {icon}</span>
                <div className={Style.link_data}>
                  <span className={Style.name}> {name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
