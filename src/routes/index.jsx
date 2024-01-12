import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../features/404';
import { PATH } from '../constants/path';
import HomePage from '../features/home';
import AdminLayout from '../components/layout/AdminLayout';
import MainLayout from '../components/layout/MainLayout';
import AdminGuard from '../components/guard/AdminGuard';
import MainGuard from '../components/guard/MainGuard';
import AdminPage from '../features/admin';
import {
  SignInPage,
  SignUpPage,
  ForgotPasswordPage,
  ActivationPage,
} from '../features/auth';
import { ProfilePage } from '../features/user';
import UserGuard from '../components/guard/UserGuard';
import ClassLayout from '@/components/layout/ClassLayout';
import UserLayout from '@/components/layout/UserLayout';
import MyClassPage from '@/features/class/pages/MyClassPage';
import JoinedClassPage from '@/features/class/pages/JoinedClassPage';
import JoinClassPage from '@/features/class/pages/JoinClassPage';
import CreateClassPage from '@/features/class/pages/CreateClassPage';
import DetailClassPage from '@/features/class/pages/DetailClassPage';
import AccountManagementPage from '@/features/admin/pages/AccountManagementPage';
import ClassManagementPage from '@/features/admin/pages/ClassManagementPage';
import GradePage from '@/features/class/pages/GradePage';

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
            path: PATH.AUTH.ACTIVATION,
            element: <ActivationPage />,
          },
          {
            path: PATH.AUTH.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: PATH.AUTH.SIGNUP,
            element: <SignUpPage />,
          },
          {
            path: PATH.AUTH.GOOGLE,
            element: <SignInPage />,
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
          {
            path: PATH.ADMIN.USER,
            element: <AccountManagementPage />,
          },
          {
            path: PATH.ADMIN.CLASS,
            element: <ClassManagementPage />,
          },
        ],
      },
    ],
  },
  {
    path: PATH.USER.ROOT,
    element: <UserGuard />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            path: PATH.USER.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: PATH.CLASS.ROOT,
    element: <UserGuard />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ClassLayout />,
        children: [
          {
            path: PATH.CLASS.ME,
            element: <MyClassPage />,
          },
          {
            path: PATH.CLASS.JOINED,
            element: <JoinedClassPage />,
          },
          {
            path: PATH.CLASS.JOIN,
            element: <JoinClassPage />,
          },
          {
            path: PATH.CLASS.CREATE,
            element: <CreateClassPage />,
          },
          {
            path: PATH.CLASS.DETAIL,
            element: <DetailClassPage />,
          },
          {
            path: PATH.CLASS.GRADE,
            element: <GradePage />,
          }
        ],
      },
    ],
  },
]);

export default router;
