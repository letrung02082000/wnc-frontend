import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Avatar from '../components/Avatar';
import InputField from '../../../components/form/InputField';
import { useForm } from 'react-hook-form';
import { ToastWrapper } from '@/utils';
import { userApi } from '@/api/user';
import { MESSAGE } from '@/constants/message';
import UpdateProfileModal from '../components/UpdateProfileModal';
import UpdateStudentIdModal from '../components/UpdateStudentIdModal';

function ProfilePage() {
  const [user, setUser] = useState();
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showUpdateStudentIdModal, setShowUpdateStudentIdModal] = useState(false);
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
    defaultValues: user,
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
      if (data['new-password'] !== data['confirm-password']) {
        ToastWrapper('Mật khẩu mới không khớp', 'error');
        return;
      }

      if (data['old-password'] === data['new-password']) {
        ToastWrapper('Mật khẩu mới không được trùng với mật khẩu cũ', 'error');
        return;
      }

      userApi
        .changePassword({
          password: data['old-password'],
          newPassword: data['new-password'],
        })
        .then(() => {
          ToastWrapper('Cập nhật mật khẩu thành công', 'success');
        })
        .catch((err) => {
          ToastWrapper(err.response.data?.error?.message, 'error');
        });
    })();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    userApi
      .getProfile()
      .then((res) => {
        setUser(res.data);
        setValue('fullname', res.data.fullname);
        setValue('email', res.data.email);
        setValue('phoneNumber', res.data.phoneNumber);
        setValue('dob', res.data.dob);
        setValue('address', res.data.address);
      })
      .catch((err) => {
        ToastWrapper(MESSAGE.USER.GET_PROFILE.FAIL, 'error');
      });
  }

  const handleUpdateProfile = (data) => {
    setShowUpdateProfileModal(false);
    userApi
        .updateProfile(data)
        .then(() => {
          ToastWrapper('Cập nhật thông tin thành công', 'success');
        })
        .catch((err) => {
          ToastWrapper(err.response.data?.error?.message, 'error');
        }).finally(() => {
          fetchUser();
        });
  }

  const handleUpdateStudentId = (data) => {
    setShowUpdateStudentIdModal(false);
    userApi
      .updateStudentId(data)
      .then(() => {
        ToastWrapper(MESSAGE.USER.UPDATE.SUCCESS, 'success');
      })
      .catch((err) => {
        ToastWrapper(err.response.data?.error?.message, 'error');
      })
      .finally(() => {
        fetchUser();
      });
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Row className='justify-content-center my-5'>
            <Col xs={4}>{/* <Avatar /> */}</Col>
          </Row>
          <Row>
            <Col>
              <h5 className='mb-3'>Thông tin cá nhân</h5>
              <InputField
                className='mb-3'
                label='Họ tên'
                name='fullname'
                control={control}
                onClear={handleClearButton}
                disabled
              />
              <InputField
                className='mb-3'
                label='Email'
                name='email'
                type='email'
                control={control}
                onClear={handleClearButton}
                disabled
              />
              <InputField
                className='mb-3'
                label='Số điện thoại'
                name='phoneNumber'
                control={control}
                onClear={handleClearButton}
                disabled
              />
              <InputField
                className='mb-3'
                label='Ngày sinh'
                name='dob'
                control={control}
                onClear={handleClearButton}
                disabled
              />
              <InputField
                className='mb-3'
                label='Địa chỉ'
                name='address'
                control={control}
                onClear={handleClearButton}
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className='my-4 w-100'
                onClick={() => setShowUpdateProfileModal(true)}
              >
                Cập nhật thông tin
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className='mb-4 w-100'
                variant='outline-primary'
                onClick={() => setShowUpdateStudentIdModal(true)}
              >
                Cập nhật mã số sinh viên
              </Button>
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
      <UpdateProfileModal show={showUpdateProfileModal} setShow={setShowUpdateProfileModal} onSubmit={handleUpdateProfile}/>
      <UpdateStudentIdModal show={showUpdateStudentIdModal} setShow={setShowUpdateStudentIdModal} onSubmit={handleUpdateStudentId}/>
    </Container>
  );
}

export default ProfilePage;
