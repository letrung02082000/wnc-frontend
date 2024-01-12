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
import { MdAccountCircle } from 'react-icons/md';
import { Button, Form, Offcanvas } from 'react-bootstrap';
import { userState } from '@/state';
import { useRecoilState } from 'recoil';
import { PATH } from '@/constants/path';

function ClassSideBar({ menu, title, root, collapsed, setCollapsed }) {
  const [user, setUser] = useRecoilState(userState);
  const [canvasShow, setCanvasShow] = React.useState(false);
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <ProSidebar className='side-bar' collapsed={collapsed}>
      <SidebarHeader className='header d-flex justify-content-center'>
        <div className='my-3 fs-4 text-uppercase fw-bold'>
          {!collapsed ? title : null}
        </div>
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
                        <Link
                          to={root ? `${root}/${submenu.path}` : submenu.path}
                        >
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
          <MenuItem icon={<MdAccountCircle />}>
            <div onClick={() => setCanvasShow(true)}>Tài khoản</div>
          </MenuItem>
        </Menu>
      </SidebarFooter>
      <Offcanvas
        show={canvasShow}
        onHide={() => setCanvasShow(false)}
        placement='end'
      >
        <Offcanvas.Header closeButton>
          <div className='d-flex flex-column'>
            <Offcanvas.Title>Xin chào {user?.fullname}</Offcanvas.Title>
            <Form.Text>{user?.email}</Form.Text>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='d-flex flex-column'>
            <Link
              className='btn btn-outline-primary my-2'
              to={PATH.USER.PROFILE}
            >
              Cập nhật thông tin
            </Link>
            <Button onClick={handleLogout} className='my-2'>
              Đăng xuất
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </ProSidebar>
  );
}

export default ClassSideBar;
