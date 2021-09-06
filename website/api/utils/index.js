import request from "utils/request";

const utilRequestUrls = {
  upload: "/file/upload",
};

export const uploadData = (parameter) => {
  let data = new FormData();

  data.append("files", parameter);
  return request
    .post(utilRequestUrls.upload, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    });
};
