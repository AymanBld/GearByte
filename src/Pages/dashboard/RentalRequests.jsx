import React, { useState, useEffect, useRef } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import Toast from "../../components/Toast";
import { useClickOutside } from "../../Hooks/use-click-outside";

const RentalRequests = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRental, setSelectedRental] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [editedDates, setEditedDates] = useState({ rental_date: '', return_date: '' });
  const [isDateModified, setIsDateModified] = useState(false);
  const modalRef = useRef(null);

  useClickOutside([modalRef], () => {
    if (selectedRental) {
      setSelectedRental(null);
    }
  });
  
  useEffect(() => {
    fetchRentals();
  }, []);

  useEffect(() => {
    if (selectedRental) {
      setEditedDates({
        rental_date: formatDateForInput(selectedRental.rental_date),
        return_date: formatDateForInput(selectedRental.return_date)
      });
      setIsDateModified(false);
    }
  }, [selectedRental]);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const url = 'rental/';
      
      const response = await fetchWithAuth(url);
      if (!response.ok) {
        throw new Error('Failed to fetch rental requests');
      }
      const data = await response.json();
      setRentals(data.results || data);
    } catch (err) {
      setError(err.message);
      setToast({
        show: true,
        message: 'Failed to fetch rental requests',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (field, value) => {
    setEditedDates(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDateModified(true);
  };

  const updateRentalDates = async () => {
    try {
      const response = await fetchWithAuth(`rental/${selectedRental.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rental_date: editedDates.rental_date,
          return_date: editedDates.return_date
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update rental dates');
      }

      const updatedRental = await response.json();
      
      // Update the rentals list with the updated rental
      setRentals(prevRentals =>
        prevRentals.map(rental =>
          rental.id === selectedRental.id ? updatedRental : rental
        )
      );

      // Update the selected rental
      setSelectedRental(updatedRental);

      setToast({
        show: true,
        message: 'Rental dates updated successfully',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to update rental dates',
        type: 'error'
      });
    }
  };

  // Add this function to handle PC return confirmation
  const confirmPCReturn = async (rentalId) => {
    try {
      const response = await fetchWithAuth(`rental/confirm-return/${rentalId}/`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to confirm PC return');
      }

      // Update the rentals list to reflect the change
      setRentals(prevRentals =>
        prevRentals.map(rental =>
          rental.id === rentalId ? { ...rental, is_active: false } : rental
        )
      );

      // Update the selected rental if it's currently selected
      if (selectedRental && selectedRental.id === rentalId) {
        setSelectedRental(prev => ({ ...prev, is_active: false }));
      }

      setToast({
        show: true,
        message: 'PC return confirmed successfully',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: err.message || 'Failed to confirm PC return',
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

      <h2 className="text-3xl font-bold text-black mb-6 text-center">Rental Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#EA3C3C] text-white">
            <tr>
              <th className="p-4">Rental ID</th>
              <th className="p-4">User</th>
              <th className="p-4">PC</th>
              <th className="p-4">Rental Date</th>
              <th className="p-4">Return Date</th>
              <th className="p-4">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental, index) => (
              <tr
                key={rental.id}
                onClick={() => setSelectedRental(rental)}
                className={`border-b hover:bg-gray-50 transition cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4">
                  <div className={`text-center font-semibold px-3 py-1 rounded-lg ${
                    rental.is_active ? "bg-green-100 text-green-800" : ""
                  }`}>
                    #{rental.id} {rental.is_active && <span className="ml-1">●</span>}
                  </div>
                </td>
                <td className="p-4">{rental.user.username}</td>
                <td className="p-4">{rental.pc}</td>
                <td className="p-4">{formatDate(rental.rental_date)}</td>
                <td className="p-4">{formatDate(rental.return_date)}</td>
                <td className="p-4 font-semibold text-[#EA3C3C]">{rental.total_price} DA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedRental && (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-transparent flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[#EA3C3C]">Rental Details</h3>
            <p className="mb-2">
              <strong>Rental ID: </strong>
              <span className={`px-3 py-1 rounded-lg ${
                selectedRental.is_active ? "bg-green-100 text-green-800" : ""
              }`}>
                #{selectedRental.id} {selectedRental.is_active && <span className="ml-1">●</span>}
              </span>
            </p>
            
            {/* User information with border */}
            <div className="mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
              <h4 className="font-bold text-gray-700 mb-2">User Information</h4>
              <p className="mb-1"><strong>Username:</strong> {selectedRental.user.username}</p>
              <p className="mb-1"><strong>Email:</strong> {selectedRental.user.email}</p>
              <p className="mb-1"><strong>Phone:</strong> {selectedRental.user.phone || 'N/A'}</p>
            </div>
            
            {/* PC and payment information */}
            <div className="mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
              <h4 className="font-bold text-gray-700 mb-2">Rental Information</h4>
              <p className="mb-1"><strong>PC:</strong> {selectedRental.pc}</p>
              <p className="mb-1"><strong>Payment Method:</strong> {selectedRental.payement_method}</p>
              <p className="mb-1"><strong>Total Price:</strong> <span className="text-[#EA3C3C] font-semibold">{selectedRental.total_price} DA</span></p>
              <p className="mb-1"><strong>Status:</strong> {selectedRental.is_active ? 
                <span className="text-green-600 font-semibold">Active</span> : 
                <span className="text-gray-600">Inactive</span>}
              </p>
            </div>
            
            {/* Date editing section */}
            <div className="mb-4 border border-gray-200 rounded-lg p-3">
              <h4 className="font-bold text-gray-700 mb-2">Rental Dates</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rental Date</label>
                  <input
                    type="date"
                    value={editedDates.rental_date}
                    onChange={(e) => handleDateChange('rental_date', e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <input
                    type="date"
                    value={editedDates.return_date}
                    onChange={(e) => handleDateChange('return_date', e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              {isDateModified && (
                <button
                  onClick={updateRentalDates}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex-1 hover:bg-blue-700 transition"
                >
                  Update Dates
                </button>
              )}
              {selectedRental.is_active && (
                <button
                  onClick={() => confirmPCReturn(selectedRental.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex-grow hover:bg-green-700 transition flex items-center justify-center gap-1"
                >
                  <i className='bx bx-check-circle'></i>
                  Confirm Return
                </button>
              )}
              <button
                onClick={() => setSelectedRental(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex-1 hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalRequests;

















