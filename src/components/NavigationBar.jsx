import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PATH } from '../constants/path';
import { useRecoilState } from 'recoil';
import { userState } from '../state';

function NavigationBar() {
  const [user, setUser] = useRecoilState(userState);
  const isLogin = user?.access_token ? true : false;

  const handleLogoutButton = () => {
    setUser({});
    localStorage.removeItem('user');
    location.reload();
  };

  return (
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
                      <Link
                        to={PATH.AUTH.SIGNIN}
                        className='btn btn-primary fw-bold'
                      >
                        Đăng nhập
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link
                        to={PATH.AUTH.SIGNUP}
                        className='btn btn-outline-primary fw-bold'
                      >
                        Đăng ký
                      </Link>
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link>
                      <Link to={PATH.USER.PROFILE}>{user?.email}</Link>
                    </Nav.Link>{' '}
                    <Nav.Link onClick={handleLogoutButton}>Đăng xuất</Nav.Link>
                  </>
                )}
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
