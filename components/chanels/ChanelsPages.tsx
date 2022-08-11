import Link from "next/link";
import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/chanels/chanels.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
import { useDispatch, useSelector } from "react-redux";
import Chanel from "../following/components/ChanelCard";
import { AllChanelsRedcuer } from "../../redux/chanel-slice/ChanelSlice";

const ChanelsPages = () => {
  const dispatch = useDispatch();
  const Chanels = useSelector((state: any) => state.ChanelSlice.allChanels);
  useEffect(() => {
    basedGetUrlRequestLogedIn("/api/get/chanel/all-chanels").then(
      (res: any) => {
        if (res.responsData) {
          dispatch(AllChanelsRedcuer(res.responsData));
        }
        console.log(res);
      }
    );
  }, []);

  return (
    <div className={Style.container}>
      <div className={Style.head_container}>
        <div className={Style.title}>Your Active channels </div>
        <Link href="/chanel/new">
          <button className={Style.button}> New Chanel </button>
        </Link>
      </div>

      {Chanels &&
        Chanels.map(({ _id, chanelData, followers, uploads }: any) => (
          <Chanel
            key={_id}
            Id={_id}
            LinkChanel={"/chanel/" + _id}
            IsChanelPage={false}
            Title={chanelData.title}
            Username={chanelData.name}
            ProfileImg={chanelData.profileImg}
            Uploads={uploads.length}
            Followers={followers.length}
          />
        ))}
    </div>
  );
};

export default ChanelsPages;
