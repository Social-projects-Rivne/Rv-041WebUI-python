async function request(params) {
  const { url, header, body, method } = params;
  const headers = {
    "Content-Type": "application/json",
    ...header
  };
  const reqMethod = method ? "GET" : method;
  const rootUrl = "http://localhost:6543/api";
  return fetch(rootUrl + url, {
    method: reqMethod,
    headers,
    body
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}

export default request;
