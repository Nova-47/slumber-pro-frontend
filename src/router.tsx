import { createBrowserRouter } from "react-router-dom";

import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Reminder from "./routes/Services";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import ReminderConfirm from "./routes/ReminderConfirm";

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
        path: "service/reminder",
        element: <Reminder />,
      },
      {
        path: "service/reminder/Reconfirm",
        element: <ReminderConfirm />,
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
