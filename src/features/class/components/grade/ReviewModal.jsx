import { classApi } from '@/api/class';
import { gradeApi } from '@/api/grade';
import { CLASS_ROLE } from '@/constants/class';
import { ToastWrapper } from '@/utils';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';

function ReviewModal({ item }) {
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [classRole, setClassRole] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  useEffect(() => {
    fetchReview();

    classApi
      .checkRoleInClass(item?.classId)
      .then((res) => {
        setClassRole(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchReview = () => {
    gradeApi
      .getDetailReview(item?.classId, item?.reviewId)
      .then((res) => {
        setReview(res?.data?.review[0]);
        setComments(res?.data?.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFeedbackSubmit = () => {
    if (feedback === '') return;

    setLoading(true);

    gradeApi
      .commentReview(item?.reviewId, feedback)
      .then((res) => {
        setFeedback('');
        fetchReview();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReviewClose = () => {
    gradeApi
      .closeReview(item?.reviewId)
      .then((res) => {
        fetchReview();
        setShowCloseModal(false);
        ToastWrapper('Đã đóng yêu cầu', 'success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateGrade = () => {
    gradeApi
      .markGrade({
        gradeId: review?.gradeId,
        point: review?.expectGrade,
        mssv: review?.mssv,
        classId: review?.classId,
      })
      .then((res) => {
        fetchReview();
        setShowUpdateModal(false);
        ToastWrapper('Cập nhật điểm thành công', 'success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Card className='m-2'>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Yêu cầu #{review?.reviewId}</Card.Title>
              <Card.Text>Mã số sinh viên: {review?.mssv}</Card.Text>
              <Card.Text>Họ tên: {review?.fullname}</Card.Text>
              <Card.Text>Cột điểm: {review?.gradeName}</Card.Text>
              <Card.Text>Tỉ lệ điểm: {review?.gradeScale}%</Card.Text>
              <Card.Text>Điểm hiện tại: {review?.curGrade}</Card.Text>
              <Card.Text>Điểm mong muốn: {review?.expectGrade}</Card.Text>
            </Col>
            <Col>
              <Card.Title>Giải thích</Card.Title>
              <Card.Text>{review?.explanation}</Card.Text>
              {review?.isClose ? (
                <Button disabled variant='secondary'>
                  Đã đóng
                </Button>
              ) : (
                <>
                  {classRole != CLASS_ROLE.STUDENT && (
                    <Button onClick={() => setShowCloseModal(true)}>
                      Đóng yêu cầu
                    </Button>
                  )}
                  {classRole != CLASS_ROLE.STUDENT && (
                    <Button
                      className='ms-2'
                      onClick={() => setShowUpdateModal(true)}
                    >
                      Cập nhật điểm
                    </Button>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {comments.map((comment, idx) => {
        return (
          <Card className='m-2 ms-5' key={comment?.commentId}>
            <Card.Body>
              <Card.Title>Phản hồi {comments.length - idx}</Card.Title>
              <Card.Text>
                Người tạo: {comment?.fullname} ({comment?.email})
              </Card.Text>
              <Card.Text>Nội dung: {comment?.message}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      {!review?.isClose && (
        <div className='m-2 ms-5'>
          <Form.Control
            as='textarea'
            value={feedback}
            rows={3}
            placeholder='Nhập phản hồi'
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button
            className='mt-2'
            onClick={handleFeedbackSubmit}
            disabled={loading}
          >
            {loading ? 'Đang phản hồi' : 'Phản hồi'}
          </Button>
        </div>
      )}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn cập nhật điểm số mới thành{' '}
            <b>{review?.expectGrade}</b> không?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => setShowUpdateModal(false)}>
            Giữ điểm số cũ
          </Button>
          <Button variant='secondary' onClick={handleUpdateGrade}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCloseModal} onHide={() => setShowCloseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn đóng yêu cầu này không?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => setShowCloseModal(false)}>
            Huỷ
          </Button>
          <Button variant='secondary' onClick={handleReviewClose}>
            Tiếp tục
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ReviewModal;
