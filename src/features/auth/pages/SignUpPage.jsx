import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/form/InputField';
import ReactIcon from '../../../assets/react.svg';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import { userApi } from '../../../api/userApi';

function SignInPage() {
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
    await handleSubmit((data) => {
      userApi
        .register(data)
        .then((res) => {
          if (res.status === 201) {
            navigate(PATH.AUTH.SIGNIN);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  };

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
                label='Tên của bạn'
                placeholder='Nhập họ tên của bạn'
                name='fullname'
                control={control}
                onClear={handleClearButton}
              />
              <InputField
                className='mb-3'
                label='Tên đăng nhập'
                placeholder='Nhập tên đăng nhập của bạn'
                name='username'
                control={control}
                onClear={handleClearButton}
              />
              <InputField
                label='Mật khẩu'
                className='mb-3'
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
              <Button className='my-3 w-100' onClick={handleSignUpButton}>
                Đăng ký
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                className='w-100'
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
