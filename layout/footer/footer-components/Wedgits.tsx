import React from "react";
import Style from "../../../styles/layout/footer/footer-components/wedgits.module.css";
import NewsLatter from "./NewsLatter";

const Wedgits = () => {
  return (
    <div className={Style.container}>
      <NewsLatter />;
    </div>
  );
};

export default Wedgits;
