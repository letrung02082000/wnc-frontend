import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { PATH } from '../../constants/path';

function HomePage() {
  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='#'>WNC</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto w-100'>
            <div className='d-flex justify-content-between w-100'>
              <div>
                <Nav.Link href='#'>Trang chủ</Nav.Link>
              </div>
              <div className='d-flex'>
                <Nav.Link>
                  <Link to={PATH.AUTH.SIGNUP}>Đăng ký</Link>
                </Nav.Link>{' '}
                <Nav.Link>
                  <Link to={PATH.AUTH.SIGNUP}>Đăng nhập</Link>
                </Nav.Link>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomePage;
