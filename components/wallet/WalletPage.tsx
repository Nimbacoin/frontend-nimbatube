import React from "react";
import TopTitle from "../modals/TopTitle";
import Style from "../../styles/pages/wallet/wallet.module.css";
import { IoWalletOutline } from "@react-icons/all-files/io5/IoWalletOutline";
import WalletsConntent from "./wallet-comp/WalletsConntent";

const WalletPage = () => {
  return (
    <div className={Style.container}>
      <TopTitle
        ButtonRight={true}
        TextBlueButton={"connect wallet"}
        Icon={<IoWalletOutline />}
        Text={"wallet"}
      />
      <div className={Style.container_wallets_option}>
        <WalletsConntent />
      </div>
    </div>
  );
};

export default WalletPage;
