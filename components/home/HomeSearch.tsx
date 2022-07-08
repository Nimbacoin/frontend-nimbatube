import React, { useEffect, useState, useRef } from "react";
import Style from "../../styles/pages/home/home-search.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "@react-icons/all-files/io5/IoCalendarOutline";
import { IoSearchSharp } from "@react-icons/all-files/io5/IoSearchSharp";

const HomeSearch = () => {
  const [startDate, setStartDate] = useState(new Date());
  const month = startDate.getUTCMonth() + 1; //months from 1-12
  const day = startDate.getUTCDate();
  const year = startDate.getUTCFullYear();
  const newdate = day + "/" + month + "/" + year;

  const HandelChange = (date: Date) => {
    setStartDate(date);
  };

  return (
    <div className={Style.container}>
      <form className={Style.form}>
        <div className={Style.wrapper_location}>
          <IoSearchSharp />
            <input placeholder="Search for your Destination" />
        </div>
        <div className={Style.wrapper_date}>
          <p className={Style.date_icon}>
            <IoCalendarOutline />
          </p>
          <label className={Style.label_date} htmlFor="datepicker">
            <DatePicker
              value={startDate}
              selected={startDate}
              onChange={(date: Date) => {
                HandelChange(date);
              }}
            />
          </label>
        </div>
        <button className={Style.search_button}>Search</button>
      </form>
    </div>
  );
};

export default HomeSearch;
