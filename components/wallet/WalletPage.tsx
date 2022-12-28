import React, { useEffect } from "react";
import TopTitle from "../modals/TopTitle";
import Style from "../../styles/pages/wallet/wallet.module.css";
import { IoWalletOutline } from "@react-icons/all-files/io5/IoWalletOutline";
import WalletsConntent from "./wallet-comp/WalletsConntent";
import { isAndroid, isIOS } from "react-device-detect";
import { useWeb3Modal } from "@web3modal/react";
import MetaMask from "./wallet-comp/MetaMask";

const WalletPage = () => {
  const { isOpen, open, close } = useWeb3Modal();
  console.log(isOpen);

  const redirecttoNativeApp = (/*potential params */) => {
    document.location = "instagram://";
  };
  useEffect(() => {
    if (isAndroid) {
      const url = "https://metamask.app.link/dapp/nimbatube.com/";

      // window.location.replace(url);
    } else if (isIOS) {
      //  window.location.replace("metamask://");

      setTimeout(() => {
        window.location.replace(
          "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202"
        );
      }, 10000);
    } else {
      // window.location.replace("https://instagram.com");
    }
  }, []);
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
        <a href="https://metamask.app.link/dapp/nimbatube.com/        ">
          Open Android app
        </a>
      ) : isIOS ? (
        <a href="https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202">
          Open iOS app
        </a>
      ) : (
        <a href="https://instagram.com">Open Web app</a>
      )}
      <button onClick={redirecttoNativeApp}>Click to go to doordash</button>
      <MetaMask />
    </div>
  );
};

export default WalletPage;
