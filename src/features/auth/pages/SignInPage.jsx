import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/form/InputField';
import ReactIcon from '../../../assets/react.svg';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/path';

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
                label='Địa chỉ email'
                placeholder='Nhập địa chỉ email của bạn'
                name='email'
                type='email'
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
              <Button className='mb-3 w-100'>Đăng nhập</Button>
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
