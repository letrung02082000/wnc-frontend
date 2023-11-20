import React from 'react';
import { Outlet } from 'react-router-dom';
import { PATH } from '../../constants/path';

function UserGuard({ children }) {
  if (!localStorage.getItem('user')) {
    window.location.href = PATH.AUTH.SIGNIN;
  }
  return <>{children}</>;
}

export default UserGuard;
