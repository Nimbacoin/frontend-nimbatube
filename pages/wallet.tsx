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
      console.log("SD");
    }
  };
  const deconnect = async () => {
    try {
    } catch (erro) {
      await deactivate();
      console.log("SD");
    }
  };
  return (
    <div>
      {/* {injected} */}
      <button onClick={connect}>connect</button>
      <br />
      <button>not connect</button>
      <br />
      {active ? "active with" + account : "not connected"}
      <br />
      <button onClick={deconnect}>deconnect</button>
    </div>
  );
};

export default wallet;
