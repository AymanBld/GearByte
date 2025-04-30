import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from "../utils/fetchWithAuth";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./AddressesPage.css";

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, addressId: null });

  const [formData, setFormData] = useState({
    country: '',
    city: '',
    street: '',
    postal_code: ''
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetchWithAuth('/Store/address/');
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      }
    } catch (error) {
      setMessage({ text: 'Failed to load addresses', type: 'error' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingAddress 
        ? `/Store/address/${editingAddress.id}/`
        : '/Store/address/';
      
      const method = editingAddress ? 'PUT' : 'POST';
      
      const response = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage({ 
          text: `Address ${editingAddress ? 'updated' : 'added'} successfully`, 
          type: 'success' 
        });
        fetchAddresses();
        resetForm();
      }
    } catch (error) {
      setMessage({ 
        text: `Failed to ${editingAddress ? 'update' : 'add'} address`, 
        type: 'error' 
      });
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      country: address.country,
      city: address.city,
      street: address.street,
      postal_code: address.postal_code
    });
    setShowAddForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await fetchWithAuth(`/Store/address/${addressId}/`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage({ text: 'Address deleted successfully', type: 'success' });
        fetchAddresses();
        setDeleteConfirm({ show: false, addressId: null });
      }
    } catch (error) {
      setMessage({ text: 'Failed to delete address', type: 'error' });
    }
  };

  const resetForm = () => {
    setFormData({
      country: '',
      city: '',
      street: '',
      postal_code: ''
    });
    setEditingAddress(null);
    setShowAddForm(false);
  };

  return (
    <>
      <div className="addresses-page">
        <div className="addresses-container">
          <div className="page-header">
            <h2>Saved Addresses</h2>
            <button 
              className="add-address-btn"
              onClick={() => {
                setShowAddForm(true); 
                setEditingAddress(null);
                setFormData({
                  country: '',
                  city: '',
                  street: '',
                  postal_code: ''
                });
              }}
            >
              <i className='bx bx-plus'></i> Add New Address
            </button>
          </div>

          {message.text && (
            <div className={`alert ${message.type}`}>
              {message.text}
            </div>
          )}

          {showAddForm && (
            <div className="form-container">
              <div className="form-header">
                <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
                <button className="close-btn" onClick={resetForm}>
                  <i className='bx bx-x'></i>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="address-form">
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter country"
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group">
                  <label>Street</label>
                  <textarea
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter street address"
                  />
                </div>

                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter postal code"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    <i className='bx bx-check'></i>
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                  <button type="button" className="cancel-btn" onClick={resetForm}>
                    <i className='bx bx-x'></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="addresses-list">
            {addresses.map((address) => (
              <div key={address.id} className="address-card">
                <div className="address-details">
                  <p><i className='bx bx-globe'></i> {address.country}</p>
                  <p><i className='bx bx-map'></i> {address.street}</p>
                  <p><i className='bx bx-buildings'></i> {address.city}</p>
                  <p><i className='bx bx-envelope'></i> {address.postal_code}</p>
                </div>

                <div className="address-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(address)}
                  >
                    <i className='bx bx-edit'></i> Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => setDeleteConfirm({ show: true, addressId: address.id })}
                  >
                    <i className='bx bx-trash'></i> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.show && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <div className="dialog-header">
              <i className='bx bx-error-circle'></i>
              <h3>Delete Address</h3>
            </div>
            <p>Are you sure you want to delete this address? This action cannot be undone.</p>
            <div className="dialog-actions">
              <button 
                className="cancel-btn"
                onClick={() => setDeleteConfirm({ show: false, addressId: null })}
              >
                Cancel
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(deleteConfirm.addressId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
      <Copyright />
    </>
  );
};

export default AddressesPage;


