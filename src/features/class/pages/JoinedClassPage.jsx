import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import ClassItem from '../components/ClassItem';
import { classApi } from '@/api/class';
import { ToastWrapper } from '@/utils';
import Loading from '@/components/Loading';

function JoinedClassPage() {
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joinClassCode, setJoinClassCode] = useState('');
  const [joining, setJoining] = useState(false);
  console.log("🚀 ~ JoinedClassPage ~ joinClassCode:", joinClassCode)

  const handleJoinClass = () => {
    setJoining(true);

    // Example API call for joining a class
    classApi
      .inviteByLink(joinClassCode)
      .then((res) => {
          ToastWrapper('Successfully joined the class', 'success');
          // Refresh the class list or any other necessary actions
          setJoinClassCode(''); // Clear the input field after joining
          classApi
          .getClassList()
          .then((res) => {
            setClassList(res?.data?.join);
          })
          
      })
      .catch((err) => {
        console.log("🚀 ~ handleJoinClass ~ err:", err)
        ToastWrapper(err?.response?.data?.error?.message, 'error');
      })
      .finally(() => {
        setJoining(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    classApi
      .getClassList()
      .then((res) => {
        setClassList(res?.data?.join);
      })
      .catch((err) => {
        ToastWrapper(err?.response?.data?.message, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!classList.length) {
    return (
      <Container>
        <h5 className='text-center mt-5'>Bạn chưa tham gia lớp học nào</h5>
        {/* Input and button for joining a class */}
      <Form className='mb-4 d-flex align-items-center'>
        <Form.Group controlId='joinClassCode' className='flex-grow-1'>
          <Form.Control
            type='text'
            placeholder='Mã lớp muốn tham gia'
            value={joinClassCode}
            onChange={(e) => setJoinClassCode(e.target.value)}
          />
        </Form.Group>
        <Button style={{marginLeft: '10px'}} variant='primary' onClick={handleJoinClass} disabled={joining}>
          {joining ? 'Đang tham gia...' : 'Tham gia lớp'}
        </Button>
      </Form>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className='text-center my-5'>Lớp học đã tham gia</h1>

      {/* Input and button for joining a class */}
      <Form className='mb-4 d-flex align-items-center'>
        <Form.Group controlId='joinClassCode' className='flex-grow-1'>
          <Form.Control
            type='text'
            placeholder='Mã lớp muốn tham gia'
            value={joinClassCode}
            onChange={(e) => setJoinClassCode(e.target.value)}
          />
        </Form.Group>
        <Button style={{marginLeft: '10px'}} variant='primary' onClick={handleJoinClass} disabled={joining}>
          {joining ? 'Đang tham gia...' : 'Tham gia lớp'}
        </Button>
      </Form>

      <div className='d-flex flex-wrap my-5'>
        {classList.map((item, index) => {
          return <ClassItem className='m-2' key={index} item={item} />;
        })}
      </div>
    </Container>
  );
}

export default JoinedClassPage;
