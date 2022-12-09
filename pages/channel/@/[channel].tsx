import { GetServerSideProps } from "next";
import React from "react";
import MychannelPage from "../../../components/channel/my-channel/MyChannelPage";
import basedGetUrlRequest from "../../../utils/basedGetUrlRequest";

const VidioId = () => {
  return <MychannelPage />;
};

export default VidioId;
// export const getServerSideProps: GetServerSideProps = async (context) => {

//   let data = {};
//   const query = context.query;
//   const cookies = context.req.headers.cookie;
//   if (typeof cookies !== "undefined" && typeof query.channel !== "undefined") {
//     await basedGetUrlRequest(
//       "/api/get/channel/" + query.channel + "/" + cookies,
//       true
//     ).then((res) => {
//       data = res;
//     });
//   }

//   return {
//     props: { data },
//   };
// };
