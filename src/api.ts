import Cookies from "js-cookie";
import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.circadias.xyz/api/v1/",
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

export const usernameLogin = ({
  username,
  password,
}: IUsernameLoginVariables) =>
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
  location,
  title,
  payload,
  reminder_time,
  repeat,
}: {
  kind: string;

  location: string;
  title: string;
  payload: string;
  reminder_time: number;
  repeat: boolean;
}) =>
  instance
    .post(
      `/reminders/`,
      { kind, location, title, payload, reminder_time, repeat },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const deleteReminder = (pk: number) =>
  instance
    .delete(`/reminders/${pk}`, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getReminders = () =>
  instance.get(`/reminders`).then((response) => response.data);

export const getReminder = (pk: number) =>
  instance
    .get(`/reminders/${pk}`, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const updateReminder = (
  pk: number,
  data: Partial<{
    title: string;
    payload: string;
    kind: string;
    repeat: boolean;
  }>
) =>
  instance
    .put(`/reminders/${pk}`, data, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const updateMe = (data: { name: string; email: string }) =>
  instance
    .put(`/users/me/`, data, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
