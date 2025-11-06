import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './Payment.css';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const response = await api.get(`/customer/order/${id}`);
      setOrder(response.data);
    } catch (error) {
      toast.error('Failed to load order');
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const response = await api.post('/customer/payment', {
        orderId: id,
        paymentMethod,
      });

      toast.success('Payment successful!');
      navigate(`/feedback/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  if (!order) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="payment-container">
      <header className="payment-header">
        <h1>Payment</h1>
      </header>

      <div className="payment-content">
        <div className="order-summary-card">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {order.items.map((item, index) => (
              <div key={index} className="summary-item">
                <span>{item.menuItemName} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total Amount:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-method-card">
          <h2>Payment Method</h2>
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                value="CARD"
                checked={paymentMethod === 'CARD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💳 Credit/Debit Card</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                value="CASH"
                checked={paymentMethod === 'CASH'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>💵 Cash</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                value="MOBILE"
                checked={paymentMethod === 'MOBILE'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>📱 Mobile Payment</span>
            </label>
          </div>
        </div>

        <div className="payment-security">
          <p>🔒 Your payment is secured with SSL/TLS encryption</p>
        </div>

        <button
          onClick={handlePayment}
          disabled={processing}
          className="pay-button"
        >
          {processing ? 'Processing Payment...' : `Pay $${order.totalAmount.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default Payment;

