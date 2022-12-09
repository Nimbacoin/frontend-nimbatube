import React, { useRef, useEffect, useState } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const CoinBase = () => {
  const APP_NAME = "My Awesome App";
  const [askUser, setAskUser] = useState(false);
  const APP_LOGO_URL = "https://example.com/logo.png";

  const DEFAULT_ETH_JSONRPC_URL =
    "https://mainnet.infura.io/v3/<YOUR_INFURA_API_KEY>";

  const DEFAULT_CHAIN_ID = 1;

  const connect = () => {
    setAskUser(true);
  };
  useEffect(() => {
    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
      darkMode: false,
    });
    var ethereum = coinbaseWallet.makeWeb3Provider(
      DEFAULT_ETH_JSONRPC_URL,
      DEFAULT_CHAIN_ID
    );

    if (askUser) {
      //   ethereum
      //     .request({ method: "eth_requestAccounts" })
      //     .then((response) => {});
      ethereum.request({ method: "eth_requestAccounts" });
    }
  }, [askUser]);
  useEffect(() => {
    connect();
  }, []);
  return (
    <div>
      <button>connect coinbase</button>
    </div>
  );
};

export default CoinBase;
