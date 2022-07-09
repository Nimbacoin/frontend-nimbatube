import Link from "next/link";
import React from "react";
import Style from "../../../styles/layout/footer/footer-components/copy-right.module.css";
import LangAndCurrency from "../../header/header-components/LangAndCurrency";
import Flag from "react-world-flags";

const CopyRight = () => {
  const QuickLinks = [
    { name: " Terms & Conditions", link: "terms-and-onditions" },
    { name: " Privacy Policy", link: "privacy-policy" },
    { name: "Cookies", link: "cookies" },
  ];

  return (
    <div className={Style.container}>
      <div className={Style.req_data}>
        <Flag code="GB" height="200" /> {" " + "|" + " "}
        <span className={Style.currency}>
          <strong>€ </strong>
          <small>EUR</small>
        </span>
      </div>

      <ul className={Style.container_ul}>
        {QuickLinks.map(({ name, link }) => (
          <li className={Style.li} key={link}>
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>
      <div className={Style.to_docoraton}>
        <span className={Style.powered_our_team}>
          {" "}
          All Right Resrved © 2022. Powered by
          <Link href={"/about-us"} passHref={true}>
            <b className={Style.about_us_b}> Ur Excursion</b>
          </Link>{" "}
        </span>
        <div className={Style.span_dicoration}></div>
      </div>
    </div>
  );
};

export default CopyRight;
