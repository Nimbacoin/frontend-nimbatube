import basedGetUrlRequest from "./basedGetUrlRequest";

const allVideosFetch = async () => {
  return await basedGetUrlRequest("/api/get/video/display");
};

export default allVideosFetch;
