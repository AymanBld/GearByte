import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/fetchWithAuth';
import Toast from '../../components/Toast';

const AddPC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [pc, setPC] = useState({
    name: '',
    brand: '',
    cpu: '',
    ram: '',
    storage: '',
    gpu: '',
    display_size: '',
    operating_system: '',
    description: '',
    price_per_day: '',
    image: null,
    is_available: true
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setPC(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      Object.keys(pc).forEach(key => {
        if (pc[key] !== null && pc[key] !== '') {
          const value = typeof pc[key] === 'boolean' ? String(pc[key]) : pc[key];
          formData.append(key, value);
        }
      });

      const response = await fetchWithAuth('rental/pcs/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add PC');
      }

      setToast({
        show: true,
        message: 'PC added successfully!',
        type: 'success'
      });

      setTimeout(() => {
        navigate('/dashboard/rental-pcs');
      }, 2000);

    } catch (err) {
      setToast({
        show: true,
        message: err.message,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Add New PC</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={pc.name}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                required
                placeholder="Enter PC name"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={pc.brand}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                required
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">CPU</label>
              <input
                type="text"
                name="cpu"
                value={pc.cpu}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                required
                placeholder="Enter CPU specifications"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">RAM (GB)</label>
              <input
                type="number"
                name="ram"
                value={pc.ram}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                required
                placeholder="Enter RAM size"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Storage (GB)</label>
              <input
                type="number"
                name="storage"
                value={pc.storage}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                required
                placeholder="Enter storage size"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                GPU <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                name="gpu"
                value={pc.gpu}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="Enter GPU specifications"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Display Size <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                name="display_size"
                value={pc.display_size}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="Enter display size"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Operating System <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                name="operating_system"
                value={pc.operating_system}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="Enter operating system"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Price per Day (DA)</label>
              <div className="relative">
                <input
                  type="number"
                  name="price_per_day"
                  value={pc.price_per_day}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all pr-12"
                  required
                  placeholder="Enter price per day"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={pc.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none"
                required
                placeholder="Enter PC description"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-lg font-medium text-gray-700 mb-2">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/dashboard/rental-pcs')}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add PC'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPC;




