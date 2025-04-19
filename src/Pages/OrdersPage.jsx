import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from "../utils/fetchWithAuth";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('/Store/order/');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      // Handle both array and paginated response formats
      setOrders(Array.isArray(data) ? data : (data.results || []));
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'status-pending',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return statusColors[status?.toLowerCase()] || 'status-default';
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <div className="orders-loading">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <div className="orders-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="orders-page">
        <div className="orders-container">
          <h2>My Orders</h2>
          
          {!orders || orders.length === 0 ? (
            <div className="no-orders">
              <i className='bx bx-package'></i>
              <p>You haven't placed any orders yet</p>
              <Link to="/ourproducts" className="shop-now-btn">Shop Now</Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-main">
                    <div className="order-left">
                      <div className="order-id">Order #{order.id}</div>
                      <div className="order-date">
                        <i className='bx bx-calendar'></i>
                        {formatDate(order.created_at)}
                      </div>
                      <div className="order-amount">
                        <i className='bx bx-money'></i>
                        {order.total_price || order.total} DA
                      </div>
                    </div>
                    <div className="order-right">
                      <span className={`order-status ${getStatusColor(order.status)}`}>
                        <i className='bx bx-package'></i>
                        {order.status || 'Processing'}
                      </span>
                    </div>
                  </div>
                  <div className="order-summary">
                    {order.items && order.items.length > 0 && (
                      <>
                        {order.items.map(item => (
                          <div key={item.id} className="order-item">
                            <span>{item.product_name || item.name}</span>
                            <span>{item.quantity} × {item.price} DA</span>
                            <span>{(item.quantity * item.price).toFixed(2)} DA</span>
                          </div>
                        ))}
                        <div className="order-total">
                          <span>Total Amount</span>
                          <span>{order.total_price || order.total} DA</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default OrdersPage;





