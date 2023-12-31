import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar';

function AdminLayout() {
  return <>
    <Suspense fallback={<div>Loading...</div>}>
        <AdminSideBar/>
        <Outlet/>
    </Suspense>
  </>;
}

export default AdminLayout;
