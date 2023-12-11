import React from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import { Form } from 'react-router-dom';

function JoinClassPage() {
  const [text, setText] = React.useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleJoinClick = () => {
    console.log(text);
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <h1 className='text-center my-5'>Tham gia lớp học</h1>
          <Row>
            <Col xs={9}>
              <FormControl
                onChange={handleTextChange}
                placeholder='Nhập mã được cung cấp để tham gia lớp học'
              />
            </Col>
            <Col>
              <Button
                className='w-100'
                variant='primary'
                type='button'
                onClick={handleJoinClick}
              >
                Vào lớp
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default JoinClassPage;
