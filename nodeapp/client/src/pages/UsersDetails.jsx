import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userdata, setUserData] = useState({ name: "", age: "", city: "" });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users/userDetails");
      setUsers(res.data);
      setFilterUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchText) ||
      user.city.toLowerCase().includes(searchText)
    );
    setFilterUsers(filteredUsers);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/user/${id}`);
        getAllUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleAddEvent = () => {
    setUserData({ name: "", age: "", city: "" });
    setIsModalOpen(true);
  };

  const handleDataChange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userdata.name.trim() || !userdata.age || !userdata.city.trim()) {
      return alert("All fields are required.");
    }

    try {
      if (userdata._id) {
        await axios.patch(`http://localhost:8000/user/${userdata._id}`, userdata);
      } else {
        await axios.post("http://localhost:8000/user", userdata);
      }
      setUserData({ name: "", age: "", city: "" });
      closeModal();
      getAllUsers();
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  const updateUserRecord = (user) => {
    setUserData(user);
    setIsModalOpen(true);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">CRUD Application with React.js & Node.js</h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input type="search" className="form-control w-50" placeholder="Search by name or city..." onChange={handleSearchChange} />
        <button className="btn btn-primary ms-3" onClick={handleAddEvent}>Add User</button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>S/No</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>
                <button className="btn btn-success btn-sm" onClick={() => updateUserRecord(user)}>Edit</button>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{userdata._id ? "Update User" : "Add User"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={userdata.name} onChange={handleDataChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" name="age" value={userdata.age} onChange={handleDataChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" value={userdata.city} onChange={handleDataChange} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-success">{userdata._id ? "Update" : "Add"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserDetails;
