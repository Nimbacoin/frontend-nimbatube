import Link from "next/link";
import React from "react";
import Style from "../../styles/pages/chanels/chanels.module.css";
import Chanel from "../following/components/ChanelCard";
const ChanelsPages = () => {
  return (
    <div className={Style.container}>
      <div className={Style.head_container}>
        <div className={Style.title}>Your Active channels </div>
        <Link href="/chanel/new">
          <button className={Style.button}> New Chanel </button>
        </Link>
      </div>
      <Chanel IsChanelPage={false} />
      <Chanel />
    </div>
  );
};

export default ChanelsPages;
