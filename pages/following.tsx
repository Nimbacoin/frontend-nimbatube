import { GetServerSideProps } from "next";
import React from "react";
import FollowingPage from "../components/following/FollowingPage";
import basedGetUrlRequestLogedIn from "../utils/basedGetUrlRequestLogedIn";

const Following = () => {
  return <FollowingPage />;
};

export default Following;
export const getServerSideProps: GetServerSideProps = async (context) => {
  let data = {};
  console.log(data);
  await basedGetUrlRequestLogedIn("/api/get/channel/following-channels/").then(
    (res) => {
      console.log("data", data);
      data = res;
    }
  );

  return {
    props: { data },
  };
};
