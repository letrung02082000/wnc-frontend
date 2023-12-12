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

function DetailClassPage() {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
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
        console.log('done');
      });
  }, []);

  const handleInviteButton = () => {
    console.log(email, role);
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

  const handleCopyButton = () => {
    navigator.clipboard.writeText(window.location.hostname + '/join?id=' + item?.classId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <>
      <Tabs
        defaultActiveKey='home'
        id='uncontrolled-tab-example'
        className='mb-3'
      >
        <Tab eventKey='home' title='Thông tin lớp học'>
          <Container>
            <Row className='fw-bold'>
              <Col>
                <Row>
                  <Col>Mã lớp học: #{item?.classId}</Col>
                  <Col xs={4}>
                    <Button
                      onClick={handleCopyButton}
                      variant='outline-primary'
                      className='w-100'
                    >
                      {copied ? 'Đã' : 'Sao'} chép liên kết tham gia lớp học
                    </Button>
                  </Col>
                </Row>
              </Col>
              <p>Tên lớp học: {item?.name}</p>
              <p>Giáo viên: {item?.fullname}</p>
              <p>Phần học: {item?.part}</p>
              <p>Chủ đề: {item?.topic}</p>
              <p>Mã phòng: {item?.room}</p>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey='assignments' title='Bài tập'>
          <p className='fw-bold text-center'>Bạn chưa có bài tập nào được giao!</p>
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
