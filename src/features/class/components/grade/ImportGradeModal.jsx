import FileUploader from '@/components/form/FileUploader';
import { API_URL } from '@/constants/endpoints';
import { MESSAGE } from '@/constants/message';
import { ToastWrapper, exportToCSV } from '@/utils';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ReactSelect from 'react-select';

function ImportGradeModal({gradeList}) {
  const [uploading, setUploading] = useState(false);
  const [gradeId, setGradeId] = useState('');
  const endpoint = `${API_URL}/grade/import-assignment/`;

  const downloadTemplate = () => {
    const fileName = 'grade-list';
    const csvData = [
      {
        StudentId: '18120622',
        Grade: '9.5',
      }
    ]
    exportToCSV(csvData, fileName);
  };

  const handleResponse = (res) => {
    ToastWrapper(MESSAGE.IMPORT.SUCCESS, 'success');
  };

  return (
    <div className='d-flex flex-column'>
      <Form.Label>Chọn cột điểm</Form.Label>
      <ReactSelect className='mb-2' options={gradeList} onChange={(v) => setGradeId(v.value)} />
      <FileUploader
        name='file'
        uploadUrl={endpoint + gradeId}
        uploading={uploading}
        setUploading={setUploading}
        onResponse={handleResponse}
        accept={{ 'text/csv': [] }}
        gradeList={gradeList}
      />
      <p className='mt-5'>
        Tải xuống mẫu{' '}
        <a href='#' onClick={downloadTemplate}>
          grade-list.csv
        </a>
      </p>
    </div>
  );
}

export default ImportGradeModal;
