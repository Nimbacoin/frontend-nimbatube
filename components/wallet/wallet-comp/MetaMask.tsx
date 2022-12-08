import React, { useEffect, useState } from "react";
// import { injected } from "../utils/wallet-comp/connector";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../utils/wallet/connector";
import detectEthereumProvider from "@metamask/detect-provider";
import MetaMaskSDK from "@metamask/sdk";
import { MetaMaskInpageProvider } from "@metamask/providers";
import basedPostUrlRequestLogedIn from "../../../utils/basedPostUrlRequestLogedIn";
import { useSelector } from "react-redux";
import { initializeProvider } from "@metamask/providers";

const MetaMask = () => {
  const [accountId, setAccountId] = useState("");
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);

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
    // const MMSDK = new MetaMaskSDK({});
    // const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

    // const provider: any = window.ethereum.providers.find(
    //   (provider) => provider.isMetaMask
    // );
    // const provider = ethereum.providers.find(
    //   (provider: any) => provider.isMetaMask
    // );
    if (window.ethereum) {
      alert("yes");
    }
    // provider.request({});
    //{ method: "eth_requestAccounts" }
    // .then(async (rsl: any) => {
    //   console.log(rsl[0]);
    //   if (rsl && rsl?.length >= 1 && Channels && Channels?.length) {
    //     setAccountId(rsl[0]);
    //     const channelId = Channels[0]._id;
    //     const ReqData: any = { channelId, walletId: rsl[0] };
    //     await basedPostUrlRequestLogedIn(
    //       "/api/post/crypto/add-wallet",
    //       ReqData
    //     ).then((rslt) => {
    //       console.log(rslt);
    //     });
    //   }
    // });
    // connect();
    // setTimeout(() => {
    //   alert("time to desconnect ");
    //   desconnect();
    // }, 10000);
  }, []);

  return <div>{accountId}</div>;
};

export default MetaMask;
