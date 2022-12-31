import React, { useEffect, useState } from "react";
import Style from "../../styles/pages/home/home-tags.module.css";

import { IoChevronForwardOutline } from "@react-icons/all-files/io5/IoChevronForwardOutline";
import { IoChevronBackOutline } from "@react-icons/all-files/io5/IoChevronBackOutline";
import { useSelector } from "react-redux";
const RightSideTaggs = () => {
  // const [videos, setVideos] = useState([]);
  const [activVideos, setActivVideos] = useState(0);
  const Tags = [
    { name: "All" },
    { name: "Live" },
    { name: "Travel " },
    { name: "Crypto" },
    { name: "Bitcoin" },
    { name: "Blockchain" },
    { name: "Music" },
    { name: "Travel" },
    { name: "Ecommrce" },
    { name: "covid-19" },
    { name: "USA" },
    { name: "Travel" },
    { name: "Javascript" },
    { name: "World cup" },
    { name: "2022" },
    { name: "Crypto" },
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
      if (scrool <= divContainer.current.scrollWidth) {
        divContainer.current.scrollLeft = scrool;
        setScrollValue(divContainer.current.scrollLeft);
      }
    }
  };
  const handelClickLeft = () => {
    if (divContainer.current) {
      if (divContainer.current.scrollLeft >= 1) {
        divContainer.current.scrollLeft = divContainer.current.scrollLeft - 50;
        setScrollValue(divContainer.current.scrollLeft);
      }
    }
  };
  const [scrollZero, setScrollZero] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    if (divContainer.current) {
      if (divContainer.current.scrollLeft >= 1) {
        setScrollZero(true);
      } else {
        setScrollZero(false);
      }
    }
  }, [scrollValue]);

  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);
  useEffect(() => {
    if (divRef.current) {
      if (MenuBoolean) {
        divRef.current.className = Style.container;
        //"1100px";
      } else {
        divRef.current.className = Style.container1255px;
        ("1255px");
      }
    }
  }, [MenuBoolean]);
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} className={Style.container}>
      {scrollZero && (
        <div className={Style.div_scroll_left}>
          <span onClick={handelClickLeft} className={Style.forward_outline}>
            <IoChevronBackOutline />
          </span>
        </div>
      )}

      <div ref={divContainer} className={Style.main_container}>
        {Tags.map(({ name }, index) => (
          <span
            key={index + name}
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
