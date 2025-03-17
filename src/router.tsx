import { createBrowserRouter } from "react-router-dom";

import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Reminder from "./routes/Services";
import GithubConfirm from "./routes/GithubConfirm";

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
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
        ],
      },
    ],
  },
]);
export default router;
