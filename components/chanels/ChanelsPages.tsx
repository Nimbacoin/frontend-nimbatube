import Link from "next/link";
import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/chanels/chanels.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";
import Chanel from "../following/components/ChanelCard";
const ChanelsPages = () => {
  const [Chanels, setChanels] = useState([]);
  useEffect(() => {
    basedGetUrlRequestLogedIn("/api/get/chanel/all-chanels").then(
      (res: any) => {
        if (res.responsData) {
          setChanels(res.responsData);
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
      {Chanels.map(({ chanelData, followers, uploads }: any) => (
        <Chanel
          IsChanelPage={false}
          Title={chanelData.title}
          Username={chanelData.name}
          Uploads={uploads.length}
          Followers={followers.length}
        />
      ))}
    </div>
  );
};

export default ChanelsPages;
