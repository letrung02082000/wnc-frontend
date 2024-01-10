import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { Button, Col, Form, FormControl, Modal, Row } from 'react-bootstrap';
import { gradeApi } from '@/api/grade';
import { useParams } from 'react-router-dom';
import { ToastWrapper } from '@/utils';
import { MESSAGE } from '@/constants/message';
import { useForm } from 'react-hook-form';
import InputField from '@/components/form/InputField';
import StructureModal from '../components/grade/StructureModal';

// Create new GridExample component
const GradePage = () => {
  const { classId } = useParams();
  const [show, setShow] = useState(false);
  const [structureShow, setStructureShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'fullname', headerName: 'Họ và tên' },
    { field: 'mssv', headerName: 'Mã sinh viên' },
  ]);

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

  const defaultColDef = useMemo(() => {
    return {
      width: 170,
      filter: true,
    };
  }, []);

  useEffect(() => {
    fetchGradeBoard();
  }, []);

  const fetchGradeBoard = useCallback(() => {
    gradeApi
      .getGradeBoard(classId)
      .then((res) => {
        const data = res?.data?.data?.map((item) => {
          return {
            fullname: item.fullname,
            mssv: item.mssv,
            ...item.grades,
          };
        });

        setRowData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
      
  const onGridReady = useCallback((params) => {
    gradeApi.getGradeStructure(classId).then((res) => {
      const structure = res.data;

      const newStructure = structure.map((item) => {
        if(item?.children?.length > 0) {
          return {
            field: item.gradeId.toString(),
            headerName: item.gradeName,
            editable: true,
            children: item.children.map((child) => {
              return {
                field: item[`${child}`].gradeId.toString(),
                headerName: item[`${child}`].gradeName,
                editable: true,
              }
            })
          }
        }

        return {
          field: item.gradeId.toString(),
          headerName: item.gradeName,
          editable: true,
        };
      });

      setColumnDefs((prev) => [...prev, ...newStructure]);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleCellValueChanged = useCallback((params) => {
    const newData = {
      mssv: params.data.mssv,
      classId: classId,
      gradeId: parseInt(params.colDef.field),
      point: params.newValue,
    }

    gradeApi.markGrade(newData).then((res) => {
      console.log(res);
      ToastWrapper(MESSAGE.GRADE.CREATE.SUCCESS, 'success');
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleClose = () => setShow(false);

  const handleStructureClose = () => setStructureShow(false);

  const handleClearButton = (name) => {
    setValue(name, '');
    setFocus(name);
  };

  const handleAddStudentButton = async () => {
    setLoading(true);
    
    await handleSubmit((data) => {
      console.log(data)
      gradeApi.addStudent(classId, data).then((res) => {
        setLoading(false);
        setShow(false);
        ToastWrapper(MESSAGE.GRADE.CREATE.SUCCESS, 'success');
        fetchGradeBoard();
      }).catch((err) => {
        setLoading(false);
        console.log(err);
      });
  
    })();
  }

  return (
    <>
      <div
        className={'ag-theme-quartz'}
        style={{ width: '100%', height: '90vh' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowDragManaged={true}
          rowDragMultiRow={true}
          rowSelection={'multiple'}
          onGridReady={onGridReady}
          onCellValueChanged={handleCellValueChanged}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleInviteButton();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm sinh viên</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <InputField
                  className='mb-3'
                  label='Họ và tên'
                  name='fullname'
                  control={control}
                  onClear={handleClearButton}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  className='mb-3'
                  label='Mã số sinh viên'
                  name='mssv'
                  control={control}
                  onClear={handleClearButton}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Huỷ
            </Button>
            <Button
              variant='primary'
              type='button'
              disabled={loading}
              onClick={handleAddStudentButton}
            >
              {loading ? 'Đang thêm...' : 'Thêm'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={structureShow} onHide={handleStructureClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <StructureModal classId={classId}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleStructureClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='d-flex w-100 my-3 justify-content-between'>
        <div>
          <Button className='ms-2' onClick={() => setShow(true)}>
            Thêm sinh viên
          </Button>
          <Button className='ms-2' onClick={() => setStructureShow(true)}>Cấu trúc bảng điểm</Button>
        </div>
        <Button className='me-2'>Xuất bảng điểm</Button>
      </div>
    </>
  );
};

export default GradePage;
