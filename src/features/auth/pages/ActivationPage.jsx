import { PATH } from '@/constants/path';
import React from 'react';
import { Container } from 'react-bootstrap';

function ActivationPage() {
  return (
    <Container>
      <p className='text-center mt-5'>
        Đăng ký tài khoản thành công. Vui lòng kích hoạt tài khoản bằng đường
        dẫn liên kết được gửi đến email.
      </p>
      <p className='text-center'><a href={PATH.HOME}>Về trang chủ</a></p>
    </Container>
  );
}

export default ActivationPage;
