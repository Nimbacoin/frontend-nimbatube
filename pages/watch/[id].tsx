import { GetServerSideProps } from "next";
import React from "react";
import WatchPage from "../../components/watch/WatchPage";
import basedGetUrlRequest from "../../utils/basedGetUrlRequest";

const VidioId = ({ data }: any) => {
  //MainVideoDataReducer
  return <WatchPage VideoData={data} />;
};

export default VidioId;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let data = {};
  console.log(query);
  await basedGetUrlRequest(
    "/api/get/video/" + query.video + "/" + "1232223923020290230923",
    true
  ).then((res) => {
    data = res;
  });

  return {
    props: { data },
  };
};
