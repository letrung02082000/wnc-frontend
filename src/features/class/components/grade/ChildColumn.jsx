import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { MdDelete, MdOutlineDragIndicator, MdSaveAs } from 'react-icons/md'

function ChildColumn({item, child, updateGradeColumn, deleteGradeColumn, classRole}) {
  const [gradeScale, setGradeScale] = useState(item[child].gradeScale);
  const [gradeName, setGradeName] = useState(item[child].gradeName);
  const CLASS_ROLE = {
    TEACHER: 'teacher',
    STUDENT: 'student',
    OWNER: 'owner',
  };

  return (
    <Row key={child.id} className='d-flex align-items-center mb-2'>
      <Col xs={1}></Col>
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
      {item?.children?.length !== 0 && classRole !== CLASS_ROLE.STUDENT && (
        <Col xs={1}>
          <Button
            className='w-100'
            onClick={() =>
              updateGradeColumn({
                classId: item[child].classId,
                gradeId: item[child].gradeId,
                gradeName,
                gradeScale: Number(gradeScale),
              })
            }
          >
            <MdSaveAs />
          </Button>
        </Col>
      )}
      {classRole !== CLASS_ROLE.STUDENT && (
        <Col xs={1}>
          <Button
            variant='outline-danger'
            onClick={() => deleteGradeColumn(item[child].gradeId)}
          >
            <MdDelete color='red' />
          </Button>
        </Col>
      )}
    </Row>
  );
}

export default ChildColumn