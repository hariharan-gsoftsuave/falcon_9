import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [userdata, setUserData] = useState({ email: "",username:"",password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loginModalOpen, setloginModalOpen] = useState(false);
  const [rigesterModalOpen, setrigesterModalOpen] = useState(false);
  const [userloginModalOpen, setuserloginModalOpen] = useState(true);

  const handleDataChange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  };

  const closeModal=()=>{
    setloginModalOpen(false);
    
  }
  const openRegister =()=>{
    setrigesterModalOpen(true);
    setuserloginModalOpen(false);
  }
  const tologinpage = ()=>{
    setrigesterModalOpen(false);
    setuserloginModalOpen(true);
  };
  const handlerigestersubmit= async(e)=>{
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:8000/api/users/register", userdata);
      setSuccess("Login successful!");
      console.log("user data:", response.data); 
      // You may want to store this in localStorage
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:8000/api/users/login", userdata);
      setSuccess("Login successful!");
      console.log("data:", response.data);
      console.log(response.data.name);
      if(response.data.name?.trim()){
        window.location.href=`/Users`;
      }else{
        setloginModalOpen(true);
      }
       // You may want to store this in localStorage
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <>
        {userloginModalOpen && 
        <div className="bg-light d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm" style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center mb-4">Login</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">User Name</label>
                <input
                type="username"
                value={userdata.username}
                className="form-control"
                id="username"
                name="username"
                placeholder="username"
                required
                onChange={handleDataChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                type="password"
                value={userdata.password}
                className="form-control"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                onChange={handleDataChange}
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>

            <p className="text-center mt-3 mb-0 text-muted">
            Don't have an account? <a href="#" onClick={openRegister}>Register</a>
            </p>
        </div>
        </div>}
        {loginModalOpen && 
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
      </div>}
      {rigesterModalOpen && 
        <div className="bg-light d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-sm" style={{ minWidth: '320px', maxWidth: '400px', width: '100%' }}>
            <h2 className="text-center mb-4">Register</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handlerigestersubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                type="email"
                value={userdata.email}
                className="form-control"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                onChange={handleDataChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">User Name</label>
                <input
                type="username"
                value={userdata.username}
                className="form-control"
                id="username"
                name="username"
                placeholder="username"
                required
                onChange={handleDataChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                type="password"
                value={userdata.password}
                className="form-control"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                onChange={handleDataChange}
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </form>

            <p className="text-center mt-3 mb-0 text-muted">
            You have an account? <a href="#" onClick={tologinpage}>log in</a>
            </p>
        </div>
        </div>
      }
    </>
  );
};

export default Login;
