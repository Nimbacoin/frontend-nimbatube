import React from "react";
import NewsLatter from "./footer-components/NewsLatter";
import Style from "../../styles/layout/footer/footer.module.css";
import CopyRight from "./footer-components/CopyRight";
import Wedgits from "./footer-components/Wedgits";

const Footer = () => {
  return (
    <div className={Style.container}>
      <Wedgits />
      <CopyRight />
    </div>
  );
};

export default Footer;
