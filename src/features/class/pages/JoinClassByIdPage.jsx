import { classApi } from '@/api/class';
import { MESSAGE } from '@/constants/message';
import { PATH } from '@/constants/path';
import { ToastWrapper } from '@/utils';
import React from 'react';
import { Button, Col, FormControl, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function JoinClassByIdPage() {
  const [text, setText] = React.useState('');
  const navigate = useNavigate();

  const handleJoinButton = () => {
    if(!text) {
      ToastWrapper('Vui lòng nhập mã lớp học', 'error');
      return;
    }

    classApi
      .inviteByLink(text)
      .then((res) => {
        ToastWrapper(MESSAGE.CLASS.JOIN.SUCCESS, 'success');
        navigate(PATH.CLASS.DETAIL.replace(':classId', text));
      })
      .catch((err) => {
        ToastWrapper(MESSAGE.CLASS.JOIN.FAIL, 'error');
      });
  };

  return (
    <Row className='justify-content-center'>
      <Col xs={6}>
        <h1 className='text-center my-5'>Tham gia lớp học</h1>
        <Row>
          <Col xs={9}>
            <FormControl
              onChange={(e) => setText(e.target.value)}
              placeholder='Nhập mã được cung cấp để tham gia lớp học'
            />
          </Col>
          <Col>
            <Button
              className='w-100'
              variant='primary'
              type='button'
              onClick={handleJoinButton}
            >
              Tham gia
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default JoinClassByIdPage;
