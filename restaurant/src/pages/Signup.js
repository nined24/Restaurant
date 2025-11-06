import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/signup', {
        username,
        password,
        role,
      });

      const { token, username: userUsername, role: userRole } = response.data;
      login({ username: userUsername, role: userRole }, token);
      toast.success('Signup successful!');

      // Redirect based on role
      if (userRole === 'CUSTOMER') {
        navigate('/qr-scan');
      } else if (userRole === 'KITCHEN_STAFF') {
        navigate('/kitchen');
      } else if (userRole === 'MANAGER') {
        navigate('/manager');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Signup failed';
      console.error('Signup error:', error.response?.data || error.message);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Gustoso</h1>
        <p className="login-subtitle">Sign Up</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control"
              required
            >
              <option value="CUSTOMER">Customer</option>
              <option value="KITCHEN_STAFF">Kitchen Staff</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
              placeholder="Choose a password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          <div className="signup-button-container">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;