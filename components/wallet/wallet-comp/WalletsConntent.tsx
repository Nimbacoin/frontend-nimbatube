import React from "react";
import Style from "../../../styles/pages/wallet/wallet-comp/WalletsConntent.module.css";
import SmallTextBlack from "../../modals/SmallTextBlack";

const WalletsConntent = () => {
  const wallets = [{ name: "metamask", img: "/images/default-profile.png" }];
  return (
    <div className={Style.container}>
      {wallets.map(({ name }, index) => (
        <div key={index} className={Style.container_wlt}>
          <div className={Style.img_container}></div>
          <div className={Style.text_container}>
            <SmallTextBlack Text={name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletsConntent;
