import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { MdDelete, MdOutlineDragIndicator, MdSaveAs } from 'react-icons/md'

function ChildColumn({item, child, updateGradeColumn, deleteGradeColumn}) {
    const [gradeScale, setGradeScale] = useState(item[child].gradeScale);
    const [gradeName, setGradeName] = useState(item[child].gradeName);
  return (
    <Row key={child.id} className='d-flex align-items-center mb-2'>
    <Col xs={1}></Col>
    <Col xs={1}>
      <MdOutlineDragIndicator />
    </Col>
    <Col xs={5}>
      <input
        className='p-2 w-100'
        onChange={(e) => setGradeName(e.target.value)}
        value={gradeName}
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
        onClick={() => updateGradeColumn({
            classId: item[child].classId,
            gradeId: item[child].gradeId,
            gradeName,
            gradeScale: Number(gradeScale),
        })}
      >
        <MdSaveAs />
      </Button>
    </Col>
    <Col xs={1}>
      <Button
        variant='outline-danger'
        onClick={() => deleteGradeColumn(item[child].gradeId)}
      >
        <MdDelete color='red' />
      </Button>
    </Col>
  </Row>
  )
}

export default ChildColumn