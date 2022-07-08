import Link from "next/link";
import React from "react";
import Style from "../../styles/layout/header/header-compnents/header-center.module.css";
import { useRouter } from "next/router";
const HeaderCenter = () => {
  const NavLinks = [
    { name: "Tours", link: "/tours" },
    { name: "Excursions", link: "/excursions" },
    { name: "Destinations", link: "/destinations" },
    { name: "Contact", link: "/contact" },
  ];
  const { asPath } = useRouter();
  return (
    <div className={Style.container}>
      <ul className={Style.container_ul}>
        {NavLinks.map(({ name, link }) => (
          <li
            className={asPath === `/${link}` ? Style.lihover : Style.li}
            key={link}
          >
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeaderCenter;
