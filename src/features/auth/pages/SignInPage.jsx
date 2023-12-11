import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/form/InputField';
import ReactIcon from '../../../assets/react.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import { userApi } from '../../../api/user';
import { ToastWrapper } from '../../../utils';
import { useRecoilState } from 'recoil';
import { userState } from '../../../state';
import { MESSAGE } from '@/constants/message';
import { useState } from 'react';
import { GOOGLE_LOGIN_URL } from '@/constants/endpoints';

function SignInPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const fullname = searchParams.get('fullname');
  const access_token = searchParams.get('access_token');
  const userId = searchParams.get('userId');

  if (email && fullname && access_token && userId) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        email,
        fullname,
        access_token,
        userId,
      })
    );
    location.href = PATH.USER.PROFILE;
  }

  const [loading, setLoading] = useState(false);
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

  const handleSignInButton = async () => {
    setLoading(true);
    await handleSubmit((data) => {
      userApi
        .login(data)
        .then((res) => {
          ToastWrapper(MESSAGE.USER.LOGIN.SUCCESS, 'success');
          localStorage.setItem('user', JSON.stringify(res?.data));
          setUser(res?.data);
          setTimeout(() => {
            navigate(PATH.USER.PROFILE);
          }, 3000);
        })
        .catch((err) => {
          ToastWrapper(err.response.data?.error?.message, 'error');
          setLoading(false);
        });
    })();
  };

  const handleGoogleButton = async () => {
    window.open(GOOGLE_LOGIN_URL, '_self');
  };

  return (
    <Container>
      <Row className='justify-content-center mt-5'>
        <Col xs={4}>
          <Row>
            <Col>
              <InputField
                className='mb-3'
                label='Địa chỉ email'
                name='email'
                control={control}
                onClear={handleClearButton}
              />
              <InputField
                className='mb-3'
                label='Mật khẩu'
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
                className='my-3 w-100'
                onClick={handleSignInButton}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                loading={isSubmitting}
                className='mb-3 w-100'
                variant='outline-primary'
                onClick={() => navigate(PATH.AUTH.SIGNUP)}
              >
                Đến trang đăng ký
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className='text-center'>
                <a
                  className='w-100'
                  variant='outline-primary'
                  href={PATH.AUTH.FORGOT_PASSWORD}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  Quên mật khẩu?
                </a>
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='d-flex justify-content-center align-items-center mb-3'>
                <hr className='w-100' />
                <span className='text-center mx-3'>Hoặc</span>
                <hr className='w-100' />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className='w-100 mb-3'
                variant='outline-danger'
                onClick={handleGoogleButton}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  class='bi bi-google'
                  viewBox='0 0 16 16'
                >
                  <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />
                </svg>
                <span className='ms-2'>Đăng nhập bằng Google</span>
              </Button>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <Button className='w-100 fw-bold' variant='outline-primary'>
                Đăng nhập bằng Facebook
              </Button>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
}

export default SignInPage;
