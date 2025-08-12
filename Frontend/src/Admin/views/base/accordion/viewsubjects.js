import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewSubjects = () => {
  const [courses, setCourses] = useState([]);
  const [viewSub, setViewSub] = useState([]);
  const [subjects, setSubjects] = useState({
    _id: '',
    courseId: '',
    subjectname: '',
    semester: '',
    
  });

  useEffect(() => {
    viewSubjects();
    fetchCourses();
  }, []);

  const viewSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:1001/api/sub');
      setViewSub(response.data);
    } catch (error) {
      console.log('Error fetching subjects:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:1001/api/courses/viewcourse');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:1001/api/update/${subjects._id}`, subjects);
      alert('Subject updated successfully');
      location.reload()
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  // const deleteSubject = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:1001/api/sub/${id}`);
  //     alert('Subject deleted successfully');
  //     viewSubjects();
  //   } catch (error) {
  //     console.error('Error deleting subject:', error);
  //   }
  // };

  return (
    <div className="container mt-4">
      <h1>All Subjects</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Subject Name</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {viewSub.map((sub, index) => (
            <tr key={index}>
              <td>{courses.find(course => String(course._id) === String(sub.courseId))?.cname || 'N/A'}</td>

              <td>{sub.subjectname}</td>
              <td>{sub.semester}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setSubjects(sub)}
                >
                  Update
                </button>
                {/* <button className="btn btn-danger" onClick={() => deleteSubject(sub._id)}>
                  Delete
                </button> */}
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
              <h5 className="modal-title" id="exampleModalLabel">Update Subject</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label className="col-form-label">Subject Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subjects.subjectname}
                    onChange={(e) =>
                      setSubjects({ ...subjects, subjectname: e.target.value })
                    }
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="col-form-label">Semester:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={subjects.semester}
                    onChange={(e) =>
                      setSubjects({ ...subjects, semester: e.target.value })
                    }
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="col-form-label">Course:</label>
                  <select
                    className="form-select"
                    value={subjects.courseId}
                    onChange={(e) =>
                      setSubjects({ ...subjects, courseId: e.target.value })
                    }
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course._id} value={course._id}>
                        {course.cname}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate} data-bs-dismiss="modal">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubjects;
