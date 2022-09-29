import Cookies from "js-cookie";
import React from "react";
interface EnumServiceGetOrderBy {
  email: string;
  password: string;
}

const basedDeleteUrlRequestLogedIn = async (
  url: string,
  dataBody: EnumServiceGetOrderBy
) => {
  const UserCookie = Cookies.get("user");
  console.log(UserCookie);
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACK_END_URL + url + UserCookie,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(dataBody),
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export default basedDeleteUrlRequestLogedIn;
