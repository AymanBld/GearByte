import React, { useState, useEffect, useRef } from "react";
import { fetchApi, fetchWithAuth} from "../../utils/fetchWithAuth";
import Toast from "../../components/Toast";
import { useClickOutside } from "../../Hooks/use-click-outside";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const modalRef = useRef(null);

  useClickOutside([modalRef], () => {
    if (selectedOrder) {
      setSelectedOrder(null);
    }
  });

  const statusColors = {
    pending: 'bg-[#fff3cd] text-[#856404]',
    shipped: 'bg-[#d4edda] text-[#155724]',
    delivered: 'bg-[#cce5ff] text-[#004085]',
    cancelled: 'bg-[#f8d7da] text-[#721c24]',
  };
  
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
              <th className="p-4">Phone</th>
              <th className="p-4">Address</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`border-b hover:bg-gray-50 transition cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4">
                  <div className={`text-center font-semibold px-3 py-1 rounded-lg ${statusColors[order.status]}`}>
                    #{order.id}
                  </div>
                </td>
                <td className="p-4">{order.user.username}</td>
                <td className="p-4">{order.user.phone || 'N/A'}</td>
                <td className="p-4">
                  {order.address ? (
                    <div>
                      <div>{order.address.city}, {order.address.country}</div>
                      <div className="text-sm text-gray-500">{order.address.street}</div>
                    </div>
                  ) : 'N/A'}
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="px-4 py-2 rounded-lg text-sm cursor-pointer border border-gray-300"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4 font-semibold text-[#EA3C3C]">{order.total_price} DA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-transparent flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[#EA3C3C]">Order Details</h3>
            <div className="mb-4">
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                className="px-4 py-2 rounded-lg text-sm cursor-pointer border border-gray-300 w-full"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <p className="mb-2">
              <strong>Order ID: </strong>
              <span className={`px-3 py-1 rounded-lg ${statusColors[selectedOrder.status]}`}>
                #{selectedOrder.id}
              </span>
            </p>
            <p className="mb-2"><strong>Customer:</strong> {selectedOrder.user.username}</p>
            <p className="mb-2"><strong>Email:</strong> {selectedOrder.user.email || 'N/A'}</p>
            <p className="mb-2"><strong>Phone:</strong> {selectedOrder.user.phone || 'N/A'}</p>
            {selectedOrder.address && (
              <div className="mb-4">
                <p className="font-bold mb-2">Delivery Address:</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p>{selectedOrder.address.street}</p>
                  <p>{selectedOrder.address.city}, {selectedOrder.address.country}</p>
                  <p>{selectedOrder.address.postal_code}</p>
                </div>
              </div>
            )}
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
