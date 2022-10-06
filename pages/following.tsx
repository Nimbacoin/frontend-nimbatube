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

  return {
    props: { data: data },
  };
};
