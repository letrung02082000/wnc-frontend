import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/form/InputField';
import ReactIcon from '../../../assets/react.svg';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import { userApi } from '../../../api/userApi';
import { ToastWrapper } from '../../../utils';
import {useRecoilState} from 'recoil'
import { userState } from '../../../state';

function SignInPage() {
  const [user, setUser] = useRecoilState(userState)
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

  const handleSignInButton = async () => {
    await handleSubmit((data) => {
      userApi
        .login(data)
        .then((res) => {
          ToastWrapper('Đăng nhập thành công, đang chuyển trang...', 'success');
          localStorage.setItem('user', JSON.stringify(res?.data));
          setUser(res?.data)
          setTimeout(() => {
            navigate(PATH.USER.PROFILE);
          }, 3000);
        })
        .catch((err) => {
          ToastWrapper(err.response.data?.error?.message, 'error');
        });
    })();
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <Row>
            <Image className='my-5' src={ReactIcon} height={50} />
          </Row>
          <Row>
            <Col>
              <InputField
                className='mb-3'
                label='Tên đăng nhập'
                placeholder='Tên đăng nhập của bạn'
                name='username'
                control={control}
                onClear={handleClearButton}
              />
              <InputField
                className='mb-5'
                label='Mật khẩu'
                placeholder='Nhập mật khẩu của bạn'
                name='password'
                type='password'
                control={control}
                onClear={handleClearButton}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className='mb-3 w-100' onClick={handleSignInButton}>Đăng nhập</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className='w-100' variant='outline-primary' onClick={() => navigate(PATH.AUTH.SIGNUP)}>Đến trang đăng ký</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInPage;
