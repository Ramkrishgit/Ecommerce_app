import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';

export const ProtectedRoute = (props) => {
  const token = localStorage.getItem('ECOMM_TOKEN');
  if (!!token == false) return <Navigate to='/login' />
  return props.component;
}

export const PublicRoute = (props) => {
  const token = localStorage.getItem('ECOMM_TOKEN');
  if (token) return <Navigate to='/Dashboard' />
  return props.component;
}
function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <PublicRoute component={<Login />} />
    },
    {
      path: '/signup',
      element: <PublicRoute component={<Signup />} />
    },

    {
      path: '/',
      element: <PublicRoute component={<Signup />} />
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute component={<Dashboard />} />
    }

  ]);
  return (
    <>
      <div>
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
