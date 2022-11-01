import React from "react";
import Home from "./pages/submit-code/Home";
import { useRoutes } from "react-router-dom";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    // {
    //   path: 'login',
    //   element: <Login />,
    // },
    // {
    //   path: 'forgot-password',
    //   element: <ForgetPassword />,
    // },
    // {
    //   path: '/',
    //   element: (
    //     <RequireAuth>
    //       <LayoutDefault />
    //     </RequireAuth>
    //   ),
    //   children: [
    //     {
    //       path: '/',
    //       element: <Home />,
    //     },
    //     {
    //       path: '/class',
    //       element: <Class />,
    //     },
    //     {
    //       path: '/user',
    //       element: <User />,
    //     },
    //   ],
    // },
    // {
    //   path: '/class/:id',
    //   element: (
    //     <RequireAuth>
    //       <LayoutDetailClass />
    //     </RequireAuth>
    //   ),
    // },
  ]);

  return element;
};

export default App;
