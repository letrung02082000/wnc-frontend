import { userApi } from '@/api/user';
import InputField from '@/components/form/InputField';
import { ToastWrapper } from '@/utils';
import React, { useEffect } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function UpdateStudentIdModal({show, setShow, onSubmit}) {
  const {
    control,
    setValue,
    handleSubmit,
    setError,
    formState: { isSubmitting },
    watch,
    setFocus,
    reset,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    shouldFocusError: true,
    shouldUnregister: true,
    shouldUseNativeValidation: false,
    delayError: false,
  });

  const handleClearButton = (name) => {
    setValue(name, '');
    setFocus(name);
  };
  
  return (
    <>
    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <InputField
          className='mb-3'
          label='Nhập mã số sinh viên của bạn'
          name='studentId'
          control={control}
          onClear={handleClearButton}
        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Đóng
          </Button>
          <Button variant='primary' onClick={async () => await handleSubmit(data => onSubmit(data.studentId))()}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default UpdateStudentIdModal;
