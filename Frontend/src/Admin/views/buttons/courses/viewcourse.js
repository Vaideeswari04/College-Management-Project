import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ViewCourses() {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState({ cname: '', cduration: '', cdepartment: '' })
  

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:1001/api/courses/viewcourse')
      setCourses(res.data)
    } catch (err) {
      console.error('Error fetching courses:', err)
    }
  }

  const openUpdateModal = async (id) => {
    try {
      const res = await axios.get(`http://localhost:1001/api/courses/viewcourse/${id}`)
      setSelectedCourse(res.data)
    } catch (err) {
      console.error('Error fetching course by ID:', err)
    }
  }

  const handleChange = (e) => {
    setSelectedCourse({ ...selectedCourse, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:1001/api/courses/updateCourse/${selectedCourse._id}`, selectedCourse)
      alert('Course updated successfully')
      fetchCourses()
      
    } catch (err) {
      console.error('Error updating course:', err)
    }
  }

//   const handleDelete = async (id) => {
//   try {
//     await axios.delete(`http://localhost:1001/api/courses/${id}`);
//     alert("Course deleted");
//     fetchCourses();
//   } catch (err) {
//     console.error("Error deleting course:", err);
//     alert("Failed to delete");
//   }
// };


  return (
    <div style={{ padding: 20 }}>
      <h2>Courses List</h2>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
          courses.map(course => (
            <tr key={course._id}>
              <td>{course.cname}</td>
              <td>{course.cdepartment}</td>
              <td>{course.cduration}</td>
              <td>
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  onClick={() => openUpdateModal(course._id)}
                >
                  Update
                </button>
                
                {/* <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">Update Course</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="cname"
                  value={selectedCourse.cname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="cdepartment"
                  value={selectedCourse.cdepartment}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  className="form-control"
                  name="cduration"
                  value={selectedCourse.cduration}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                type="button"
                className="btn btn-success"
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
  )
}
