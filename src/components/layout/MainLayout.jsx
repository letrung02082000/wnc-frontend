import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return <>
    <Suspense fallback={<div>Loading...</div>}>
        <Outlet/>
    </Suspense>
  </>;
}

export default MainLayout;
