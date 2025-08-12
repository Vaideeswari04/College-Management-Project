import axios from "axios";
import { useEffect, useState } from "react";

const AddSubject = () => {
  const [subject, setSubject] = useState({
    subjectname: "",
    semester: "",
    courseId: "",
  });
  const [courses, setCourses] = useState([]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted:", subject);

  

  try {
    const res = await axios.post("http://localhost:1001/api/subject", subject);
    console.log('Response:', subject);
    alert('Subject added successfully');
    setSubject({
      subjectname: "",
      semester: "",
      courseId: ""
    });
  } catch (err) {
    console.error('Request failed:', err);
    alert('Failed to add subject');
  }
};



  useEffect(() => {
    axios
      .get("http://localhost:1001/api/courses/viewcourse")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, []);

  return (
    <div className="container mt-3">
      <h2>Add Subject</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group mb-2">
          <label htmlFor="course" className="col-form-label">
            Select Course:
          </label>
          <select
            id="course"
            value={subject.courseId}
            onChange={(e) =>
              setSubject({ ...subject, courseId: e.target.value })
            }
            className="form-select"
          >
            <option value="">-- Select --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.cname}
              </option>
            ))}
          </select>
        </div>


        <div className="mb-3">
          <label>Subject Name</label>
          <input
            type="text"
            className="form-control"
            value={subject.subjectname}
            onChange={(e) =>
              setSubject({ ...subject, subjectname: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label>Semester</label>
          <input
            type="text"
            className="form-control"
            value={subject.semester}
            onChange={(e) =>
              setSubject({ ...subject, semester:Number( e.target.value) })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Subject
        </button>
      </form>
    </div>
  );
};

export default AddSubject;