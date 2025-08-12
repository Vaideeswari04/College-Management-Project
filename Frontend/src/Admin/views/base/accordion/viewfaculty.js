import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subject, setSubject] = useState([]);

  const [addFaculty, setAddFaculty] = useState({
    userId: '',
    employeeId: '',
    courseId: '',
    subjects: [] // store as array because schema expects array
  });

  useEffect(() => {
    viewFaculty();
    viewCourse();
    listSubject();
  }, []);

  const viewFaculty = () => {
    axios
      .get('http://localhost:1001/auth/users/faculty')
      .then((response) => setFaculty(response.data))
      .catch((error) => console.log('all faculty error', error));
  };

  const viewCourse = () => {
    axios
      .get('http://localhost:1001/api/courses/viewcourse')
      .then((response) => setCourses(response.data))
      .catch((error) => console.log('view course error', error));
  };

  const listSubject = () => {
    axios
      .get('http://localhost:1001/api/sub')
      .then((response) => setSubject(response.data))
      .catch((error) => console.log('view subject error', error));
  };

  const handleFaculty = (allfaculty) => {
    setAddFaculty((prev) => ({
      ...prev,
      userId: allfaculty._id
    }));
  };

  const handleInsert = async () => {
    try {
      console.log(addFaculty);
      await axios.post('http://localhost:1001/api/addfaculty', addFaculty);
      alert('Faculty added successfully');
      setAddFaculty({
        userId: '',
        employeeId: '',
        courseId: '',
        subjects: []
      });
    } catch (err) {
      console.log('axios error:', err);
    }
  };

  return (
    <>
      <div className="container m-4">
        <h1>Faculty</h1>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((allfaculty) => (
              <tr key={allfaculty._id}>
                <td>{allfaculty.name}</td>
                <td>{allfaculty.email}</td>
                <td>{allfaculty.role}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleFaculty(allfaculty)}
                  >
                    Add Faculty
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
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
                Add Faculty
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                
                <div className="form-group mb-3">
                  <label className="col-form-label">Employee ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addFaculty.employeeId}
                    onChange={(e) =>
                      setAddFaculty((prev) => ({
                        ...prev,
                        employeeId: e.target.value
                      }))
                    }
                  />
                </div>

                
                <div className="mb-3">
                  <label className="col-form-label">Select Course:</label>
                  <select
                    id="course"
                    className="form-select"
                    value={addFaculty.courseId}
                    onChange={(e) =>
                      setAddFaculty((prev) => ({
                        ...prev,
                        courseId: e.target.value,
                        subjects: [] 
                      }))
                    }
                  >
                    <option value="">-- Select Course --</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.cname}
                      </option>
                    ))}
                  </select>
                </div>

                
                <div>
                  <label className="col-form-label">Select Subject:</label>
                  <select
                    id="subject"
                    className="form-select mb-3"
                    value={addFaculty.subjects[0] || ''} 
                    onChange={(e) =>
                      setAddFaculty((prev) => ({
                        ...prev,
                        subjects: [e.target.value] 
                      }))
                    }
                  >
                    <option value="">-- Select Subject --</option>
                    {subject
                      .filter(
                        (sub) =>
                          String(sub.courseId) === String(addFaculty.courseId)
                      )
                      .map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.subjectname}
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
                onClick={handleInsert}
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFaculty;
