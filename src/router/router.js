import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
  import App from "../App";
  import Authorization from "../components/Authorization";

  const router = createBrowserRouter([
    {
        path: "/",
        element: <Authorization/>,
    },
    {
        path: "chats",
        element: <App/>,
    },
  ]);

  export default router;