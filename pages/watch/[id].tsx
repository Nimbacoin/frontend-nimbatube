import { GetServerSideProps } from "next";
import React from "react";
import WatchPage from "../../components/watch/WatchPage";
import basedGetUrlRequest from "../../utils/basedGetUrlRequest";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";

const VidioId = ({ data }: any) => {
  //MainVideoDataReducer
  return <WatchPage VideoData={data} />;
};

export default VidioId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data = {};

  const query = context.query;
  const cookies = context.req.headers.cookie;
  await basedGetUrlRequest(
    "/api/get/video/" +
      query.video +
      "/" +
      "1232223923020290230923" +
      "/" +
      cookies,
    true
  ).then((res) => {
    data = res;
  });

  return {
    props: { data },
  };
};
