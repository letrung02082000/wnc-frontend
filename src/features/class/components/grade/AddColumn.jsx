import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { MdAdd } from 'react-icons/md';

function AddColumn({ addGradeColumn, item, headCol=3, tailCol=1 }) {
  const [gradeName, setGradeName] = useState('');
  const [gradeScale, setGradeScale] = useState(0);

  return (
    <Row className='d-flex align-items-center'>
      <Col xs={headCol}></Col>
      <Col>
        <input
          type='text'
          className='w-100 p-2'
          placeholder='Tên cột'
          value={gradeName}
          onChange={(e) => setGradeName(e.target.value)}
        />
      </Col>
      <Col xs={3}>
        <input
          type='number'
          className='w-100 p-2'
          placeholder='Tỉ lệ'
          value={gradeScale}
          onChange={(e) => setGradeScale(e.target.value)}
        />
      </Col>
      <Col xs={1}>
        <Button
          className='w-100'
          onClick={() => {
            addGradeColumn({
              gradeParent: item?.gradeId || 0,
              gradeName,
              gradeScale,
            });
            setGradeName('');
            setGradeScale(0);
          }}
        >
          <MdAdd />
        </Button>
      </Col>
      <Col xs={tailCol}></Col>
    </Row>
  );
}

export default AddColumn;
