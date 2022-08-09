import React, { useEffect, useState } from "react";
import Style from "../../../styles/pages/following/components/chanel.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";
import { FcCircuit } from "@react-icons/all-files/fc/FcCircuit";
import { BsPencilSquare } from "@react-icons/all-files/bs/BsPencilSquare";
import { IoIosLink } from "@react-icons/all-files/io/IoIosLink";
import { IoTrashSharp } from "@react-icons/all-files/io5/IoTrashSharp";

import { useRouter } from "next/router";
import basedDeleteUrlRequestLogedIn from "../../../utils/basedDeleteUrlRequestLogedIn";
import { AllChanelsRedcuer } from "../../../redux/chanel-slice/ChanelSlice";
import { useDispatch } from "react-redux";

const Chanel = ({
  IsChanelPage,
  Title,
  Username,
  Uploads,
  Followers,
  LinkChanel,
  Id,
}: any) => {
  const [ShowDiv, setShowDiv] = useState(false);
  const Ref = React.useRef<HTMLDivElement>(null);
  const Container = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const InputSearch = React.useRef<HTMLButtonElement>(null);
  const Router = useRouter();
  useEffect(() => {
    const HandelClick = (e: any) => {
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
    window.addEventListener("click", HandelClick);
  }, [ShowDiv]);

  const HandelClickUrl = (e: any) => {
    Router.push(LinkChanel);
  };
  let Body: any = { chanelId: Id };
  const handelDeleteChanel = () => {
    basedDeleteUrlRequestLogedIn("/api/delete/chanel/delete-chanel", Body).then(
      (res: any) => {
        dispatch(AllChanelsRedcuer(res.responsData));
        console.log(res);
        Body = {};
      }
    );
  };
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
      func: handelDeleteChanel,
      icon: <IoTrashSharp />,
    },
    {
      name: "Copy Link",
      func: HandelFunc,
      icon: <IoIosLink />,
    },
  ];

  const Bg = "/images/default-profile.png";

  return (
    <div key={Id} ref={Container} className={Style.container}>
      <div
        onClick={HandelClickUrl}
        style={{ backgroundImage: `url(${Bg})` }}
        className={Style.img}
      ></div>
      <div onClick={HandelClickUrl} className={Style.chanel_container}>
        <span className={Style.chanel_name}>{Title}</span>
        <span className={Style.username}>@{Username}</span>
        <p className={Style.chanel_followers}>
          <span className={Style.Followers}>
            {" "}
            {Followers} Followers - {Uploads} Uploads
          </span>
        </p>
        {IsChanelPage && (
          <button className={Style.follow_button}>Follow</button>
        )}
      </div>
      <div className={Style.right_container}>
        <button ref={InputSearch} className={Style.IoEllipsisVertical}>
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

export default Chanel;
