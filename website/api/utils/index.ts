import request from "utils/request";

const utilRequestUrls = {
  upload: "/file/upload",
};

export const uploadData = (parameter: File) => {
  let uploadData = new FormData();

  uploadData.append("files", parameter);

  return request
    .post(utilRequestUrls.upload, uploadData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response: any) => {
      return {
        name: parameter.name,
        url: response.join(),
        fileUrl: response.join(),
      };
    });
};
