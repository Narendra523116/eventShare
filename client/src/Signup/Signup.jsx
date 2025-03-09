import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Signup() {
  const { login } = useAuth(); // Use the login function from context
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
    dept: "",
    year: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("Form Data before sending:", formData);

    const baseUrl = "http://localhost:7000";

    try {
      let apiUrl = "/api/student";
      if (role === "faculty") apiUrl = "/api/faculty";
      else if (role === "hod") apiUrl = "/api/hod";
      else if (role === "management") apiUrl = "/api/management";

      let url = baseUrl + apiUrl + "/signup";
      console.log(url);

      const response = await axios.post(url, { ...formData, role });

      // Extract token from response
      const { token } = response.data;

      login(token); // Use the login function from context to store the token and update state

      setMessage("Signup successful! Please log in.");
      navigate('/'); // Redirect to home page
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Signup failed"));
    }
  };

  const handleReset = () => {
    setFormData({
      id: "",
      username: "",
      email: "",
      password: "",
      mobileNumber: "",
      dept: "",
      year: "",
    });
    setMessage("");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">SIGNUP FORM </h2>
        {message && <p className="alert alert-info">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Your Role:</label>
            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="hod">HOD</option>
              <option value="management">Management</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Id:</label>
            <input type="text" name="id" className="form-control" value={formData.id} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile Number:</label>
            <input type="text" name="mobileNumber" className="form-control" value={formData.mobileNumber} onChange={handleChange} required />
          </div>

          {(role === "student" || role === "faculty" || role === "hod") && (
            <div className="mb-3">
              <label className="form-label">Department:</label>
              <input type="text" name="dept" className="form-control" value={formData.dept} onChange={handleChange} required />
            </div>
          )}

          {role === "student" && (
            <div className="mb-3">
              <label className="form-label">Year:</label>
              <input type="number" name="year" className="form-control" value={formData.year} onChange={handleChange} required />
            </div>
          )}

          {/* Buttons aligned in a row with spacing */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-between">
            <button
              type="submit"
              className="btn btn-primary w-100 me-md-2"
            >
              SignUp
            </button>

            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <span>Already a user? </span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;