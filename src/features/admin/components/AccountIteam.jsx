import React, { useState } from 'react';
import { Button, Col, Row, Modal, Form } from 'react-bootstrap';

const AccountItem = ({ user, onLockAccount, onMapMssv }) => {
  const { userId, email, fullname, isLock, mssv } = user;

  const [showModal, setShowModal] = useState(false);
  const [newMssv, setNewMssv] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewMssv('');
  };

  const handleConfirmMssv = async () => {
    // Call the callback function from the parent with newMssv and userId
    onMapMssv(userId, newMssv);
    handleCloseModal();
  };

  const handleRemoveOldMssv = async () => {
    onMapMssv(userId, null);
    handleCloseModal();
  };

  return (
    <>
      <Row
        style={{
          border: '1px solid #d4d4d4',
          borderRadius: '5px',
          marginBottom: '10px',
          padding: '10px',
          borderColor: isLock ? '#dc3545' : '#28a745',
        }}
      >
        <Col xs={1}>{userId}</Col>
        <Col xs={4}>{email}</Col>
        <Col xs={3}>{fullname}</Col>
        <Col xs={2}>{mssv}</Col>
        <Col xs={2}>
          <Button
            style={{ marginRight: '10px' }}
            variant={isLock ? 'success' : 'danger'}
            onClick={() => onLockAccount(userId)}
          >
            {isLock ? 'Mở' : 'Khóa'}
          </Button>
          <Button variant="success" onClick={handleShowModal}>
            Gắn MSSV
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập MSSV mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewMssv">
            <Form.Label>MSSV mới:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập MSSV mới"
              value={newMssv}
              onChange={(e) => setNewMssv(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {mssv ? (
            <Button variant="danger" onClick={handleRemoveOldMssv}>
              Gỡ mssv cũ
            </Button>
          ) : null}
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          
          <Button variant="primary" onClick={handleConfirmMssv}>
            Xác nhận
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccountItem;
