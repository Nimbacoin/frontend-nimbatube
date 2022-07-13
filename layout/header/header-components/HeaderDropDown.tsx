import React, { useEffect, useState, useRef } from "react";
import Style from "../../../styles/layout/header/header-compnents/header-drop-down.module.css";
import { IoCloudUploadOutline } from "@react-icons/all-files/io5/IoCloudUploadOutline";
import Link from "next/link";

const HeaderDropDown = () => {
  const [ShowDiv, setShowDiv] = useState(false);

  const Ref = React.useRef<HTMLDivElement>(null);
  const InputSearch = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const HandelClick = (e: any) => {
      if (InputSearch && InputSearch.current) {
        const refany = InputSearch.current;
        if (refany.contains(e.target)) {
          setShowDiv(!ShowDiv);
        } else if (Ref && Ref.current) {
          const refany = Ref.current;
          if (!refany.contains(e.target)) {
            setShowDiv(false);
          }
        }
      }
    };
    window.addEventListener("click", HandelClick);
  }, [ShowDiv]);
  const AllLink = [
    {
      name: "Uploads",
      link: "uploads",
      icon: <IoCloudUploadOutline />,
      classname: Style.link_container,
    },
  ];

  return (
    <>
      {(() => {
        return (
          <div className={Style.container}>
            <div className={Style.drop_down_option} ref={InputSearch}>
              Drop
            </div>
            {ShowDiv && (
              <div className={Style.drop_down_container} ref={Ref}>
                {AllLink.map(({ name, link, icon, classname }) => (
                  <Link href={link}>
                    <div className={classname}>
                      {name} {icon}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })()}
    </>
  );
};

export default HeaderDropDown;
