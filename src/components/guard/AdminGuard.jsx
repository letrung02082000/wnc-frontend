import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminGuard() {
  if (!localStorage.getItem('user')) {
    window.location.href = PATH.AUTH.SIGNIN;
  }
  
  return <Outlet />;
}

export default AdminGuard;
