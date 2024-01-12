import { classApi } from '@/api/class';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  Modal,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';
import { Form, useLocation, useParams } from 'react-router-dom';
import Profile from '@/assets/images/profile.png';
import { ToastWrapper } from '@/utils';
import GradePage from './GradePage';
import './style.css';
import ReviewPage from './ReviewPage';
import ClassInfoPage from './ClassInfoPage';

function DetailClassPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [show, setShow] = useState(false);
  const roles = {
    teacher: 'teacher',
    student: 'student',
  };
  const {
    state: { item },
  } = useLocation();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    classApi
      .getClassParticipants(item?.classId)
      .then((res) => {
        setParticipants(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  }, []);
  
  const handleInviteButton = () => {
    setLoading(true);
    classApi
      .inviteByEmail(email, item?.classId, role)
      .then((res) => {
        ToastWrapper('Thêm thành công', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        ToastWrapper('Thêm thất bại', 'error');
      })
      .finally(() => {
        setLoading(false);
        setShow(false);
      });
  };

  const handleClose = () => setShow(false);

  const handleAddButton = (role) => {
    setRole(role);
    setShow(true);
  }

  return (
    <>
      <Tabs
        defaultActiveKey='home'
        id='uncontrolled-tab-example'
        style={{
          height: '8vh',
        }}
      >
        <Tab eventKey='home' title='Thông tin lớp học'>
          <ClassInfoPage item={item}/>
        </Tab>
        <Tab
          eventKey='assignments'
          title='Bảng điểm'
        >
          <GradePage/>
        </Tab>
        <Tab
          eventKey='reviews'
          title='Xem lại'
        >
          <ReviewPage classId={item?.classId}/>
        </Tab>
        <Tab eventKey='participants' title='Thành viên'>
          <Container className='ms-5 mt-5'>
            <Row>
              <Col>
                <h1>Giáo viên</h1>
              </Col>
              <Col xs={3}>
                <Button
                  variant='outline-primary'
                  onClick={() => handleAddButton(roles.teacher)}
                >
                  Thêm giáo viên
                </Button>
              </Col>
              <hr />
            </Row>
            <Row>
              <Col>
                {participants?.teachers?.map((item, index) => {
                  return (
                    <div className='d-flex align-items-center mb-3' key={index}>
                      <img
                        src={Profile}
                        alt='avatar'
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                        }}
                      />
                      <div className='ms-3 fw-bold'>{item?.fullname}</div>
                      <div className='ms-3'>{item?.email}</div>
                    </div>
                  );
                })}
              </Col>
            </Row>
            <Row className='mt-5'>
              <Col>
                <h1>Học viên</h1>
              </Col>
              <Col xs={3}>
                <Button
                  variant='outline-primary'
                  onClick={() => handleAddButton(roles.student)}
                >
                  Thêm học viên
                </Button>
              </Col>
              <hr />
            </Row>
            <Row>
              <Col>
                {participants?.students?.map((item, index) => {
                  return (
                    <div className='d-flex align-items-center mb-3' key={index}>
                      <img
                        src={Profile}
                        alt='avatar'
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                        }}
                      />
                      <div className='ms-3 fw-bold'>{item?.fullname}</div>
                      <div className='ms-3'>{item?.email}</div>
                    </div>
                  );
                })}
              </Col>
            </Row>
            <Row>
              {item?.participants?.map((item, index) => {
                return (
                  <div className='d-flex align-items-center' key={index}>
                    <img
                      src={<Profile />}
                      alt='avatar'
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                      }}
                    />
                    <p className='ms-3'>{item?.fullname}</p>
                  </div>
                );
              })}
            </Row>
          </Container>
        </Tab>
      </Tabs>
      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleInviteButton();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Thêm {roles === roles.teacher ? 'giáo viên' : 'học viên'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <FormControl
                  type='email'
                  placeholder='Nhập địa chỉ email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Huỷ
            </Button>
            <Button variant='primary' type='submit' disabled={loading}>
              {loading ? 'Đang thêm...' : 'Thêm'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default DetailClassPage;
