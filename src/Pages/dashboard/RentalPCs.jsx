import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import Toast from "../../Components/Toast";
import { useClickOutside } from "../../Hooks/use-click-outside";

const RentalPCs = () => {
  const [pcs, setPCs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [selectedPC, setSelectedPC] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPC, setEditedPC] = useState(null);
  const modalRef = useRef(null);

  useClickOutside([modalRef], () => {
    if (selectedPC && !isEditing) {
      setSelectedPC(null);
    }
  });

  useEffect(() => {
    fetchPCs();
  }, []);

  const fetchPCs = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('rental/pcs/');
      if (!response.ok) {
        throw new Error('Failed to fetch PCs');
      }
      const data = await response.json();
      setPCs(data.results);
    } catch (err) {
      setError(err.message);
      setToast({
        show: true,
        message: 'Failed to fetch PCs',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetchWithAuth(`rental/pcs/${id}/`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete PC');
      }

      setPCs(pcs.filter(pc => pc.id !== id));
      setSelectedPC(null);
      setToast({
        show: true,
        message: 'PC deleted successfully',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to delete PC',
        type: 'error'
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPC({ ...selectedPC });
  };

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    
    if (type === 'file') {
      setEditedPC(prev => ({
        ...prev,
        [name]: files[0] // Store the actual File object
      }));
    } else if (type === 'checkbox') {
      setEditedPC(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setEditedPC(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      
      // Only append image if it's a new file
      if (editedPC.image instanceof File) {
        formData.append('image', editedPC.image);
      }

      // Append other fields
      Object.keys(editedPC).forEach(key => {
        if (key !== 'image' && editedPC[key] !== null && editedPC[key] !== '') {
          const value = typeof editedPC[key] === 'boolean' ? String(editedPC[key]) : editedPC[key];
          formData.append(key, value);
        }
      });

      const response = await fetchWithAuth(`rental/pcs/${editedPC.id}/`, {
        method: 'PATCH',
        body: formData,
        // Don't set Content-Type header - browser will set it automatically for FormData
      });

      if (!response.ok) {
        throw new Error('Failed to update PC');
      }

      const updatedPC = await response.json();
      
      setPCs(prevPCs =>
        prevPCs.map(pc => pc.id === editedPC.id ? updatedPC : pc)
      );
      
      setSelectedPC(updatedPC);
      setIsEditing(false);
      setToast({
        show: true,
        message: 'PC updated successfully!',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to update PC',
        type: 'error'
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPC(null);
  };

  const handleAvailabilityToggle = async (pcId, currentStatus) => {
    try {
      const formData = new FormData();
      formData.append('is_available', !currentStatus);

      const response = await fetchWithAuth(`rental/pcs/${pcId}/`, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update availability');
      }

      // Update local state
      setPCs(prevPCs =>
        prevPCs.map(pc => 
          pc.id === pcId ? { ...pc, is_available: !currentStatus } : pc
        )
      );
      
      if (selectedPC?.id === pcId) {
        setSelectedPC(prev => ({ ...prev, is_available: !currentStatus }));
      }

      setToast({
        show: true,
        message: `PC marked as ${!currentStatus ? 'available' : 'unavailable'}`,
        type: 'success'
      });

    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to update availability',
        type: 'error'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">Rental PCs</h2>
        <Link
          to="/dashboard/add-pc"
          className="bg-[#EA3C3C] text-white px-4 py-2 rounded-lg hover:bg-[#ea3c3cb1] transition"
        >
          Add New PC
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#EA3C3C] text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Specs</th>
              <th className="p-3">Price/Day</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {pcs.map((pc) => (
              <tr 
                key={pc.id} 
                className="border-b hover:bg-gray-50 transition cursor-pointer" 
                onClick={() => setSelectedPC(pc)}
              >
                <td className="p-3">
                  <img 
                    src={pc.image} 
                    alt={pc.name} 
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.target.src = '/default-pc.jpg';
                    }}
                  />
                </td>
                <td className="p-3">
                  <div className="font-semibold">{pc.name}</div>
                  <div className="text-sm text-gray-500">{pc.brand}</div>
                </td>
                <td className="p-3">
                  <div className="text-sm">CPU: {pc.cpu}</div>
                  <div className="text-sm">RAM: {pc.ram}GB</div>
                </td>
                <td className="p-3 font-semibold text-[#EA3C3C]">{pc.price_per_day} DA</td>
                <td className="p-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={pc.is_available}
                      onChange={() => handleAvailabilityToggle(pc.id, pc.is_available)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EA3C3C]"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {pc.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PC Details Dialog */}
      {selectedPC && (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-transparent flex items-center justify-center z-50">
          <div 
            ref={modalRef} 
            className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#EA3C3C]">PC Details</h3>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="edit-btn flex items-center gap-1 px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <i className='bx bx-edit'></i> Edit PC
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column - Image and Status */}
              <div className="space-y-3">
                <div className="relative">
                  <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                    <img 
                      src={isEditing ? (editedPC.image instanceof File ? URL.createObjectURL(editedPC.image) : editedPC.image) : selectedPC.image}
                      alt={isEditing ? editedPC.name : selectedPC.name}
                      className="w-full h-44 object-cover"
                      onError={(e) => {
                        e.target.src = '/default-pc.jpg';
                      }}
                    />
                  </div>
                  {isEditing && (
                    <div className="mt-2">
                      <label className="flex items-center justify-center w-full px-3 py-2 text-sm border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <i className='bx bx-upload mr-2'></i> Choose Image
                        <input
                          type="file"
                          name="image"
                          onChange={handleChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={selectedPC.is_available}
                      onChange={() => handleAvailabilityToggle(selectedPC.id, selectedPC.is_available)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EA3C3C]"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {selectedPC.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Right Column - Details */}
              <div>
                {isEditing ? (
                  <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedPC.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter PC name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={editedPC.brand}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter brand name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CPU</label>
                      <input
                        type="text"
                        name="cpu"
                        value={editedPC.cpu}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter CPU specs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">RAM (GB)</label>
                      <input
                        type="number"
                        name="ram"
                        value={editedPC.ram}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter RAM size"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price per Day (DA)</label>
                      <input
                        type="number"
                        name="price_per_day"
                        value={editedPC.price_per_day}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter price per day"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {selectedPC.name}</p>
                    <p><strong>Brand:</strong> {selectedPC.brand}</p>
                    <p><strong>CPU:</strong> {selectedPC.cpu}</p>
                    <p><strong>RAM:</strong> {selectedPC.ram}GB</p>
                    <p><strong>Price per Day:</strong> {selectedPC.price_per_day} DA</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="w-full bg-[#EA3C3C] text-white px-4 py-2 rounded hover:bg-[#ea3c3cb1]"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleDelete(selectedPC.id)}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedPC(null)}
                    className="w-full bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalPCs;

















