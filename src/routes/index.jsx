import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../features/404';
import { PATH } from '../constants/path';
import HomePage from '../features/home';
import AdminLayout from '../components/layout/AdminLayout';
import MainLayout from '../components/layout/MainLayout';
import AdminGuard from '../components/guard/AdminGuard';
import MainGuard from '../components/guard/MainGuard';
import AdminPage from '../features/admin';
import { SignInPage, SignUpPage } from '../features/auth';
import { ProfilePage } from '../features/user';
import UserGuard from '../components/guard/UserGuard';

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <MainGuard />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: PATH.AUTH.SIGNIN,
            element: <SignInPage />,
          },
          {
            path: PATH.AUTH.SIGNUP,
            element: <SignUpPage />,
          },
          {
            path: PATH.USER.PROFILE,
            element: (
              <UserGuard>
                <ProfilePage />
              </UserGuard>
            ),
          },
        ],
      },
    ],
  },
  {
    path: PATH.ADMIN.ROOT,
    element: <AdminGuard />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: '',
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
