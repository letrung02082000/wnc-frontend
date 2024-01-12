// ClassItem.js
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const ClassItemAdmin = ({ classInfo, onToggleActive }) => {
  const { classId, name, fullname, isActive, studentCount, teacherCount } = classInfo;

  return (
    <Row
      style={{
        border: '1px solid #d4d4d4',
        borderRadius: '5px',
        marginBottom: '10px',
        padding: '10px',
        borderColor: isActive ? '#28a745' : '#dc3545',
      }}
    >
     
      <Col xs={3}>{name}</Col>
      <Col xs={3}>{fullname}</Col>
      <Col xs={2}>{Number(studentCount)}</Col>
      <Col xs={2}>{Number(teacherCount)}</Col>
      <Col xs={2}>
        <Button variant={isActive ? 'danger' : 'success'} onClick={() => onToggleActive(classId)}>
          {isActive ? 'Khóa' : 'Mở'}
        </Button>
      </Col>
    </Row>
  );
};

export default ClassItemAdmin;