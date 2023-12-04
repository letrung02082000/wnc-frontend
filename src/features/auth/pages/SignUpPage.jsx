import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { set, useForm } from 'react-hook-form';
import InputField from '../../../components/form/InputField';
import ReactIcon from '../../../assets/react.svg';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import { ToastWrapper } from '../../../utils';
import { userApi } from '../../../api/user';
import { MESSAGE } from '@/constants/message';
import { useState } from 'react';

function SignInPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const handleSignUpButton = async () => {
    setLoading(true);
    await handleSubmit((data) => {
      userApi
        .register(data)
        .then(() => {
          ToastWrapper(
            MESSAGE.USER.REGISTER.SUCCESS,
            'success'
          );
          navigate(PATH.AUTH.ACTIVATION);
        })
        .catch((err) => {
          ToastWrapper(
            err.response.data?.error?.message,
            'error'
          );
          setLoading(false);
        });
    })();
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={4}>
          <Row>
            <Image className='my-5' src={ReactIcon} height={50} />
          </Row>
          <Row>
            <Col>
              <InputField
                className='mb-3'
                label='Tên của bạn'
                name='fullname'
                control={control}
                onClear={handleClearButton}
              />
              <InputField
                className='mb-3'
                label='Địa chỉ email'
                name='email'
                control={control}
                onClear={handleClearButton}
              />
              <InputField
                label='Mật khẩu'
                className='mb-3'
                name='password'
                type='password'
                control={control}
                onClear={handleClearButton}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                disabled={loading}
                className='my-3 w-100 fw-bold'
                onClick={handleSignUpButton}
              >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className='w-100 fw-bold'
                variant='outline-primary'
                onClick={() => navigate(PATH.AUTH.SIGNIN)}
              >
                Đến trang đăng nhập
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInPage;
