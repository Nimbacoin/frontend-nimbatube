import React from "react";

const BasedUrlRequest = async (url: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACK_END_URL + url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export default BasedUrlRequest;
