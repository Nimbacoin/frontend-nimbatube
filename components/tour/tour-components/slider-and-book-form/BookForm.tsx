import Style from "../../../../styles/pages/tour/tour-components/slider-and-book-form/book-form.module.css";
import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "@react-icons/all-files/io5/IoCalendarOutline";
import { IoPersonOutline } from "@react-icons/all-files/io5/IoPersonOutline";
import { SP } from "next/dist/shared/lib/utils";

const HomeSearch = () => {
  const [startDate, setStartDate] = useState(new Date());

  const HandelChange = (date: Date) => {
    setStartDate(date);
  };

  return (
    <div className={Style.container}>
      <form className={Style.form}>
        <div className={Style.price_container}>
          <p className={Style.from}>
            From <b className={Style.price}>€25.38</b>
            <br />
          </p>
          Lowest Price Guarantee
        </div>
        <div className={Style.container_search}>
          <div className={Style.selected}> Select Date and Travelers</div>
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
          <div className={Style.wrapper_date}>
            <p className={Style.date_icon}>
              <IoPersonOutline />
            </p>
            <label className={Style.label_date} htmlFor="datepicker">
              <input placeholder="2 Adults" />
            </label>
          </div>
          <button className={Style.search_button}>Check Availability</button>
        </div>
        <div className={Style.payment_container}>
          <p className={Style.reserve_now}>
            <b> Reserve Now & Pay Later</b>
            <span> Secure your spot while staying flexible</span>
            <b>Free cancellation</b>
            <span>Up to 24 hours in advance.Learn more</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default HomeSearch;
