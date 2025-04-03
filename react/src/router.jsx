import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/login";
import Signup from "./views/signup";
import Users from "./views/users";
import UserForm from "./views/userForm";

import Dashboard from "./views/dashboard";
import Notfound from "./views/notfound";
import DefaultLayout from "./components/defaultLayout";
import GuestLayout from "./components/guestLayout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path:'/users',
        element:<Users />
      },
      {
        path:'/users/new',
        element:<UserForm key={'createUser'}/>
      },
      {
        path:'/users/:id',
        element:<UserForm key={'updateUser'}/>
      },
    ]
  },

  {
    path: '/',
    element: <GuestLayout />,
    children:[
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },

  {
    path: '*',
    element: <Notfound />
  },
])

export default router;
