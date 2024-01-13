import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar';
import { ADMIN_MENU } from '@/constants/menuAdmin';

function AdminLayout() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
        }}
      >
        <AdminSideBar
          title={'Admin'}
          menu={ADMIN_MENU}
          collapsed={collapsed}
          setCollapsed={() => setCollapsed(!collapsed)}
        />
        <div
          style={{
            width: '100%',
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
}

export default AdminLayout;
