import React from 'react';
import { AiFillEyeInvisible } from 'react-icons/ai';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';

function ClassSideBar({ menu, title, root, collapsed, setCollapsed }) {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <ProSidebar className='side-bar' collapsed={collapsed}>
      <SidebarHeader className='header d-flex justify-content-center'>
        <div className='my-3 fs-4 text-uppercase fw-bold'>{!collapsed ? title : null}</div>
      </SidebarHeader>
      <SidebarContent className='nav-bar-left'>
        <Menu iconShape='circle'>
          {menu?.map((item) => {
            if (item.children === undefined) {
              return (
                <MenuItem key={item.path} className='mb-3' icon={item.icon}>
                  <Link to={root ? `${root}/${item.path}` : item.path}>
                    {item.label}
                  </Link>
                </MenuItem>
              );
            } else {
              return (
                <SubMenu
                  title={item.label}
                  className='mb-3'
                  icon={item.icons}
                  key={item.path}
                >
                  {item?.children.map((submenu) => {
                    return (
                      <MenuItem
                        key={submenu.path}
                        icon={submenu.icon}
                        className='mb-2'
                      >
                        <Link to={root ? `${root}/${submenu.path}` : submenu.path}>
                          {submenu.label}
                        </Link>
                      </MenuItem>
                    );
                  })}
                </SubMenu>
              );
            }
          })}
          <MenuItem
            key='hide'
            className='mb-3'
            icon={<AiFillEyeInvisible />}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            Ẩn thanh bên
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu>
          <MenuItem icon={<CiLogout />}>
            <div onClick={handleLogout}>Đăng xuất</div>
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}

export default ClassSideBar;
