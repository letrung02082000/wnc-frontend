import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminGuard() {
  return <Outlet />;
}

export default AdminGuard;
