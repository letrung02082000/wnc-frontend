import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ClassItem from '../components/ClassItem';
import { classApi } from '@/api/class';
import { ToastWrapper } from '@/utils';
import Loading from '@/components/Loading';

function JoinedClassPage() {
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if(loading) {
    return <Loading/>
  }

  if(!classList.length) {
    return (
      <Container>
        <h5 className='text-center mt-5'>Bạn chưa tham gia lớp học nào</h5>
      </Container>
    )
  }

  return (
    <Container>
      <h1 className='text-center my-5'>Lớp học đã tham gia</h1>
      <div className='d-flex flex-wrap my-5'>
        {classList.map((item, index) => {
          return <ClassItem className='m-2' key={index} item={item} />;
        })}
      </div>
    </Container>
  );
}

export default JoinedClassPage;
