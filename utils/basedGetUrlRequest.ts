import React from "react";

const BasedUrlRequest = async (url: string) => {
  const response = await fetch("http://localhost:3000" + url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export default BasedUrlRequest;
