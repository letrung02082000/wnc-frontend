import { gradeApi } from '@/api/grade';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

function ReviewModal({ item }) {
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReview();
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
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Card className='m-2'>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Xem lại #{review?.reviewId}</Card.Title>
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
      <div className='m-2 ms-5'>
        <Form.Control
          as='textarea'
          value={feedback}
          rows={3}
          placeholder='Nhập phản hồi'
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button className='mt-2' onClick={handleFeedbackSubmit} disabled={loading}>
          {loading ? 'Đang phản hồi' : 'Phản hồi'}
        </Button>
      </div>
    </div>
  );
}

export default ReviewModal;
