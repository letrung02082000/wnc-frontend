import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ClassSideBar from '../ClassSideBar';
import { CLASS_MENU } from '@/constants/menu';
import { Badge, Button, Card, ListGroup, Offcanvas } from 'react-bootstrap';
import { MdNotificationImportant } from 'react-icons/md';
import { classApi } from '@/api/class';
import { PATH } from '@/constants/path';
import { ToastWrapper } from '@/utils';

function ClassLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const NOTIFICATION_TYPE = {
    REPLY_REVIEW: 'reply to review',
    HAVE_REVIEW: 'have review',
    GRADE_FINALIZED: 'grade finalized',
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    classApi
      .getNotifications()
      .then((res) => {
        setNotifications(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => setShow(false);

  const handleDetailButton = (item) => {
    if (
      item?.type === NOTIFICATION_TYPE.HAVE_REVIEW ||
      item?.type === NOTIFICATION_TYPE.REPLY_REVIEW
    ) {
      let url = PATH.CLASS.REVIEW.replace(':classId', item?.classId);
      url = url.replace(':reviewId', item?.reviewId);
      window.location.href = url;
    } else if (item?.type === NOTIFICATION_TYPE.GRADE_FINALIZED) {
      let url = PATH.CLASS.GRADE.replace(':classId', item?.classId);
      window.location.href = url;
    }
  };

  const handleReadNotification = (notiId) => {
    classApi
      .readNotification(notiId)
      .then((res) => {
        ToastWrapper('Đã đánh dấu thông báo đã đọc', 'success');
        fetchNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <Button
        variant='primary'
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
        }}
        onClick={() => setShow(true)}
      >
        <MdNotificationImportant />{' '}
        <Badge bg='danger'>{notifications.length}</Badge>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Thông báo gần đây</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {notifications.map((item, index) => {
            return (
              <Card key={item?.notiId} className='mb-2'>
                <Card.Body>
                  <Card.Title>
                    Thông báo #{item?.notiId}: lớp {item?.name}
                  </Card.Title>
                  {NOTIFICATION_TYPE.HAVE_REVIEW === item?.type && (
                    <Card.Text>Xem xét mới</Card.Text>
                  )}
                  {NOTIFICATION_TYPE.REPLY_REVIEW === item?.type && (
                    <Card.Text>Phản hồi mới</Card.Text>
                  )}
                  {NOTIFICATION_TYPE.GRADE_FINALIZED === item?.type && (
                    <Card.Text>Điểm số mới</Card.Text>
                  )}
                  <div className='d-flex justify-content-between'>
                    {item?.isRead ? (
                      <Button variant='secondary' disabled>Đã đọc</Button>
                    ) : (
                      <Button
                        variant='outline-primary'
                        onClick={() => handleReadNotification(item?.notiId)}
                      >
                        Đánh dấu đã đọc
                      </Button>
                    )}
                    <Button
                      variant='primary'
                      onClick={() => handleDetailButton(item)}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </Suspense>
  );
}

export default ClassLayout;
