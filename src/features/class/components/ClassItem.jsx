import { PATH } from '@/constants/path';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CiLogin } from 'react-icons/ci';

function ClassItem({ item, ...props }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} {...props}>
      <Card.Body
        style={{
          backgroundImage:
            'url(https://gstatic.com/classroom/themes/img_backtoschool.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          borderRadius: '5px 5px 0 0',
          minHeight: '150px',
        }}
      >
        <Card.Title>{item?.name}</Card.Title>
        <Card.Text>
          {item?.part} {item?.topic && '-'} {item?.topic}
        </Card.Text>
      </Card.Body>
      <Button
        className='align-self-end my-2 me-2'
        variant='primary'
        onClick={() =>
          navigate(PATH.CLASS.DETAIL.replace(':classId', item?.classId), {
            state: { item },
          })
        }
      >
        <CiLogin /> Vào lớp
      </Button>
    </Card>
  );
}

export default ClassItem;
