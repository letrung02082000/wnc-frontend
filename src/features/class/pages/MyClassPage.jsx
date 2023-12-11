import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ClassItem from '../components/ClassItem';
import { classApi } from '@/api/class';
import { ToastWrapper } from '@/utils';
import Loading from '@/components/Loading';

function MyClassPage() {
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    classApi
      .getClassList()
      .then((res) => {
        setClassList(res?.data?.teach);
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
      <div className='d-flex flex-wrap my-5'>
        {classList.map((item, index) => {
          return <ClassItem className='m-2' key={index} item={item} />;
        })}
      </div>
    </Container>
  );
}

export default MyClassPage;
