import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { fetchApi, fetchWithAuth } from "../../utils/fetchWithAuth";
import Toast from "../../components/Toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('Store/order/');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.results);
    } catch (err) {
      setError(err.message);
      setToast({
        show: true,
        message: 'Failed to fetch orders',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetchWithAuth(`Store/order/${orderId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      setToast({
        show: true,
        message: 'Order status updated successfully',
        type: 'success'
      });
    } catch (error) {
      setToast({
        show: true,
        message: 'Failed to update order status',
        type: 'error'
      });
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetchApi(`Store/order/${orderId}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      setToast({
        show: true,
        message: 'Order deleted successfully',
        type: 'success'
      });
    } catch (error) {
      setToast({
        show: true,
        message: 'Failed to delete order',
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

      <h2 className="text-3xl font-bold text-black mb-6 text-center">Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#EA3C3C] text-white">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4 text-center font-semibold">#{order.id}</td>
                <td className="p-4">{order.user.username}</td>
                <td className="p-4">{order.user.email}</td>
                <td className="p-4">{order.user.phone || 'N/A'}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4 font-semibold text-[#EA3C3C]">{order.total_price} DA</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-[#EA3C3C] text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-gray-500 text-white p-2 rounded-lg shadow-md hover:bg-gray-700 transition flex items-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[#EA3C3C]">Order Details</h3>
            <p className="mb-2"><strong>Order ID:</strong> #{selectedOrder.id}</p>
            <p className="mb-2"><strong>Customer:</strong> {selectedOrder.user.username}</p>
            <p className="mb-2"><strong>Email:</strong> {selectedOrder.user.email}</p>
            <p className="mb-2"><strong>Phone:</strong> {selectedOrder.user.phone || 'N/A'}</p>
            {selectedOrder.address && (
              <>
                <p className="mb-2"><strong>Country:</strong> {selectedOrder.address.country}</p>
                <p className="mb-2"><strong>City:</strong> {selectedOrder.address.city}</p>
                <p className="mb-2"><strong>Street:</strong> {selectedOrder.address.street}</p>
                <p className="mb-2"><strong>Postal Code:</strong> {selectedOrder.address.postal_code}</p>
              </>
            )}
            <p className="mb-2"><strong>Status:</strong> {selectedOrder.status}</p>
            <p className="mb-2"><strong>Payment Method:</strong> {selectedOrder.payement_method}</p>
            <p className="mb-2"><strong>Total:</strong> {selectedOrder.total_price} DA</p>
            <p className="mb-2"><strong>Created At:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
            
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-[#EA3C3C] text-white px-4 py-2 rounded-lg w-full hover:bg-[#ea3c3cb1] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
