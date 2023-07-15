import './AdminStudent.css';
import { useState, useEffect,React } from 'react';
import { BsPencilSquare,BsFillTrashFill } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import {toast} from 'react-toastify';
import axios from 'axios';


const Adminstudent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get( `https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/admin/ViewStudent`)
      .then((response) => {
        setStudents(response.data); 
      })
      .catch((error) => {
        Swal.fire('Error','Failed to fetch students');
      });
  };
  const handleSingleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this student!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/admin/deleteStudent/${id}`)
        .then((response) => {
          Swal.fire('Deleted!', 'Student has been deleted.', 'success');
          fetchStudents();
        })
        .catch((error) => {
          Swal.fire('Error', 'Failed to delete the student.', 'error');
        });
    }
  });
};

  const handleDeleteIconClick = (event, studentId) => {
    event.stopPropagation();
    handleSingleDelete(studentId);
  };


  const [selectedStudents,setSelectedStudents] = useState([]);
const [selectAll,setSelectAll] = useState([]);
const handleStudentSelect = (studentId) => {
  if(selectedStudents.includes(studentId)) {
    setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
  } else {
    setSelectedStudents([...selectedStudents, studentId]);
  }
};

const handleSelectAll = () => {
  if(selectAll) {
    setSelectedStudents([]);
    setSelectAll(false);
  } else {
    const allstudentIds = students.map((item) => item.studentId);
    setSelectedStudents(allstudentIds);
    setSelectAll(true);
  }
};
const handleEditstudent = (studentId) => {
  navigate('/admin/updatestudent', { state: { studentId}});
}

const studentStyle = {
  width: '1rem',
  position: 'static',
  borderRadius: '1px',
  height: '1px',
  cursor: 'pointer',
  
};
const selectedStudentStyle = {
  ...studentStyle,
   backgroundColor: '#c7ddf9',
  position: 'static',
  color:'white',
  alignItems: 'center',
};


const handleDeleteSelected = async () => {
    
  const result = await Swal.fire({
    title: 'Confirm Deletion',
    text: 'Are you sure you want to delete the selected Students?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  });  


  if(result.isConfirmed) {

  try {
    const deleteRequests = selectedStudents.map(id=> {
      return axios.delete('https://8080-ffbbabbebedcbbaecebadafdecbf.project.examly.io/admin/deleteStudent/'+id);
      
    });

    await axios.all(deleteRequests);
    setSelectedStudents([]);
    toast.warning("Selected Students are deleted");
  } catch (error) {
    toast.error("Failed to delete selected students");
}
fetchStudents();
}
};
return (
  <><div className='st_content'>
    <div className='stu-form' >
      <input
        className='stu-input'
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        } }
        type='text'
        id='header-search'
        placeholder='Type here student id to search'
        name='s' />
      <button type='submit' className='stu-button'>
        Search
      </button>
    </div>
    <div className="student_Container">
      <table className='st-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Enrolled Course</th>
            <th>Mobile Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((item) => {
              if (searchTerm === '') {
                return item;
              } else if (item?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())) {
                return item;
              } else {
                return null;
              }
            })
            .map((item) => {
              return (

                <tr key={item.studentId}>
                  <td id={`student${item.studentId}`} style={selectedStudents.includes(item.studentId) ? selectedStudentStyle : studentStyle} onClick={() => handleStudentSelect(item.studentId)}>

                    {selectedStudents.includes(item.studentId) && (<strong> <span className="Accheckmark-icon" style={{ color: "black" }}>✓</span></strong>
                    )} </td>
                  <td>{item.studentId}</td>
                  <td>{item.firstName+' '+item.lastName}</td>
                  <td>{item.courseName}</td>
                  <td>{item.mobile}</td>
                  <td colSpan={2} >
                    <BsPencilSquare onClick={(event) => {
                      event.stopPropagation();
                      handleEditstudent(item.studentId)
                      
                    } } />
                    <br/>
                    <BsFillTrashFill onClick={(event) => handleDeleteIconClick(event,item.studentId)} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
    <div className='button-container'>
      {selectedStudents.length > 0 && (
        <div className='mb-3 d-flex justify-content-end align-items-center'>
          <Button variant='primary' className='ms-3' onClick={handleSelectAll}>{selectAll ? 'Deselect All' : 'Select All'}</Button>
          <Button variant='danger' className='ms-3' onClick={handleDeleteSelected} style={{ marginLeft: '10px' }}>Delete</Button>
        </div>
      )};
    </div>
    <div className='stu-button'>
      <button className='add-student-button' onClick={() => navigate('/admin/addstudent')}>
        <GrAddCircle /> Add student
      </button>
    </div>
  </div></>
  );
};

export default Adminstudent;