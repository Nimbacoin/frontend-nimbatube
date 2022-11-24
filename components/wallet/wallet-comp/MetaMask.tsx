import React from "react";
// import { injected } from "../utils/wallet-comp/connector";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../utils/wallet/connector";

const MetaMask = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const connect = async () => {
    try {
      await activate(injected);
    } catch (erro) {
      console.log("SD");
    }
  };
  connect();
  return <div></div>;
};

export default MetaMask;
