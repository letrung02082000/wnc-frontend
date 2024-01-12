import { gradeApi } from '@/api/grade';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ReactSortable } from 'react-sortablejs';
import { MdAdd, MdDelete, MdOutlineDragIndicator, MdSaveAs } from 'react-icons/md';
import AddColumn from './AddColumn';
import { ToastWrapper } from '@/utils';
import { MESSAGE } from '@/constants/message';
import ChildColumn from './ChildColumn';
import ParentColumn from './ParentColumn';

function StructureModal({ classId, classRole }) {
  const [boardStructure, setBoardStructure] = useState([]);
  const [gradeScale, setGradeScale] = useState(0);
  const [gradeName, setGradeName] = useState('');
  const CLASS_ROLE = {
    TEACHER: 'teacher',
    STUDENT: 'student',
    OWNER: 'owner',
  }

  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
    group: 'shared',
  };

  useEffect(() => {
    fetchGradeBoard()
  }, []);

  const fetchGradeBoard = () => {
    gradeApi
      .getGradeStructure(classId)
      .then((res) => {
        setBoardStructure(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const addGradeColumn = (gradeInfo) => {
    const {gradeName, gradeParent, gradeScale} = gradeInfo;

    gradeApi
      .addGradeColumn(classId, gradeInfo)
      .then((res) => {
        ToastWrapper(MESSAGE.GRADE.CREATE.SUCCESS, 'success');
        fetchGradeBoard();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateGradeColumn = (gradeInfo) => {
    gradeApi
      .updateGradeColumn(gradeInfo)
      .then((res) => {
        ToastWrapper(MESSAGE.GRADE.CREATE.SUCCESS, 'success');
        fetchGradeBoard();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteGradeColumn = (columnId) => {
    gradeApi.deleteGradeColumn(columnId).then((res) => {
      ToastWrapper(MESSAGE.GRADE.DELETE.SUCCESS, 'success');
      fetchGradeBoard();
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <ReactSortable list={boardStructure} setList={setBoardStructure}>
      {boardStructure.map((item, idx) => (
        <div key={item.gradeId} className='p-2 mx-2 my-4'>
          <ParentColumn
            classRole={classRole}
            item={item}
            updateGradeColumn={updateGradeColumn}
            deleteGradeColumn={deleteGradeColumn}
          />
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
                <ChildColumn
                  classRole={classRole}
                  key={item[child]?.gradeId}
                  child={child}
                  item={item}
                  updateGradeColumn={updateGradeColumn}
                  deleteGradeColumn={deleteGradeColumn}
                />
              ))}

              <div>
              {[CLASS_ROLE.TEACHER, CLASS_ROLE.OWNER].includes(classRole) && (
                <AddColumn addGradeColumn={addGradeColumn} item={item}/>
              )}
              </div>
            </ReactSortable>
          )}
        </div>
      ))}

      <div className='m-2 p-2'>
        {[CLASS_ROLE.TEACHER, CLASS_ROLE.OWNER].includes(classRole) && (
          <AddColumn addGradeColumn={addGradeColumn} headCol={2}/>
        )}
      </div>
    </ReactSortable>
  );
}

export default StructureModal;
