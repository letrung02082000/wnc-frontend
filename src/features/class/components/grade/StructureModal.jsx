import { gradeApi } from '@/api/grade';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ReactSortable } from 'react-sortablejs';
import { MdAdd, MdOutlineDragIndicator, MdSaveAs } from 'react-icons/md';
import AddColumn from './AddColumn';

function StructureModal({ classId }) {
  const [boardStructure, setBoardStructure] = useState([]);
  const [gradeScale, setGradeScale] = useState(0);
  const [gradeName, setGradeName] = useState('');

  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
    group: 'shared',
  };

  useEffect(() => {
    gradeApi
      .getGradeStructure(classId)
      .then((res) => {
        setBoardStructure(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addGradeColumn = (gradeInfo) => {
    console.log(gradeInfo)
    const {gradeName, gradeParent, gradeScale} = gradeInfo;

    if (!gradeName || !gradeScale || !gradeParent) {
      return;
    }

    // gradeApi
    //   .addGradeColumn(classId, gradeInfo)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const updateGradeColumn = (gradeInfo) => {
    console.log(gradeInfo)

  }

  return (
    <ReactSortable list={boardStructure} setList={setBoardStructure}>
      {boardStructure.map((item, idx) => (
        <div key={item.id} className='p-2 mx-2 my-4'>
          <Row className='d-flex align-items-center mb-2'>
            <Col xs={1}>
              <MdOutlineDragIndicator />
            </Col>
            <Col xs={5}>
              <input className='p-2 w-100' value={item.gradeName} />
            </Col>
            <Col xs={3}>
              <input
                type='number'
                className='w-100 p-2'
                placeholder='Tỉ lệ'
                onChange={(e) => setGradeScale(e.target.value)}
                value={item.gradeScale}
              />
            </Col>
            <Col xs={3}>
              <Button
                className='w-100'
                onClick={() => updateGradeColumn(item?.gradeId || 0)}
              >
                <MdSaveAs />
              </Button>
            </Col>
          </Row>
          {item.children && (
            <ReactSortable
              list={item.children}
              setList={(children) =>
                setBoardStructure([
                  ...boardStructure.slice(0, idx),
                  { ...item, children },
                  ...boardStructure.slice(idx + 1),
                ])
              }
            >
              {item.children.map((child) => (
                <Row key={child.id} className='d-flex align-items-center mb-2'>
                  <Col xs={1}></Col>
                  <Col xs={1}>
                    <MdOutlineDragIndicator />
                  </Col>
                  <Col xs={4}>
                    <input
                      className='p-2 w-100'
                      value={item[child].gradeName}
                    />
                  </Col>
                  <Col xs={3}>
                    <input
                      type='number'
                      className='w-100 p-2'
                      placeholder='Tỉ lệ'
                      value={item[child].gradeScale}
                      onChange={(e) => setGradeScale(e.target.value)}
                    />
                  </Col>
                  <Col xs={3}>
                    <Button
                      className='w-100'
                      onClick={() => updateGradeColumn(item?.gradeId || 0)}
                    >
                      <MdSaveAs />
                    </Button>
                  </Col>
                </Row>
              ))}

              <AddColumn addGradeColumn={addGradeColumn} item={item} />
            </ReactSortable>
          )}
        </div>
      ))}

      <div className='m-2 p-2'>
        <AddColumn addGradeColumn={addGradeColumn} />
      </div>
    </ReactSortable>
  );
}

export default StructureModal;
