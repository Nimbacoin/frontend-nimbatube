import * as cookie from "cookie";
import { GetServerSideProps } from "next";
import React from "react";
import WatchHistoryPage from "../components/watch-history/WatchHistoryPage";
import basedGetUrlRequest from "../utils/basedGetUrlRequest";

const WatchHistory = () => {
  return <WatchHistoryPage />;
};

export default WatchHistory;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userD = context.req.headers.cookie;

  return {
    props: { data: {} },
  };
};
