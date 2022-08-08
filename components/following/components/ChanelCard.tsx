import React, { useEffect, useState } from "react";
import Style from "../../../styles/pages/following/components/chanel.module.css";
import { IoEllipsisVertical } from "@react-icons/all-files/io5/IoEllipsisVertical";

const Chanel = ({ IsChanelPage, Title, Username, Uploads, Followers }: any) => {
  const [ShowDiv, setShowDiv] = useState(false);
  const Ref = React.useRef<HTMLDivElement>(null);
  const InputSearch = React.useRef<HTMLDivElement>(null);

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

  const Bg = "/images/default-profile.png";
  return (
    <div className={Style.container}>
      <div
        style={{ backgroundImage: `url(${Bg})` }}
        className={Style.img}
      ></div>
      <div className={Style.chanel_container}>
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
        <button className={Style.IoEllipsisVertical}>
          <IoEllipsisVertical />
        </button>
      </div>
    </div>
  );
};

export default Chanel;
