import { classApi } from '@/api/class';
import { MESSAGE } from '@/constants/message';
import { PATH } from '@/constants/path';
import { ToastWrapper } from '@/utils';
import React, { useEffect } from 'react';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import { Form, useLocation, useSearchParams } from 'react-router-dom';

function JoinClassPage() {
  const [text, setText] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [search] = useSearchParams();
  const classId = search.get('id');

  useEffect(() => {
    classApi
      .inviteByLink(classId)
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err)
        ToastWrapper(MESSAGE.ERROR, 'error')
      });
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleJoinClick = () => {
    console.log(text);
  };

  return (
    <Container>
      {!classId && (
        <p className='fw-bold mt-5 text-center'>
          Đường liên kết tham gia lớp học không hợp lệ!
        </p>
      )}
      {success ? (
        <p className='fw-bold mt-5 text-center'>
          Tham gia lớp học thành công! <a href={PATH.CLASS.ME}>Xem danh sách lớp học của bạn</a>
        </p>
      ) : (<p className='fw-bold mt-5 text-center'>Đang tham gia lớp học...</p>)}
    </Container>
  );
}

export default JoinClassPage;
