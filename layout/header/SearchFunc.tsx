import Reract from "react";
import basedPostUrlRequest from "../../utils/basedPostUrlRequest";

const SearchFunc = async (dataBody: any) => {
  const body: any = { searchData: dataBody };
  await basedPostUrlRequest("/api/post/search/searching", body).then(
    (searchData) => {
      if (searchData) {
      }
    }
  );
};

export default SearchFunc;
