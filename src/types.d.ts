export interface IUser {
  last_login: string;
  username: string;
  email: string;
  date_joined: string;
  avatar: string;
  name: string;
  is_pro: boolean;
  gender: string;
  language: string;
  currency: string;
}

export interface IPrivateUser {
  name: string;
  avatar: string;
  gender: string;
  language: string;
  currency: string;
}

export const getMe = () =>
  instance.get(`/users/me`).then((response) => response.data);

export const updateMe = (data: Partial<IPrivateUser>) =>
  instance
    .put(`/users/me`, data, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
