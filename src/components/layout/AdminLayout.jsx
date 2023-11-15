import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return <>
    <Suspense fallback={<div>Loading...</div>}>
        <Outlet/>
    </Suspense>
  </>;
}

export default AdminLayout;
