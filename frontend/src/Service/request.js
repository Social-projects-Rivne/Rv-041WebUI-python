async function request(params) {
  const { url, header, body, method } = params;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...header,
    "x-auth-token": token
  };
  const reqMethod = method || "GET";
  const rootUrl = "http://localhost:6543/api";
  return fetch(rootUrl + url, {
    method: reqMethod,
    headers,
    body
  })
    .then(
      response => {
        return {
          ...response.json().then(data => data),
          statusCode: response.status_code
        };
      },
      {
        data: [],
        success: false,
        error: "Something went wrong..."
      }
    )
    .catch(error => {
      return {
        data: [],
        success: false,
        error: error.message,
        statusCode: 500
      };
    });
}

export default request;
