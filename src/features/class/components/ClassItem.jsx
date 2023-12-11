import { PATH } from '@/constants/path';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ClassItem({ item, ...props }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} {...props}>
      <Card.Body>
        <Card.Title>Mã lớp học #{item?.classId}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button
          variant='primary'
          onClick={() =>
            navigate(PATH.CLASS.DETAIL.replace(':classId', item?.classId))
          }
        >
          Vào lớp
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ClassItem;
