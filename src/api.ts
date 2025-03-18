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

export const kakaoLogin = (code: string) =>
  instance
    .post(
      `/users/kakao`,
      { code },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoTest = () =>
  instance
    .post(`/users/testkakao`, null, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.status);

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}
export interface IusernameLoginSuccess {
  ok: string;
}
export interface IusernameLoginError {
  error: string;
}

export const usernameLogin = ({ username, password }: any) =>
  instance
    .post(
      `/users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export interface IUsernameSignUpVariables {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const usernameSignUp = ({
  name,
  email,
  username,
  password,
}: IUsernameSignUpVariables) =>
  instance
    .post(
      `/users/sign-up`,
      { name, email, username, password },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const reminderSubmit = ({
  kind,
  method_id,
  location,
  title,
  payload,
  reminder_time,
  repeat,
}: any) =>
  instance
    .post(
      `/reminders/`,
      { kind, method_id, location, title, payload, reminder_time, repeat },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
