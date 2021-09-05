import axios from "axios";
import request from "utils/request";

const utilRequestUrls = {
  upload: "/file/upload",
};

export const uploadData = (parameter: File[]) => {
  return request
    .post(utilRequestUrls.upload, parameter, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    });
};
