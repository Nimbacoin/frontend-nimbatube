import React from "react";

const basedGetUrlRequest = async (url: string) => {
  if (url !== "") {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACK_END_URL + url, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  } else {
    const response = await fetch(process.env.NEXT_PUBLIC_BACK_END_URL!, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
};

export default basedGetUrlRequest;
