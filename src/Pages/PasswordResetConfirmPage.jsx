import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from "../utils/fetchWithAuth";

const PasswordResetConfirmPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password1: '',
    password2: ''
  });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password1 !== formData.password2) {
      setToast({
        show: true,
        message: 'Passwords do not match',
        type: 'error'
      });
      return;
    }

    try {
      const response = await fetch('auth/password/reset/confirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          token: token,
          new_password1: formData.password1,
          new_password2: formData.password2
        })
      });

      if (response.ok) {
        setToast({
          show: true,
          message: 'Password successfully reset',
          type: 'success'
        });
        // Redirect to profile settings after 2 seconds
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      setToast({
        show: true,
        message: 'Failed to reset password. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className="password-reset-confirm-page">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="password-reset-container">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="password-reset-form">
          <div className="form-group">
            <label htmlFor="password1">New Password</label>
            <input
              type="password"
              id="password1"
              name="password1"
              value={formData.password1}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">Confirm New Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="reset-password-btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetConfirmPage;
