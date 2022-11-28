import React from "react";
import TopTitle from "../modals/TopTitle";
import Style from "../../styles/pages/wallet/wallet.module.css";
import { IoWalletOutline } from "@react-icons/all-files/io5/IoWalletOutline";
import WalletsConntent from "./wallet-comp/WalletsConntent";
import { isAndroid, isIOS } from "react-device-detect";

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
      {isAndroid ? (
        <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
          Open Android app
        </a>
      ) : isIOS ? (
        <a href="https://apps.apple.com/us/app/instagram/id389801252">
          Open iOS app
        </a>
      ) : (
        <a href="https://instagram.com">Open Web app</a>
      )}
    </div>
  );
};

export default WalletPage;
