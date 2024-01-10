import React, { useState } from 'react';
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PATH } from '../constants/path';
import { useRecoilState } from 'recoil';
import { userState } from '../state';

function NavigationBar() {
  const [user, setUser] = useRecoilState(userState);
  const [canvasShow, setCanvasShow] = useState(false);
  const isLogin = user?.access_token ? true : false;

  const handleLogoutButton = () => {
    setUser({});
    localStorage.removeItem('user');
    location.reload();
  };

  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='/'>WNC</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto w-100'>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <div>
                  <Nav.Link href='/'>Trang chủ</Nav.Link>
                </div>
                <div className='d-flex'>
                  {!isLogin ? (
                    <>
                      <Nav.Link>
                        <Link to={PATH.AUTH.SIGNIN} className='btn btn-primary'>
                          Đăng nhập
                        </Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Link
                          to={PATH.AUTH.SIGNUP}
                          className='btn btn-outline-primary'
                        >
                          Đăng ký
                        </Link>
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link>
                        <Link
                          className='btn btn-outline-primary'
                          to={PATH.CLASS.ME}
                        >
                          Quản lý lớp học
                        </Link>
                      </Nav.Link>
                      <Nav.Link>
                        <Button onClick={() => setCanvasShow(true)}>
                          Quản lý tài khoản
                        </Button>
                      </Nav.Link>
                    </>
                  )}
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
            <Link className='btn btn-outline-primary my-2' to={PATH.USER.PROFILE}>Cập nhật thông tin</Link>
            <Button onClick={handleLogoutButton} className='my-2'>Đăng xuất</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavigationBar;
