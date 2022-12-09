import React from "react";
import { injected } from "../utils/wallet/connector";
import { useWeb3React } from "@web3-react/core";

const wallet = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const connect = async () => {
    try {
      await activate(injected);
    } catch (erro) {
    }
  };
  const deconnect = async () => {
    try {
    } catch (erro) {
      await deactivate();
    }
  };
  return (
    <div>
      <button onClick={connect}>connect metamask</button>
      <br />
    </div>
  );
};

export default wallet;
