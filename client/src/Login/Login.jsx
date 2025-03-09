import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../Context/AuthContext"

function Login() {
  const { login } = useAuth(); // Use the login function from context
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { role, email, password } = formData;
    const URL = `http://localhost:7000/api/${role}/login`; // Dynamic API URL

    try {
      const response = await axios.post(URL, { email, password });
      if (response.status === 200) {
        const { token } = response.data; // Extract token from response

        login(token); // Use the login function from context to store the token and update state

        // Redirect to home page
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Something went wrong. Please try again.");
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  const handleReset = () => {
    setFormData({ email: '', password: '', role: 'student' });
    setError('');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">LOGIN FORM</h2>

        {/* Show error message if there's any */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form>
          {/* Role Selection Dropdown */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Select Role</label>
            <select
              id="role"
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="hod">HOD</option>
              <option value="management">Management</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          {/* Buttons aligned in a row with spacing */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-between">
            <button
              type="button"
              className="btn btn-primary w-100 me-md-2"
              onClick={handleLogin}
            >
              Log in
            </button>

            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="mb-0">Not a member? <a href="/signup">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;