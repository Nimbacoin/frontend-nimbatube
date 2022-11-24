import React, { useEffect } from "react";
// import { injected } from "../utils/wallet-comp/connector";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../utils/wallet/connector";
import detectEthereumProvider from "@metamask/detect-provider";
import MetaMaskSDK from "@metamask/sdk";
import { MetaMaskInpageProvider } from "@metamask/providers";

const MetaMask = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const connect = async () => {
    const provider = await detectEthereumProvider();

    try {
      await activate(injected);
    } catch (erro) {
      console.log("SD");
    }
  };
  const desconnect = async () => {
    try {
      await deactivate();
    } catch (erro) {
      console.log("SD");
    }
  };

  useEffect(() => {
    const MMSDK = new MetaMaskSDK({});
    const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

    // const provider = window.ethereum.providers.find(
    //   (provider) => provider.isMetaMask
    // );
    const provider = ethereum.providers.find(
      (provider: any) => provider.isMetaMask
    );

    provider.request({ method: "eth_requestAccounts" });
    // connect();
    // setTimeout(() => {
    //   alert("time to desconnect ");
    //   desconnect();
    // }, 10000);
  }, []);

  return <div>d</div>;
};

export default MetaMask;
