import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from "../utils/fetchWithAuth";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import Toast from "../Components/Toast"; 
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetchWithAuth('/auth/user/');
      if (response.ok) {
        const data = await response.json();
        setProfile({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone || ''
        });
      }
    } catch (error) {
      setToast({ show: true, message: 'Failed to load profile', type: 'error' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiData = {
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
        phone: profile.phone
      };

      const response = await fetchWithAuth('auth/user/', {
        method: 'PATCH',
        body: JSON.stringify(apiData)
      });

      if (response.ok) {
        setToast({ show: true, message: 'Profile updated successfully', type: 'success' });
        setIsEditing(false);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setToast({ show: true, message: 'Failed to update profile', type: 'error' });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    fetchProfile();
  };

  const handlePasswordResetRequest = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmReset = async () => {
    try {
      const response = await fetchWithAuth('auth/password/reset/', {
        method: 'POST',
        body: JSON.stringify({ email: profile.email })
      });

      if (response.ok) {
        setToast({ 
          show: true, 
          message: 'Password reset link has been sent to your email', 
          type: 'success' 
        });
      } else {
        throw new Error('Failed to send reset email');
      }
    } catch (error) {
      setToast({ 
        show: true, 
        message: 'Failed to send reset email', 
        type: 'error' 
      });
    } finally {
      setShowConfirmDialog(false);
    }
  };

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {showConfirmDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <h3>Confirm Password Reset</h3>
            <p>Are you sure you want to reset your password? A reset link will be sent to your email address.</p>
            <div className="confirm-dialog-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn"
                onClick={handleConfirmReset}
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="profile-page">
        <div className="profile-container">
          <h2>Profile Settings</h2>

          <div className="profile-sections">
            {/* Profile Edit Section */}
            <div className="profile-edit-section">
              <div className="section-header">
                <h3>Personal Information</h3>
                {!isEditing && (
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className='bx bx-edit'></i> Edit Profile
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="profile-info">
                  <div className="info-group">
                    <label>First Name</label>
                    <p>{profile.firstName || '-'}</p>
                  </div>
                  <div className="info-group">
                    <label>Last Name</label>
                    <p>{profile.lastName || '-'}</p>
                  </div>
                  <div className="info-group">
                    <label>Email</label>
                    <p>{profile.email || '-'}</p>
                  </div>
                  <div className="info-group">
                    <label>Phone</label>
                    <p>{profile.phone || '-'}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        firstName: e.target.value
                      }))}
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        lastName: e.target.value
                      }))}
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        email: e.target.value
                      }))}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        phone: e.target.value
                      }))}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="profile-actions">
                    <button type="submit" className="save-btn">
                      <i className='bx bx-check'></i> Save Changes
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={handleCancelClick}
                    >
                      <i className='bx bx-x'></i> Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Password Change Section */}
            <div className="password-section">
              <div className="section-header">
                <h3>Password Settings</h3>
              </div>
              <div className="password-content">
                <p className="password-info">
                  To change your password, click the button below. We'll send you an email with instructions to reset your password.
                </p>
                <button
                  type="button"
                  className="change-password-btn"
                  onClick={handlePasswordResetRequest}
                >
                  <i className='bx bx-lock-alt'></i> Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default ProfilePage;














