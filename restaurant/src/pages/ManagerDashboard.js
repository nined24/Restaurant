import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [activeTab]);

  const loadData = async () => {
    try {
      switch (activeTab) {
        case 'orders':
          const ordersRes = await api.get('/manager/orders');
          setOrders(ordersRes.data);
          break;
        case 'payments':
          const paymentsRes = await api.get('/manager/payments');
          setPayments(paymentsRes.data);
          break;
        case 'inventory':
          const [inventoryRes, lowStockRes] = await Promise.all([
            api.get('/manager/inventory'),
            api.get('/manager/inventory/low-stock'),
          ]);
          setInventory(inventoryRes.data);
          setLowStockItems(lowStockRes.data);
          break;
        case 'menu':
          const menuRes = await api.get('/manager/menu');
          setMenuItems(menuRes.data);
          break;
      }
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  const handleToggleMenuItemVisibility = async (id) => {
    try {
      await api.put(`/manager/menu/${id}/toggle-visibility`);
      toast.success('Menu item visibility updated');
      loadData();
    } catch (error) {
      toast.error('Failed to update menu item');
    }
  };

  return (
    <div className="manager-dashboard">
      <header className="manager-header">
        <h1>Manager Dashboard</h1>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </header>

      <div className="dashboard-tabs">
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={activeTab === 'payments' ? 'active' : ''}
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </button>
        <button
          className={activeTab === 'inventory' ? 'active' : ''}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory {lowStockItems.length > 0 && `(${lowStockItems.length})`}
        </button>
        <button
          className={activeTab === 'menu' ? 'active' : ''}
          onClick={() => setActiveTab('menu')}
        >
          Menu Management
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>All Orders</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span>Order #{order.id.substring(0, 8)}</span>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <p>Table: {order.tableNumber}</p>
                  <p>Total: ${order.totalAmount.toFixed(2)}</p>
                  <p className="time">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="payments-section">
            <h2>Payment History</h2>
            <div className="payments-list">
              {payments.map(payment => (
                <div key={payment.id} className="payment-card">
                  <div className="payment-header">
                    <span>Payment #{payment.id.substring(0, 8)}</span>
                    <span className={`status ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </div>
                  <p>Amount: ${payment.amount.toFixed(2)}</p>
                  <p>Method: {payment.paymentMethod}</p>
                  <p className="time">{new Date(payment.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="inventory-section">
            <h2>Inventory Management</h2>
            {lowStockItems.length > 0 && (
              <div className="alert alert-warning">
                <strong>Low Stock Alert:</strong> {lowStockItems.length} item(s) need attention
              </div>
            )}
            <div className="inventory-list">
              {inventory.map(item => (
                <div key={item.id} className={`inventory-card ${item.lowStock ? 'low-stock' : ''}`}>
                  <h3>{item.itemName}</h3>
                  <p>Quantity: {item.quantity} {item.unit}</p>
                  <p>Min Threshold: {item.minThreshold} {item.unit}</p>
                  {item.lowStock && <span className="low-stock-badge">⚠️ Low Stock</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="menu-section">
            <h2>Menu Management</h2>
            <div className="menu-list">
              {menuItems.map(item => (
                <div key={item.id} className="menu-item-card">
                  <div className="menu-item-header">
                    <h3>{item.name}</h3>
                    <span className="price">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="category">{item.category}</p>
                  <p className="description">{item.description}</p>
                  <div className="menu-item-actions">
                    <button
                      onClick={() => handleToggleMenuItemVisibility(item.id)}
                      className={`visibility-btn ${item.hidden ? 'hidden' : 'visible'}`}
                    >
                      {item.hidden ? 'Show' : 'Hide'}
                    </button>
                    <span className={`availability ${item.available ? 'available' : 'unavailable'}`}>
                      {item.available ? '✓ Available' : '✗ Unavailable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;

