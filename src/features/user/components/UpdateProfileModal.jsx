import { userApi } from '@/api/user';
import InputField from '@/components/form/InputField';
import { MESSAGE } from '@/constants/message';
import { ToastWrapper } from '@/utils';
import React, { useEffect } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function UpdateProfileModal({show, setShow, onSubmit}) {
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

  useEffect(() => {
    userApi.getProfile().then((res) => {
      setValue('fullname', res.data.fullname);
      setValue('phoneNumber', res.data.phoneNumber);
      setValue('dob', res.data.dob);
      setValue('address', res.data.address);
    }).catch((err) => {
      console.log(err);
      ToastWrapper(MESSAGE.ERROR, 'error')
    })
  }, [show])
  

  return (
    <>
    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <InputField
          className='mb-3'
          label='Họ tên'
          name='fullname'
          control={control}
          onClear={handleClearButton}
        />
        <InputField
          className='mb-3'
          label='Số điện thoại'
          name='phoneNumber'
          control={control}
          onClear={handleClearButton}
        />
        <InputField
          className='mb-3'
          label='Ngày sinh'
          name='dob'
          control={control}
          onClear={handleClearButton}
        />
        <InputField
          className='mb-3'
          label='Địa chỉ'
          name='address'
          control={control}
          onClear={handleClearButton}
        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShow(false)}>
            Đóng
          </Button>
          <Button variant='primary' onClick={async () => await handleSubmit(onSubmit)()}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default UpdateProfileModal;
