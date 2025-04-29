import { createBrowserRouter } from "react-router-dom";

import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Reminder from "./routes/Services";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import Profile from "./routes/Profile";
import MyReminders from "./routes/MyReminders";
import ReminderDetail from "./routes/ReminderDetail";
import ReminderEdit from "./routes/ReminderEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/my-reminders",
        element: <MyReminders />,
      },
      {
        path: "profile/my-reminders/:id",
        element: <ReminderDetail />,
      },
      {
        path: "profile/my-reminders/:id/edit",
        element: <ReminderEdit />,
      },
      {
        path: "service/reminder",
        element: <Reminder />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);
export default router;
