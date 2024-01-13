import React, { useEffect, useState } from 'react';
import Review from '../components/grade/Review';
import { gradeApi } from '@/api/grade';
import { Button, Card, Form } from 'react-bootstrap';
import { ToastWrapper } from '@/utils';

function ReviewPage({ classId }) {
  const [gradeReview, setGradeReview] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [explanation, setExplanation] = useState('');
  const [gradeId, setGradeId] = useState('-1');
  const [expectGrade, setExpectGrade] = useState(0);

  useEffect(() => {
    fetchGradeReview();
    fetchGradeStructure();
  }, []);

  const fetchGradeReview = () => {
    gradeApi
      .getGradeReview(classId)
      .then((res) => {
        setGradeReview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchGradeStructure = () => {
    gradeApi
      .getGradeStructure(classId)
      .then((res) => {
        const structure = res.data;
        let gradeList = [];

        for (let index = 0; index < structure.length; index++) {
          const element = structure[index];

          if (element.children.length === 0 && element.isView) {
            gradeList.push({
              value: element.gradeId,
              label: element.gradeName,
            });
          }

          if (element?.children?.length > 0) {
            for (
              let childIndex = 0;
              childIndex < element.children.length;
              childIndex++
            ) {
              const childElement = element.children[childIndex];
              if(element[childElement].isView) {
                console.log(childElement)
                gradeList.push({
                  value: childElement.gradeId,
                  label: childElement.gradeName,
                });
              }
            }
          }
        }

        setGradeList(gradeList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReviewSubmit = () => {
    if (gradeId === '-1') {
      ToastWrapper('Chưa chọn cột điểm', 'error');
      return;
    }

    if (explanation === '') {
      ToastWrapper('Chưa nhập giải thích', 'error');
      return;
    }

    if (expectGrade <= 0) {
      ToastWrapper('Điểm mong muốn phải lớn hơn 0', 'error');
      return;
    }

    gradeApi
      .createReview({
        classId,
        gradeId: Number(gradeId),
        expectGrade: Number(expectGrade),
        explanation,
      })
      .then((res) => {
        ToastWrapper('Tạo yêu cầu thành công', 'success');
        fetchGradeReview();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='mx-5'>
      <h3 className='mt-5 mb-4'>Tạo yêu cầu xem lại</h3>

      <Card className='m-2'>
        <Card.Body>
          <Form.Select
            className='mb-4'
            onChange={(e) => setGradeId(e.target.value)}
          >
            <option value='-1'>Chọn cột điểm</option>
            {gradeList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
          <Form.Control
            className='mb-4'
            type='number'
            placeholder='Điểm mong muốn'
            value={expectGrade}
            onChange={(e) => setExpectGrade(e.target.value)}
          />
          <Form.Control
            className='mb-4'
            as='textarea'
            placeholder='Nhập giải thích'
            rows={3}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
          <Button variant='primary' onClick={handleReviewSubmit}>
            Gửi yêu cầu
          </Button>
        </Card.Body>
      </Card>
      <h3 className='mt-5 mb-3'>Danh sách yêu cầu</h3>
      <div className='d-flex flex-wrap'>
        {gradeReview.map((item) => {
          return <Review key={item?.reviewId} item={item} />;
        })}
      </div>
    </div>
  );
}

export default ReviewPage;
