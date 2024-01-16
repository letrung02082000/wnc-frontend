import { gradeApi } from '@/api/grade';
import { ToastWrapper } from '@/utils';
import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { MdDelete, MdOutlineDragIndicator, MdSaveAs } from 'react-icons/md';

function ChildColumn({
  item,
  child,
  updateGradeColumn,
  deleteGradeColumn,
  classRole,
}) {
  const [gradeScale, setGradeScale] = useState(item[child].gradeScale);
  const [gradeName, setGradeName] = useState(item[child].gradeName);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [isFinalize, setIsFinalize] = useState(item?.isView);
  const CLASS_ROLE = {
    TEACHER: 'teacher',
    STUDENT: 'student',
    OWNER: 'owner',
  };

  const handleFinalizeColumn = (e) => {
    gradeApi.finalizeGrade(item[child].gradeId).then((res) => {
      ToastWrapper('Công bố thành công', 'success');
      setShowFinalizeModal(false);
      setIsFinalize(true);
    });
  };

  const handleFinalizeModalClose = () => {
    setShowFinalizeModal(false);
    setIsFinalize(false);
  }

  return (
    <>
      <Row key={child.id} className='d-flex align-items-center mb-2'>
        <Col xs={1}></Col>
        <Col xs={1}>
          <MdOutlineDragIndicator />
        </Col>
        <Col xs={1}>
          <input
            onChange={(e) => {
              setIsFinalize(e.target.checked);
              if (e.target.checked) {
                setShowFinalizeModal(true);
              }
            }}
            disabled={item?.isView}
            checked={isFinalize}
            type='checkbox'
          />
        </Col>
        <Col>
          <input
            disabled={classRole === CLASS_ROLE.STUDENT}
            className='p-2 w-100'
            onChange={(e) => setGradeName(e.target.value)}
            value={gradeName}
          />
        </Col>
        <Col xs={3}>
          <input
            disabled={classRole === CLASS_ROLE.STUDENT}
            type='number'
            className='w-100 p-2'
            placeholder='Tỉ lệ'
            value={gradeScale}
            onChange={(e) => setGradeScale(e.target.value)}
          />
        </Col>
        {item?.children?.length !== 0 && classRole !== CLASS_ROLE.STUDENT && (
          <Col xs={1}>
            <Button
              className='w-100'
              onClick={() =>
                updateGradeColumn({
                  classId: item[child].classId,
                  gradeId: item[child].gradeId,
                  gradeName,
                  gradeScale: Number(gradeScale),
                })
              }
            >
              <MdSaveAs />
            </Button>
          </Col>
        )}
        {classRole !== CLASS_ROLE.STUDENT && (
          <Col xs={1}>
            <Button
              variant='outline-danger'
              onClick={() => deleteGradeColumn(item[child].gradeId)}
            >
              <MdDelete color='red' />
            </Button>
          </Col>
        )}
      </Row>
      <Modal
        show={showFinalizeModal}
        onHide={handleFinalizeModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có chắc chắn muốn công bố cột điểm này không? Hành động này
            không thể hoàn tác.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleFinalizeModalClose}>
            Huỷ
          </Button>
          <Button variant='danger' onClick={handleFinalizeColumn}>
            Chắc chắn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChildColumn;
