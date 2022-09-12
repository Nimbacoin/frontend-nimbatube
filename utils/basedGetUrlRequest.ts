import React from "react";
import Cookies from "js-cookie";

const basedGetUrlRequest = async (url: string, credentials: boolean) => {
  const UserCookie = Cookies.get("user");

  if (url !== "") {
    if (credentials) {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACK_END_URL + url + "/" + UserCookie,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        return null;
      }
    } else {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACK_END_URL + url,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        return null;
      }
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
