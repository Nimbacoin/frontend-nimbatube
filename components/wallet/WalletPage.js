import React, { useEffect } from "react";
import TopTitle from "../modals/TopTitle";
import Style from "../../styles/pages/wallet/wallet.module.css";
import { IoWalletOutline } from "@react-icons/all-files/io5/IoWalletOutline";
import { isAndroid, isIOS } from "react-device-detect";
import { useWeb3Modal } from "@web3modal/react";
import MetaMask from "./wallet-comp/MetaMask";
import { useMetaMask } from "metamask-react";
import { MetaMaskProvider } from "metamask-react";

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
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  useEffect(() => {
    if (window.ethereum && window.ethereum?.providerMap) {
      console.log(window.ethereum);
      window.ethereum?.providerMap.forEach((pa) => {
        console.log("providerMap", pa, pa.isCoinbaseWallet);
      });
    }
  });

  return (
    <div>sv</div>
  );
};

export default WalletPage;
