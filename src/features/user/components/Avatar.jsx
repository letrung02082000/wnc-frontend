import React from 'react';
import { Image } from 'react-bootstrap';
import ReactIcon from '../../../assets/react.svg'

function Avatar() {
  return (
    <Image
      src={ReactIcon}
      roundedCircle
      width='100%'
      style={{
        padding: '0.5rem',
        border: '1px solid #ccc',
      }}
    />
  );
}

export default Avatar;
