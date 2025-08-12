import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStudent = () => {
  const [student, setStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({
    userId:'',
    rollnumber: '',
    department: '',
    year: '',
    courses:''
  });

  const[courseList,setCourseList]=useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:1001/api/courses/viewcourse')
  .then(response=>{
    setCourseList(response.data)
  })
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get('http://localhost:1001/api/stud');
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Handle update
  const handleUpdate = async () => {
  
    try {
     console.log(selectedStudent)
      await axios.put(`http://localhost:1001/api/stud/${selectedStudent._id}`, selectedStudent);
      console.log("hi")
      alert('Student updated successfully');
      location.reload()
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

// const deleteUser=async(id)=>{
// try{
//     await axios.delete(`http://localhost:1001/auth/${id}`)
//     alert('user deleted successfully');
//     fetchStudent();
// }catch(error){
//     console.error('Error updating course:', error);
// }
// }

const setUser=(user)=>{
setSelectedStudent(prev=>({
  ...prev,userId:user._id
}));
}


return (
    <div className="container mt-4">
      <h1>View Students</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">RollNumber</th>
            <th scope="col">Department</th>
            <th scope="col">Year</th>
            <th scope="col">Course</th>
           <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {student.map((user, index) => (
            <tr key={index}>
              <td>{user.rollnumber}</td>
              <td>{user.department}</td>
              <td>{user.year}</td>
               <td>
  {
    courseList.find(c => String(c._id) === String(user.courses[0]))?.cname
    ?? 'No course'
  }
</td>

              <td>
               
               <button
                  type="button"
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setSelectedStudent(user)}
                >
              Update
                </button>
                {/* <button className="btn btn-danger me-2" 
                onClick={() => deleteUser(user._id)}>Delete</button> */}
                            
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>



          <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Student
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label className="col-form-label">Rollnumber:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedStudent.rollnumber}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, rollnumber: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Department:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedStudent.department}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, department:e.target.value})
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Year:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedStudent.year}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, year: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Courses:</label>
                  <select
  className="form-select"
  value={selectedStudent.courses || ''}
  onChange={e =>
    setSelectedStudent({ ...selectedStudent, courses: e.target.value })
  }
  required
>
  <option value="">-- Select Course --</option>
  {courseList.map(course => (
    <option key={(course._id)} value={(course._id)}>
      {course.cname}
    </option>
  ))}
</select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
                data-bs-dismiss="modal"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewStudent;