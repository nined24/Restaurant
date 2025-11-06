import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './OrderStatus.css';

const OrderStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
    const interval = setInterval(loadOrder, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [id]);

  const loadOrder = async () => {
    try {
      const response = await api.get(`/customer/order/${id}`);
      setOrder(response.data);
    } catch (error) {
      toast.error('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    navigate(`/payment/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading order status...</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
  }

  const statusSteps = [
    { key: 'RECEIVED', label: 'Received', icon: '📥' },
    { key: 'PREPARING', label: 'Preparing', icon: '👨‍🍳' },
    { key: 'READY', label: 'Ready', icon: '✅' },
    { key: 'SERVED', label: 'Served', icon: '🍽️' },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div className="order-status-container">
      <header className="order-status-header">
        <h1>Order Status</h1>
        <button onClick={() => navigate('/menu')} className="back-button">
          ← Back to Menu
        </button>
      </header>

      <div className="order-status-content">
        <div className="order-info-card">
          <h2>Order #{order.id.substring(0, 8)}</h2>
          <p className="table-info">Table: {order.tableNumber}</p>
          <p className="order-time">Placed: {new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div className="status-timeline">
          <h3>Order Progress</h3>
          {statusSteps.map((step, index) => (
            <div
              key={step.key}
              className={`status-step ${index <= currentStepIndex ? 'active' : ''} ${index === currentStepIndex ? 'current' : ''}`}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-content">
                <h4>{step.label}</h4>
                {index === currentStepIndex && (
                  <p className="current-status">Current status</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="order-items-card">
          <h3>Order Items</h3>
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <span className="item-name">{item.menuItemName}</span>
              <span className="item-quantity">x{item.quantity}</span>
              <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Total:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {order.status === 'SERVED' && (
          <div className="action-buttons">
            <button onClick={handlePayment} className="btn-primary">
              Proceed to Payment
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="btn-secondary"
            >
              Order More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;

