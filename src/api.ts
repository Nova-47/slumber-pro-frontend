import Cookies from "js-cookie";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      `/users/github`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
