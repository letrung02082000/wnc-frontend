import { userApi } from '@/api/user';
import InputField from '@/components/form/InputField';
import { ToastWrapper } from '@/utils';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailButton = () => {
    userApi
      .forgotPassword({
        email,
      })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        ToastWrapper(err?.response?.data?.error?.message, 'error');
      });
  };

  if (success) {
    return (
      <Container>
        <h2 className='text-center mt-5 mb-3'>
          Lấy lại mật khẩu thành công
        </h2>
        <p className='text-center'>Vui lòng kiểm tra email để lấy lại mật khẩu</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className='text-center my-5'>Lấy lại mật khẩu</h2>
      <Row>
        <Col xs={10}>
          <Form.Group>
            <Form.Control
              name='email'
              type='email'
              placeholder='Nhập địa chỉ email của bạn'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button className='w-100' variant='primary' onClick={handleEmailButton}>
            Xác nhận
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPasswordPage;
