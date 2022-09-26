import * as cookie from "cookie";
import { GetServerSideProps } from "next";
import React from "react";
import WatchHistoryPage from "../components/watch-history/WatchHistoryPage";
import basedGetUrlRequest from "../utils/basedGetUrlRequest";

const WatchHistory = ({ data }: any) => {
  return <WatchHistoryPage VideosData={data} />;
};

export default WatchHistory;
export const getServerSideProps: GetServerSideProps = async (context) => {
  let data: any = [];

  const userD = context.req.headers.cookie;
  let userRer: any = {};
  if (userD) {
    userRer = cookie.parse(userD);
  }

  await basedGetUrlRequest(
    "/api/get/video/history-video/" + userRer.user,
    false
  ).then(async (res) => {
    if (res?.responseData) {
      data = res.responseData;
    }
  });

  return {
    props: { data: data },
  };
};
