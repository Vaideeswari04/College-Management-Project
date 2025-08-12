import React, { useState } from 'react';
import axios from 'axios';


export default function AddCourses() {
  const [course, setCourse] = useState({
    cname: '',
    cduration: '',
    cdepartment: '',
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1001/api/courses/addcourse', course);
      console.log('Added:', res.data);
      alert('Course added successfully');
      setCourse({ cname: '', cduration: '', cdepartment: '' }); 
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add course');
    }
  };

  return (
    
      <div style={{ maxWidth: '500px', margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center' }}>Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <label>Course Name</label>
          <input
            type="text"
            name="cname"
            value={course.cname}
            onChange={handleChange}
            placeholder="Enter course name"
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
          />

          <label>Department</label>
          <input
            type="text"
            name="cdepartment"
            value={course.cdepartment}
            onChange={handleChange}
            placeholder="Enter department"
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
          />

          <label>Duration</label>
          <input
            type="number"
            name="cduration"
            value={course.cduration}
            onChange={handleChange}
            placeholder="Enter duration"
            required
            style={{ width: '100%', marginBottom: '1.5rem', padding: '0.5rem' }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.7rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add Course
          </button>
        </form>
      </div>
    
  );
}
