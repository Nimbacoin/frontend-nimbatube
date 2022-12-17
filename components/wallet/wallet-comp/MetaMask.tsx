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

  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);

  useEffect(() => {
    (async () => {
      const MMSDK = new MetaMaskSDK({});
      const ethereum = MMSDK.getProvider();

      // const provider: any = window.ethereum.providers.find(
      //   (provider) => provider.isMetaMask
      // );
      // const provider = ethereum.providers.find(
      //   (provider: any) => provider.isMetaMask
      // );
      // const provider = await window.ethereum.providers.find(
      //   (provider) => provider.isMetaMask
      // );

      ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (rsl: any) => {
          if (rsl && rsl?.length >= 1 && Channels && Channels?.length) {
            setAccountId(rsl[0]);
            const channelId = Channels[0]._id;
            const ReqData: any = { channelId, walletId: rsl[0] };
            await basedPostUrlRequestLogedIn(
              "/api/post/crypto/add-wallet",
              ReqData
            ).then((rslt) => {});
          }
        });
    })();
  }, []);

  return <div>{accountId}</div>;
};

export default MetaMask;
