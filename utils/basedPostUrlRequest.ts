import React from "react";
interface EnumServiceGetOrderBy {
  email: string;
  password: string;
}

const basedPostUrlRequest = async (
  url: string,
  dataBody: EnumServiceGetOrderBy
) => {
  console.log(dataBody);
  const response = await fetch("http://localhost:5000" + url, {
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
