import React from "react";
import Home from "./pages/submit-code/Home";
import { useRoutes } from "react-router-dom";
import DefaultLayout from "./layouts/defaul-layout/DefaultLayout";
import Problems from "./pages/problems/Problems";
import Contest from "./pages/contest/Contest";
import BackGroundHome from "./pages/home/BackGroundHome";
import Login from "./pages/auth/Login";
import AdminPage from "./layouts/admin";
import AdminProblem from "./layouts/admin/admin-problem/AdminProblem";
import AdminTestCase from "./layouts/admin/admin-testcase/AdminTestCase";
import AdminContest from "./layouts/admin/admin-contest/AdminContest";
import AdminUser from "./layouts/admin/admin-user/AdminUser";
import Signup from "./pages/auth/Signup";
import RequiredAuth from "./components/required-auth/RequiredAuth";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: (
        <RequiredAuth>
          <DefaultLayout />
        </RequiredAuth>
      ),
      children: [
        {
          path: "/",
          element: <BackGroundHome />,
        },
        {
          path: "/problem/:id",
          element: <Home />,
        },
        {
          path: "problems",
          element: <Problems />,
        },
        {
          path: "contest/:id",
          element: <Problems />,
        },
        {
          path: "contest",
          element: <Contest />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <RequiredAuth>
          <AdminPage />
        </RequiredAuth>
      ),
      children: [
        {
          path: "problem",
          element: <AdminProblem />,
        },
        {
          path: "contest",
          element: <AdminContest />,
        },
        {
          path: "testcase",
          element: <AdminTestCase />,
        },
        {
          path: "user",
          element: <AdminUser />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <Signup />,
    },
  ]);

  return element;
};

export default App;
