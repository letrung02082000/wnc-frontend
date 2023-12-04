import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Avatar from '../components/Avatar';
import InputField from '../../../components/form/InputField';
import { userState } from '../../../state';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { ToastWrapper } from '@/utils';
import { userApi } from '@/api/user';

function ProfilePage() {
  const [user, setUser] = useRecoilState(userState);
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

  const handleLogoutButton = () => {
    setUser({});
    localStorage.removeItem('user');
    location.reload();
  };

  const handleChangePassword = () => {
    handleSubmit((data) => {
      if(data['new-password'] !== data['confirm-password']) {
        ToastWrapper('Mật khẩu mới không khớp', 'error');
        return;
      }

      if(data['old-password'] === data['new-password']) {
        ToastWrapper('Mật khẩu mới không được trùng với mật khẩu cũ', 'error');
        return;
      }

      userApi.changePassword({
        password: data['old-password'],
        newPassword: data['new-password'],
      }).then(() => {
        ToastWrapper('Cập nhật mật khẩu thành công', 'success');
      }).catch((err) => {
        ToastWrapper(err.response.data?.error?.message, 'error');
      });
    })();
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Row className='justify-content-center my-5'>
            <Col xs={4}>{/* <Avatar /> */}</Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className='fw-bold'>Tên của bạn</Form.Label>
                <Form.Control
                  className='mb-3'
                  value={user?.fullname}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className='fw-bold'>Địa chỉ email</Form.Label>
                <Form.Control
                  className='mb-3'
                  value={user?.email}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className='mt-5 mb-3'>Cập nhật mật khẩu</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField
                className='mb-3'
                label='Mật khẩu cũ'
                name='old-password'
                type='password'
                control={control}
                onClear={handleClearButton}
              />
              <InputField
                className='mb-3'
                label='Mật khẩu mới'
                name='new-password'
                type='password'
                control={control}
                onClear={handleClearButton}
              />
              <InputField
                className='mb-3'
                label='Nhập lại mật khẩu mới'
                name='confirm-password'
                type='password'
                control={control}
                onClear={handleClearButton}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className='mb-4 w-100' onClick={handleChangePassword}>
                Cập nhật mật khẩu
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant='outline-primary'
                className='mb-5 w-100'
                onClick={handleLogoutButton}
              >
                Đăng xuất
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
