import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function ViewCourses() {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:1001/api/courses/viewcourse')
      setCourses(res.data)
    } catch (err) {
      console.error(err.message)
    }
  }

  const loadCourse = async (id) => {
    try {
      const res = await axios.get(`http://localhost:1001/api/courses/viewcourse/${id}`)
      setSelectedCourse(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = e => {
    setSelectedCourse({ ...selectedCourse, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:1001/api/courses/updateCourse/${selectedCourse._id}`,
        selectedCourse
      )
      alert('Course updated successfully')
      fetchCourses()
      
      setSelectedCourse(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container mt-4">
      <h2>Courses List</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr><th>Name</th><th>Dept</th><th>Duration</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c._id}>
              <td>{c.cname}</td>
              <td>{c.cdepartment}</td>
              <td>{c.cduration}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  onClick={() => loadCourse(c._id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">
                Update Course
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedCourse ? (
                <>
                  <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input
                      type="text"
                      name="cname"
                      className="form-control"
                      value={selectedCourse.cname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      name="cdepartment"
                      className="form-control"
                      value={selectedCourse.cdepartment}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      name="cduration"
                      className="form-control"
                      value={selectedCourse.cduration}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleUpdate}
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
