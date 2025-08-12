import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [editAdmin, setEditAdmin] = useState({
    name: '',
    email: ''
  });

  
  useEffect(() => {
    axios.get(`http://localhost:1001/auth/admin`)
    .then((response=>{
      setAdmins(response.data)
      
    }))
    .catch((err)=>console.log("error",err))
  }, []);


  const handleEditClick = (admin) => {
    setEditAdmin({
     
      name: admin.name,
      email: admin.email
    });
  };

  
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:1001/auth/update/${editAdmin._id}`, {
        name: editAdmin.name,
        email: editAdmin.email
      });
      alert('Admin updated successfully!');
     location.reload()
    } catch (error) {
      console.error('Error updating admin:', error);
      alert('Error updating admin');
    }
  };

  return (
    <div className="container mt-4">
      <h1>View All Admin</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={index}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  onClick={() => handleEditClick(admin)}
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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Admin</h5>
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
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editAdmin.name}
                    onChange={(e) =>
                      setEditAdmin({ ...editAdmin, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editAdmin.email}
                    onChange={(e) =>
                      setEditAdmin({ ...editAdmin, email: e.target.value })
                    }
                  />
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

export default ViewAdmin;
