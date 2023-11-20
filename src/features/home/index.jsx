// Import các thư viện cần thiết
import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

// Component chính của trang web
const HomePage = () => {
  return (
    <Container fluid>
      {/* Header */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Trang Web Giảng Dạy</Card.Title>
              <Card.Text>
                Chào mừng bạn đến với trang web giảng dạy! Hãy bắt đầu hành trình học tập của bạn.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Nội dung chính */}
      <Container className="mt-4 mb-4">
        <Row>
          <Col>
            <h2>Khám Phá Các Khóa Học</h2>
            {/* Danh sách các khóa học */}
            <Row>
              <Col md={4}>
                <Card className="mb-4">
                  <Image src="https://source.unsplash.com/150x150/?education" rounded />
                  <Card.Body>
                    <Card.Title>Khóa Học 1</Card.Title>
                    <Card.Text>Mô tả ngắn về khóa học 1.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4">
                  <Image src="https://source.unsplash.com/150x150/?learning" rounded />
                  <Card.Body>
                    <Card.Title>Khóa Học 2</Card.Title>
                    <Card.Text>Mô tả ngắn về khóa học 2.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4">
                  <Image src="https://source.unsplash.com/150x150/?teaching" rounded />
                  <Card.Body>
                    <Card.Title>Khóa Học 3</Card.Title>
                    <Card.Text>Mô tả ngắn về khóa học 3.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Row>
        <Col>
          <footer className="mt-5">
            <p>&copy; 2023 Trang Web Giảng Dạy</p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
