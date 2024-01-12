import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import ReviewModal from './ReviewModal';

function Review({ item }) {
  console.log(item);
  const [reviewShow, setReviewShow] = useState(false);

  const handleReviewClose = () => setReviewShow(false);

  return (
    <>
      <Card style={{ width: '18rem' }} className='m-2'>
        <Card.Body>
          <Card.Title>Xem lại #{item?.reviewId}</Card.Title>
          <Card.Text>Mã số sinh viên: {item?.mssv}</Card.Text>
          <Card.Text>Cột điểm : {item?.gradeName}</Card.Text>
          {item?.isClose ? (
            <Button className='me-2' variant='secondary'disabled>
              Đã đóng
            </Button>
          ) : null}
          <Button variant='primary' onClick={setReviewShow}>
            Xem chi tiết
          </Button>
        </Card.Body>
      </Card>
      <Modal show={reviewShow} onHide={handleReviewClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu xem lại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReviewModal item={item} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleReviewClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Review;
