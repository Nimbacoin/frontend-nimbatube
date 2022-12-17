import React, { useState } from "react";
import Style from "../../../styles/pages/wallet/wallet-comp/WalletsConntent.module.css";
import SmallTextBlack from "../../modals/SmallTextBlack";
import CoinBase from "./CoinBase";
import MetaMask from "./MetaMask";

const WalletsConntent = () => {
  const ContainerWlt = React.useRef<HTMLDivElement | null>(null);
  const [metaMakeB, seTMetaMaskb] = useState(false);
  const [coinBaseB, setCoinBase] = useState(false);
  const HandelConnectMt = (e: any) => {
    seTMetaMaskb(!metaMakeB);
  };
  const HandelConnectCB = (e: any) => {
    setCoinBase(!coinBaseB);
  };
  const wallets = [
    {
      name: "metamask",
      img: "/images/metamask.png",
      HandelConnect: HandelConnectMt,
    },
    {
      name: "coinbase",
      img: "/images/coinbase.png",
      HandelConnect: HandelConnectCB,
    },
    { name: "trustwallet", img: "/images/trustwallet.png" },
  ];

  return (
    <div ref={ContainerWlt} className={Style.container}>
      {metaMakeB && <MetaMask />}
      {coinBaseB && <CoinBase />}
      {wallets.map(({ name, img, HandelConnect }, index) => (
        <div
          onClick={HandelConnect}
          id={name}
          key={index}
          className={Style.container_wlt}
        >
          <div
            style={{
              backgroundImage: `url(${img})`,
            }}
            className={Style.img_container}
          ></div>
          <div className={Style.text_container}>
            <SmallTextBlack Text={name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletsConntent;
