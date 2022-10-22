import basedGetUrlRequest from "./basedGetUrlRequest";

const allVideosFetch = async (Length: any) => {
  if (Length) {
    return await basedGetUrlRequest("/api/get/video/display/" + Length, false);
  } else {
    return await basedGetUrlRequest("/api/get/video/display/" + 0, false);
  }
};

export default allVideosFetch;
