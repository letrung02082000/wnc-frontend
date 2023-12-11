import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ClassSideBar from '../ClassSideBar';
import { CLASS_MENU } from '@/constants/menu';

function ClassLayout() {
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
        <ClassSideBar
          title={'Lớp học'}
          menu={CLASS_MENU}
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

export default ClassLayout;
