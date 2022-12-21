import React, { useRef, useEffect, useState } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { useWeb3React } from "@web3-react/core";

const CoinBase = () => {
  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    appName: "Web3-react Demo",
    supportedChainIds: [56],
  });
  const { activate, deactivate } = useWeb3React();

  return (
    <div>
      <button
        onClick={() => {
          activate(CoinbaseWallet);
        }}
      >
        Coinbase Wallet
      </button>
    </div>
  );
};

export default CoinBase;
