import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    userId: '',
    rollnumber: '',
    department: '',
    year: '',
    courses: ''
  });

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchUsers();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:1001/api/courses/viewcourse');
      setCourseList(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:1001/auth/users/students');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInsert = async () => {
    try {
      await axios.post('http://localhost:1001/api/students', selectedUser);
      console.log(selectedUser)
      alert('Student added successfully');
      fetchUsers();
    
      setSelectedUser({
        userId: '',
        rollnumber: '',
        department: '',
        year: '',
        courses: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student');
    }
  };

  // const deleteUser = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:1001/auth/users/student${id}`);
  //     alert('User deleted successfully');
  //     fetchUsers();
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  const setUser = (user) => {
    setSelectedUser((prev) => ({
      ...prev,
      userId: user._id
    }));
  };

  return (
    <div className="container mt-4">
      <h1>View All Users</h1>
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
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setUser(user)}
                >
                  Add
                </button>
                {/* <button
                  className="btn btn-danger me-2"
                  onClick={() => deleteUser(user._id)}
                >
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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Student</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-2">
                  <label>Roll Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedUser.rollnumber}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, rollnumber: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedUser.department}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, department: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Year</label>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedUser.year}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, year: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Course</label>
                  <select
                    className="form-control"
                    value={selectedUser.courses}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, courses: e.target.value })
                    }
                  >
                    <option value="">Select Course</option>
                    {courseList.map((course) => (
                      <option key={course._id} value={course._id}>
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
                onClick={handleInsert}
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
