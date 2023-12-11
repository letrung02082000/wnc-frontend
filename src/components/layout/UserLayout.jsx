import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../NavigationBar';

function UserLayout() {
  return <>
    <Suspense fallback={<div>Loading...</div>}>
        <NavigationBar/>
        <Outlet/>
    </Suspense>
  </>;
}

export default UserLayout;
