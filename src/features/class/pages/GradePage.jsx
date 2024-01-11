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
import { ToastWrapper, exportToCSV } from '@/utils';
import { MESSAGE } from '@/constants/message';
import { useForm } from 'react-hook-form';
import InputField from '@/components/form/InputField';
import StructureModal from '../components/grade/StructureModal';
import { classApi } from '@/api/class';
import ImportGradeModal from '../components/grade/ImportGradeModal';
import ImportStudentModal from '../components/grade/ImportStudentModal';

// Create new GridExample component
const GradePage = () => {
  const { classId } = useParams();
  const [show, setShow] = useState(false);
  const [structureShow, setStructureShow] = useState(false);
  const [importGradeShow, setImportGradeShow] = useState(false);
  const [importStudentShow, setImportStudentShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([]);
  const [studentList, setStudentList] = useState({});
  const [gradeBoard, setGradeBoard] = useState([]);
  const [gradeList, setGradeList] = useState([]);

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
    fetchStudentList();
  }, []);

  useEffect(() => {
    const data = gradeBoard.map((item) => {
      return {
        ...item,
        ...studentList[item.mssv],
      };
    });

    setRowData(data);
  }, [Object.keys(studentList).length, gradeBoard]);

  const fetchStudentList = useCallback(() => {
    classApi
      .getClassParticipants(classId)
      .then((res) => {
        let students = {};

        for (let index = 0; index < res?.data?.students?.length; index++) {
          const student = res?.data?.students[index];

          if (student.mssv) {
            students[student.mssv] = student;
          }
        }

        setStudentList(students);
      })
      .catch((err) => {
        console.log(err);
      });
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

        setGradeBoard(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onGridReady = useCallback((params) => {
    fetchGradeStructure();
  }, []);

  const fetchGradeStructure = useCallback(() => {
    gradeApi
      .getGradeStructure(classId)
      .then((res) => {
        const structure = res.data;
        let gradeList = [];
        
        for (let index = 0; index < structure.length; index++) {
          const element = structure[index];
          console.log(element)
          gradeList.push({
            value: element.gradeId,
            label: element.gradeName,
          });
          
          if (element?.children?.length > 0)
          {
            for (let childIndex = 0; childIndex < element.children.length; childIndex++) {
              const childElement = element.children[childIndex];
              gradeList.push({
                value: childElement,
                label: element[`${childElement}`].gradeName,
              });
            }
          }
        }

        setGradeList(gradeList);

        const newStructure = structure.map((item) => {
          if (item?.children?.length > 0) {
            return {
              field: item.gradeId.toString(),
              headerName: item.gradeName,
              editable: true,
              children: item.children.map((child) => {
                return {
                  field: item[`${child}`].gradeId.toString(),
                  headerName: item[`${child}`].gradeName,
                  editable: true,
                };
              }),
            };
          }

          return {
            field: item.gradeId.toString(),
            headerName: item.gradeName,
            editable: true,
          };
        });

        setColumnDefs((prev) => [
          { field: 'email', headerName: 'Địa chỉ email' },
          { field: 'fullname', headerName: 'Họ và tên' },
          { field: 'mssv', headerName: 'Mã sinh viên' },
          ...newStructure,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleCellValueChanged = useCallback((params) => {
    const newData = {
      mssv: params.data.mssv,
      classId: classId,
      gradeId: parseInt(params.colDef.field),
      point: params.newValue,
    };

    gradeApi
      .markGrade(newData)
      .then((res) => {
        ToastWrapper(MESSAGE.GRADE.CREATE.SUCCESS, 'success');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClose = () => setShow(false);

  const handleStructureClose = () => {
    setStructureShow(false);
    fetchGradeStructure();
  };

  const handleClearButton = (name) => {
    setValue(name, '');
    setFocus(name);
  };

  const handleAddStudentButton = async () => {
    setLoading(true);

    await handleSubmit((data) => {
      gradeApi
        .addStudent(classId, data)
        .then((res) => {
          setLoading(false);
          setShow(false);
          ToastWrapper(MESSAGE.GRADE.CREATE.SUCCESS, 'success');
          fetchGradeBoard();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    })();
  };

  const handleImportGradeClose = () => {
    fetchGradeBoard();
    setImportGradeShow(false);
  }
  const handleImportStudentClose = () => {
    fetchGradeBoard();
    setImportStudentShow(false);
  };

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

      <Modal show={structureShow} onHide={handleStructureClose} size='lg'>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <StructureModal classId={classId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleStructureClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={importGradeShow} onHide={handleImportGradeClose}>
      <Modal.Header closeButton>
          <Modal.Title>Nhập điểm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportGradeModal gradeList={gradeList}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleImportGradeClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={importStudentShow} onHide={handleImportStudentClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập danh sách sinh viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImportStudentModal classId={classId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleImportStudentClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='d-flex w-100 my-3 justify-content-between'>
        <div>
          <Button className='ms-2' onClick={() => setShow(true)}>
            Thêm sinh viên
          </Button>
          <Button className='ms-2' onClick={() => setStructureShow(true)}>
            Cấu trúc bảng điểm
          </Button>
          <Button className='ms-2' onClick={() => setImportStudentShow(true)}>
            Nhập danh sách sinh viên
          </Button>
          <Button className='ms-2' onClick={() => setImportGradeShow(true)}>
            Nhập điểm
          </Button>
        </div>
        <Button className='me-2' onClick={() => exportToCSV(rowData, 'data')}>
          Xuất bảng điểm
        </Button>
      </div>
    </>
  );
};

export default GradePage;
