import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
} from 'react-bootstrap';

function ClassInfoPage({ item }) {
  const [copied, setCopied] = useState(false);

  const handleCopyButton = () => {
    navigator.clipboard.writeText(
      window.location.hostname + '/class/join?id=' + item?.classId
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
      <Row>
        <h1 className='text-center my-5'>Thông tin lớp học</h1>
        <Col>
          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Tên lớp học</th>
                    <th>Học phần</th>
                    <th>Chủ dề</th>
                    <th>Phòng học</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item?.name}</td>
                    <td>{item?.part}</td>
                    <td>{item?.topic}</td>
                    <td>{item?.room}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}>
          <Button
            onClick={handleCopyButton}
            variant='outline-primary'
            className='w-100'
          >
            {copied ? 'Đã' : 'Sao'} chép liên kết tham gia lớp học
          </Button>
        </Col>
      </Row>
  );
}

export default ClassInfoPage;
