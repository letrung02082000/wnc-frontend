import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function DetailClassPage() {
  const { classId } = useParams();
  return (
    <Tabs
      defaultActiveKey='home'
      id='uncontrolled-tab-example'
      className='mb-3'
    >
      <Tab eventKey='home' title='Thông tin'>
        Mã lớp: {classId}
      </Tab>
      <Tab eventKey='assignments' title='Bài tập'>
        Bài tập
      </Tab>
      <Tab eventKey='participants' title='Thành viên'>
        Thành viên
      </Tab>
    </Tabs>
  );
}

export default DetailClassPage;
