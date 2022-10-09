import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/home/home-tags.module.css";

const HomeTags = () => {
  // const [videos, setVideos] = useState([]);
  const Tags = [
    { name: "All" },
    { name: "Live" },
    { name: "Trsvel " },
    { name: "Crypto" },
    { name: "Bitcoin" },
    { name: "Blockchain" },
    { name: "Music" },
    { name: "Ecommrce" },
    { name: "covid-19" },
    { name: "USA" },

    { name: "Javascript" },

    { name: "Travel" },
  ];
  // useEffect(() => {
  //   const locaFetch = async () => {
  //     const dataRes: any = await allVideosFetch();
  //     setVideos(dataRes.responseData);
  //   };
  //   locaFetch();
  // }, []);

  return (
    <div className={Style.container}>
      {Tags.map(({ name }) => (
        <span className={Style.span}>{name}</span>
      ))}
    </div>
  );
};

export default HomeTags;
