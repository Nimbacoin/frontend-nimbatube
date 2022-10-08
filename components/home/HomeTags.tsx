import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/home/home-tags.module.css";

const HomeTags = () => {
  // const [videos, setVideos] = useState([]);
  const Tags = [{ name: "All" }, { name: "Live" }];
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
        <div className={Style.tag}>
          <span>{name}</span>
        </div>
      ))}{" "}
    </div>
  );
};

export default HomeTags;
