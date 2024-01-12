import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { MdDelete, MdOutlineDragIndicator, MdSaveAs } from 'react-icons/md';

function ParentColumn({ item, updateGradeColumn, deleteGradeColumn, classRole }) {
  const [gradeScale, setGradeScale] = useState(item.gradeScale);
  const [gradeName, setGradeName] = useState(item.gradeName);
  const CLASS_ROLE = {
    TEACHER: 'teacher',
    STUDENT: 'student',
    OWNER: 'owner',
  }

  return (
    <Row className='d-flex align-items-center mb-2'>
      <Col xs={1}>
        <MdOutlineDragIndicator />
      </Col>
      <Col xs={1}>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
      </Col>
      <Col>
        <input
          disabled={classRole === CLASS_ROLE.STUDENT}
          className='p-2 w-100'
          onChange={(e) => setGradeName(e.target.value)}
          value={gradeName}
        />
      </Col>
      <Col xs={3}>
        <input
          disabled={classRole === CLASS_ROLE.STUDENT}
          type='number'
          className='w-100 p-2'
          placeholder='Tỉ lệ'
          value={gradeScale}
          onChange={(e) => setGradeScale(e.target.value)}
        />
      </Col>
      {classRole !== CLASS_ROLE.STUDENT && (
        <Col xs={1}>
          <Button
            className='w-100'
            onClick={() =>
              updateGradeColumn({
                classId: item.classId,
                gradeId: item.gradeId,
                gradeName,
                gradeScale: Number(gradeScale),
              })
            }
          >
            <MdSaveAs />
          </Button>
        </Col>
      )}
      {item?.children?.length === 0 && classRole !== CLASS_ROLE.STUDENT && (
        <Col xs={1}>
          <Button
            variant='outline-danger'
            onClick={() => deleteGradeColumn(item.gradeId)}
          >
            <MdDelete color='red' />
          </Button>
        </Col>
      )}
      {item?.children?.length !== 0 && (
        <Col xs={1}>
        </Col>
      )}
    </Row>
  );
}

export default ParentColumn;
