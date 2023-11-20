import React, { Suspense } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { PATH } from '../../constants/path';

function MainLayout() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar expand='lg' className='bg-body-tertiary'>
          <Container>
            <Navbar.Brand href='/'>WNC</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto w-100'>
                <div className='d-flex justify-content-between w-100'>
                  <div>
                    <Nav.Link href='/'>Trang chủ</Nav.Link>
                  </div>
                  <div className='d-flex'>
                    <Nav.Link>
                      <Link to={PATH.AUTH.SIGNUP}>Đăng ký</Link>
                    </Nav.Link>{' '}
                    <Nav.Link>
                      <Link to={PATH.AUTH.SIGNIN}>Đăng nhập</Link>
                    </Nav.Link>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </Suspense>
    </>
  );
}

export default MainLayout;
