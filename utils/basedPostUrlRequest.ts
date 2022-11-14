import Cookies from "js-cookie";
import React from "react";
interface EnumServiceGetOrderBy {
  email: string;
  password: string;
  Cookies: any;
}

const basedPostUrlRequest = async (
  url: string,
  dataBody: EnumServiceGetOrderBy
) => {
  console.log(document.cookie);
  const response = await fetch(process.env.NEXT_PUBLIC_BACK_END_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(dataBody),
  });
  const data = await response.json();
  return data;
};

export default basedPostUrlRequest;
