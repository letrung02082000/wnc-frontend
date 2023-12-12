import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/form/InputField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import { ToastWrapper } from '../../../utils';
import { MESSAGE } from '@/constants/message';
import { useState } from 'react';
import { classApi } from '@/api/class';

function CreateClassPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    defaultValues: {
      name: '',
      part: '',
      topic: '',
      room: '',
    },
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

  const handleCreateButton = async () => {
    await handleSubmit((data) => {
      setLoading(true);
      classApi
        .createClass(data)
        .then((res) => {
          ToastWrapper(MESSAGE.CLASS.CREATE.SUCCESS, 'success');
          navigate(PATH.CLASS.ME);
        })
        .catch((err) => {
          ToastWrapper(MESSAGE.CLASS.CREATE.FAIL, 'error');
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={6}>
          <h1 className='text-center my-5'>Tạo lớp học</h1>
          <Row>
            <Col>
              <InputField
                className='mb-3'
                label='Tên lớp học'
                name='name'
                control={control}
                onClear={handleClearButton}
                hasAsterisk={true}
              />
              <InputField
                className='mb-3'
                label='Phần học'
                name='part'
                control={control}
                onClear={handleClearButton}
                rules={{
                  required: false,
                }}
              />
              <InputField
                className='mb-3'
                label='Chủ đề'
                name='topic'
                control={control}
                onClear={handleClearButton}
                rules={{
                  required: false,
                }}
              />
              <InputField
                className='mb-3'
                label='Mã phòng'
                name='room'
                control={control}
                onClear={handleClearButton}
                rules={{
                  required: false,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                disabled={loading}
                className='my-3 w-100'
                onClick={handleCreateButton}
              >
                {loading ? 'Đang tạo lớp học' : 'Tạo lớp học'}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateClassPage;
