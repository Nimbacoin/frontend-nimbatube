import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/home/home-tags.module.css";
import { IoChevronForwardOutline } from "@react-icons/all-files/io5/IoChevronForwardOutline";
const HomeTags = () => {
  // const [videos, setVideos] = useState([]);
  const [activVideos, setActivVideos] = useState(0);
  const Tags = [
    { name: "All" },
    { name: "Live" },
    { name: "Travel " },
    { name: "Crypto" },
    { name: "Bitcoin" },
    // { name: "Blockchain" },
    // { name: "Music" },
    // { name: "Ecommrce" },
    // { name: "covid-19" },
    // { name: "USA" },

    // { name: "Javascript" },

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
      {Tags.map(({ name }, index) => (
        <span
          onClick={() => {
            setActivVideos(index);
          }}
          className={activVideos == index ? Style.active_span : Style.span}
        >
          {name}
        </span>
      ))}
    </div>
  );
};

export default HomeTags;
