import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import QRScan from './pages/QRScan';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderStatus from './pages/OrderStatus';
import Payment from './pages/Payment';
import Feedback from './pages/Feedback';
import KitchenDashboard from './pages/KitchenDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Customer Routes */}
      <Route
        path="/qr-scan"
        element={
          <ProtectedRoute requiredRole="CUSTOMER">
            <QRScan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu"
        element={
          <ProtectedRoute requiredRole="CUSTOMER">
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute requiredRole="CUSTOMER">
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-status/:id"
        element={
          <ProtectedRoute requiredRole="CUSTOMER">
            <OrderStatus />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/:id"
        element={
          <ProtectedRoute requiredRole="CUSTOMER">
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback/:id"
        element={
          <ProtectedRoute requiredRole="CUSTOMER">
            <Feedback />
          </ProtectedRoute>
        }
      />

      {/* Kitchen Staff Routes */}
      <Route
        path="/kitchen"
        element={
          <ProtectedRoute requiredRole="KITCHEN_STAFF">
            <KitchenDashboard />
          </ProtectedRoute>
        }
      />

      {/* Manager Routes */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute requiredRole="MANAGER">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route
        path="/"
        element={
          user ? (
            user.role === 'CUSTOMER' ? (
              <Navigate to="/qr-scan" replace />
            ) : user.role === 'KITCHEN_STAFF' ? (
              <Navigate to="/kitchen" replace />
            ) : (
              <Navigate to="/manager" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <AppRoutes />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
