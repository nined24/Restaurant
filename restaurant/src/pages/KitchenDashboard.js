import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './KitchenDashboard.css';

const KitchenDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [filter]);

  const loadOrders = async () => {
    try {
      let response;
      if (filter === 'ALL') {
        response = await api.get('/kitchen/orders');
      } else {
        response = await api.get(`/kitchen/orders/status/${filter}`);
      }
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/kitchen/order/${orderId}/status?status=${newStatus}`);
      toast.success('Order status updated');
      loadOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const getStatusButtons = (currentStatus) => {
    const statusFlow = {
      RECEIVED: ['PREPARING'],
      PREPARING: ['READY'],
      READY: ['SERVED'],
      SERVED: [],
    };

    return statusFlow[currentStatus] || [];
  };

  return (
    <div className="kitchen-dashboard">
      <header className="kitchen-header">
        <h1>Kitchen Dashboard</h1>
        <div className="header-actions">
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="kitchen-filters">
        <button
          className={filter === 'ALL' ? 'active' : ''}
          onClick={() => setFilter('ALL')}
        >
          All Orders
        </button>
        <button
          className={filter === 'RECEIVED' ? 'active' : ''}
          onClick={() => setFilter('RECEIVED')}
        >
          Received
        </button>
        <button
          className={filter === 'PREPARING' ? 'active' : ''}
          onClick={() => setFilter('PREPARING')}
        >
          Preparing
        </button>
        <button
          className={filter === 'READY' ? 'active' : ''}
          onClick={() => setFilter('READY')}
        >
          Ready
        </button>
      </div>

      <div className="orders-container">
        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">No orders found</div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id.substring(0, 8)}</h3>
                  <p>Table: {order.tableNumber}</p>
                  <p className="order-time">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.menuItemName} x{item.quantity}</span>
                    {item.specialInstructions && (
                      <span className="special-instructions">
                        Note: {item.specialInstructions}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {order.specialInstructions && (
                <div className="order-notes">
                  <strong>Special Instructions:</strong> {order.specialInstructions}
                </div>
              )}

              <div className="order-actions">
                {getStatusButtons(order.status).map(nextStatus => (
                  <button
                    key={nextStatus}
                    onClick={() => updateOrderStatus(order.id, nextStatus)}
                    className={`status-btn ${nextStatus.toLowerCase()}`}
                  >
                    Mark as {nextStatus}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KitchenDashboard;

