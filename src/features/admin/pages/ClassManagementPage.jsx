// ClassManagement.js
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import ClassItemAdmin from '../components/ClassIteamAdmin';
import { adminApi } from '@/api/admin';
import { ToastWrapper } from '@/utils';
import { MESSAGE } from '@/constants/message';

const ClassManagementPage = () => {
  const [classes, setClasses] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' hoặc 'desc'
  console.log("🚀 ~ ClassManagementPage ~ classes:", classes)
  
  useEffect(() => {
    adminApi
      .getListClass()
      .then((res) => {
        setClasses(res?.data);
      })
      .catch((err) => {
        console.log(err);
        ToastWrapper(MESSAGE.ERROR, 'error')
      })
      .finally(() => {
        console.log('done');
      });
  }, []);

  const handleToggleActive = async (classId) => {
    try {
      const response = await adminApi.activeClass(classId);
      if (!response.error) {
        setClasses((prevClass) =>
          prevClass.map((e) =>
            e.classId === classId ? { ...e, isActive: !e.isActive } : e
          )
        );
      }
    } catch (error) {
      console.error('Error toggling class activity', error);
    }
  };

  const handleSortBy = (property) => {
    if (sortBy === property) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
     
    } else {
      setSortBy(property);
      setSortOrder('asc');
    }
    setClasses((prevClasses) => {
      const sortedClasses = [...prevClasses].sort((a, b) => {
        const aValue = typeof a[property] === 'string' ? a[property].toLowerCase() : a[property];
        const bValue = typeof b[property] === 'string' ? b[property].toLowerCase() : b[property];
  
        if (sortOrder === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
  
      return sortedClasses;
    });
  };

  const getArrowIcon = (property) => {
    if (sortBy === property) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  return (
    <Container>
      <h2>Quản lý danh sách lớp</h2>
      <div style={{ marginTop: '20px' }}>
        <Row
          style={{
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#eee',
            padding: '10px',
          }}
        >
          
          <Col xs={3}>
            <Button
              variant="link"
              onClick={() => handleSortBy('name')}
              style={{ textDecoration: 'none' }}
            >
              Tên lớp {getArrowIcon('name')}
            </Button>
          </Col>
          <Col xs={3}>
            <Button
              variant="link"
              onClick={() => handleSortBy('fullname')}
              style={{ textDecoration: 'none' }}
            >
              Chủ lớp {getArrowIcon('fullname')}
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              variant="link"
              onClick={() => handleSortBy('studentCount')}
              style={{ textDecoration: 'none' }}
            >
              Số lượng sinh viên {getArrowIcon('studentCount')}
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              variant="link"
              onClick={() => handleSortBy('teacherCount')}
              style={{ textDecoration: 'none' }}
            >
              Số lượng giáo viên {getArrowIcon('teacherCount')}
            </Button>
          </Col>
          <Col xs={2}></Col>
        </Row>
        {classes.map((classInfo) => (
          <ClassItemAdmin
            key={classInfo.classId}
            classInfo={classInfo}
            onToggleActive={handleToggleActive}
          />
        ))}
      </div>
    </Container>
  );
};

export default ClassManagementPage;
