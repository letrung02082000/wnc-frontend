import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { adminApi } from '@/api/admin';
import AccountIteam from '../components/AccountIteam';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ToastWrapper } from '@/utils';
import { MESSAGE } from '@/constants/message';

const AccountManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' hoặc 'desc'
  console.log(  JSON.parse(localStorage.getItem("user")))


  useEffect(() => {
    adminApi
      .getListAccount()
      .then((res) => {
        setUsers(res?.data);
      })
      .catch((err) => {
        console.log(err);
        ToastWrapper(MESSAGE.ERROR, 'error')
      })
      .finally(() => {
        console.log('done');
      });
  }, []);

  const handleLockAccount = async (userId) => {
    try {
      const response = await adminApi.lockAccount({ userId });
      if (response.data) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === userId ? { ...user, isLock: !user.isLock } : user
          )
        );
      }
    } catch (error) {
      console.error('Error locking/unlocking account', error);
    }
  };

  const handleMapMssv = async (userId, newMssv) => {
    try {
      const response = await adminApi.mapMssv({ userId, mssv: newMssv });
      if (response.data) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === userId ? { ...user, mssv: newMssv } : user
          )
        );
      }
    } catch (error) {
      console.error('Error mapping MSSV', error);
    }
  };

  const handleSortBy = (property) => {
    if (sortBy === property) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(property);
      setSortOrder('asc');
    }

    setUsers((prevUsers) => {
      const sortedUsers = [...prevUsers].sort((a, b) => {
        const aValue = getProperty(a, property);
        const bValue = getProperty(b, property);

        if (sortOrder === 'asc') {
          return compareValues(aValue, bValue);
        } else {
          return compareValues(bValue, aValue);
        }
      });

      return sortedUsers;
    });
  };

  const getProperty = (obj, path) => {
    const properties = path.split('.');
    return properties.reduce((acc, prop) => acc && acc[prop], obj);
  };

  const compareValues = (valueA, valueB) => {
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    }

    return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
  };

  const getArrowIcon = (property) => {
    if (sortBy === property) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  const handleImportCSV = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      fileInput.remove();
      
      if (!file) {
        alert('Please select a CSV file.');
        return;
      }
      
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await adminApi.mapMssvByCsv(formData);

        // Handle response from the server
        if (!response.error) {
          const responseUsers = await adminApi.getListAccount();
          setUsers(responseUsers.data);
        } else {
          alert('Error importing CSV file.');
        }
      } catch (error) {
        console.error('Error importing CSV file', error);
      }
    });
    fileInput.click();
  };

  return (
    <Container>
      <h2>Quản lý danh sách tài khoản</h2>
      <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Col xs={12}>
          <Button variant="primary" onClick={handleImportCSV}>
            Gắn mssv bằng file csv
          </Button>
        </Col>
      </Row>
      <Row
        style={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#eee',
          padding: '10px',
        }}
      >
        <Col xs={1}>
          <Button
            variant="link"
            onClick={() => handleSortBy('userId')}
            style={{ textDecoration: 'none' }}
          >
            UserId{getArrowIcon('userId')}
          </Button>
        </Col>
        <Col xs={4}>
          <Button
            variant="link"
            onClick={() => handleSortBy('email')}
            style={{ textDecoration: 'none' }}
          >
            Email {getArrowIcon('email')}
          </Button>
        </Col>
        <Col xs={3}>
          <Button
            variant="link"
            onClick={() => handleSortBy('fullname')}
            style={{ textDecoration: 'none' }}
          >
            Tên {getArrowIcon('fullname')}
          </Button>
        </Col>
        <Col xs={2}>
          <Button
            variant="link"
            onClick={() => handleSortBy('mssv')}
            style={{ textDecoration: 'none' }}
          >
            MSSV {getArrowIcon('mssv')}
          </Button>
        </Col>
        <Col xs={2}></Col>
      </Row>

      {users.map((user) => (
        <AccountIteam
          key={user.userId}
          user={user}
          onLockAccount={handleLockAccount}
          onMapMssv={handleMapMssv}
        />
      ))}
    </Container>
  );
};

export default AccountManagementPage;
