import React, { useEffect, useState } from "react";
import Style from "../../../../styles/pages/watch/rightside/right-side-taggs.module.css";
import { IoChevronForwardOutline } from "@react-icons/all-files/io5/IoChevronForwardOutline";
const RightSideTaggs = () => {
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
  const divContainer = React.useRef<HTMLDivElement | null>(null);
  const handelClick = () => {
    if (divContainer.current) {
      const scrool = divContainer.current.scrollLeft + 50;
      alert(scrool);
      if (divContainer.current.scrollWidth <= scrool) {
        divContainer.current.scrollLeft = scrool;
      }
    }
  };
  return (
    <div className={Style.container}>
      <div ref={divContainer} className={Style.main_container}>
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
      <div className={Style.div_scroll}>
        <span onClick={handelClick} className={Style.forward_outline}>
          <IoChevronForwardOutline />
        </span>
      </div>
    </div>
  );
};

export default RightSideTaggs;
