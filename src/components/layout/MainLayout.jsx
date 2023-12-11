import React, { Suspense } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { PATH } from '../../constants/path';
import NavigationBar from '../NavigationBar';

function MainLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavigationBar />
      <Outlet />
    </Suspense>
  );
}

export default MainLayout;
