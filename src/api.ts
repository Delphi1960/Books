import axios from 'axios';

export const getTokens = () => ({
  authorization: `Bearer ${localStorage.getItem("authToken")}`,
});

export const setTokens = (authToken: string) => {
  localStorage.setItem("authToken", authToken);
};

const responseType = "json";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "token-type": "Bearer",
};

function initApi() {
  axios.interceptors.request.use(
    (request) => {
      request.responseType = responseType;
      Object.assign(request.headers, {
        ...headers,
        ...getTokens(),
      });
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      if ("access-token" in response.headers) {
        setTokens(response.headers["access-token"]);
      }

      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export { initApi };
