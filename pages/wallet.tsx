import * as cookie from "cookie";
import { GetServerSideProps } from "next";
import React from "react";
import WalletPage from "../components/wallet/WalletPage";
import basedGetUrlRequest from "../utils/basedGetUrlRequest";

const wallet = () => {
  return <WalletPage />;
};

export default wallet;
