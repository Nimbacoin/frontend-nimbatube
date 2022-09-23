import { GetServerSideProps } from "next";
import React from "react";
import FollowingPage from "../components/following/FollowingPage";
import basedGetUrlRequestLogedIn from "../utils/basedGetUrlRequestLogedIn";
import * as cookie from "cookie";
import basedGetUrlRequest from "../utils/basedGetUrlRequest";

const Following = ({ data }: any) => {
  return <FollowingPage ChannelsData={data} />;
};

export default Following;
export const getServerSideProps: GetServerSideProps = async (context) => {
  let data: any = [];
  console.log(data);
  const userD = context.req.headers.cookie;
  let userRer: any = {};
  if (userD) {
    userRer = cookie.parse(userD);
  }
  console.log(userRer.user);
  await basedGetUrlRequest(
    "/api/get/channel/following-channels/" + userRer.user,
    false
  ).then(async (res) => {
    console.log(res);
    if (res.responsData) {
      data = await res.responsData;
    }
  });

  return {
    props: { data: data },
  };
};
