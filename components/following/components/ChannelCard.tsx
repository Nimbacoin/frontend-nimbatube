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
import { useDispatch } from "react-redux";
import basedPostUrlRequestLogedIn from "../../../utils/basedPostUrlRequestLogedIn";

const Channel = ({
  IsChannelPage,
  Title,
  Username,
  Uploads,
  Followers,
  LinkChannel,
  Id,
  ProfileImg,
}: any) => {
  console.log(Title);
  const [ShowDiv, setShowDiv] = useState(false);
  const Ref = React.useRef<HTMLDivElement>(null);
  const Container = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const inputSearch = React.useRef<HTMLButtonElement>(null);
  const Router = useRouter();
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
    console.log("Id", Id);
    await basedPostUrlRequestLogedIn(
      "/api/post/channel/delete-channel/",
      Body
    ).then((res: any) => {
      console.log("channel removed");
      dispatch(AllChannelsRedcuer(res.responsData));
      console.log(res);
    });
  };
  function copyToClipboard(value: any) {
    navigator.clipboard.writeText(
      window.location.hostname + "/channel/@/" + Id
    );
  }
  const HandelFunc = () => {};
  const AllLink = [
    {
      name: "Support",
      func: HandelFunc,
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
            backgroundImage: `url(${
              ProfileImg?.url
                ? process.env.NEXT_PUBLIC_BACK_END_URL +
                  "/api/get/read/images/" +
                  ProfileImg.url
                : Bg
            })`,
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
            {Followers} {Followers && " Followers"} {Uploads ? Uploads : null}
            {Uploads ? " - Uploads" : null}
          </span>
        </p>
        {IsChannelPage && (
          <button className={Style.follow_button}>Follow</button>
        )}
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
