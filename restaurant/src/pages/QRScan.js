import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './QRScan.css';

const QRScan = () => {
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const startScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
        
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => handleScan(result.data),
          { returnDetailedScanResult: true }
        );
        
        await qrScannerRef.current.start();
      }
    } catch (error) {
      toast.error('Camera access denied or not available');
      console.error(error);
    }
  };

  const handleScan = async (qrData) => {
    try {
      const response = await api.post('/public/scan-qr', { qrCode: qrData });
      const table = response.data;
      localStorage.setItem('currentTable', JSON.stringify(table));
      navigate('/menu');
      toast.success(`Table ${table.tableNumber} detected!`);
    } catch (error) {
      toast.error('Invalid QR code');
    }
  };

  const handleManualEntry = async (e) => {
    e.preventDefault();
    if (!qrCode) {
      toast.error('Please enter QR code');
      return;
    }
    
    try {
      const response = await api.post('/public/scan-qr', { qrCode });
      const table = response.data;
      localStorage.setItem('currentTable', JSON.stringify(table));
      navigate('/menu');
      toast.success(`Table ${table.tableNumber} detected!`);
    } catch (error) {
      toast.error('Invalid QR code');
    }
  };

  return (
    <div className="qr-scan-container">
      <div className="qr-scan-card">
        <h1>Scan QR Code</h1>
        <p>Scan the QR code on your table to access the menu</p>
        
        <div className="video-container">
          <video ref={videoRef} className="video-preview" autoPlay playsInline />
        </div>
        
        <div className="qr-actions">
          {!scanning ? (
            <button onClick={startScan} className="btn-primary">
              Start Camera Scan
            </button>
          ) : (
            <button 
              onClick={() => {
                if (qrScannerRef.current) {
                  qrScannerRef.current.stop();
                  qrScannerRef.current.destroy();
                  qrScannerRef.current = null;
                }
                setScanning(false);
              }} 
              className="btn-secondary"
            >
              Stop Scanning
            </button>
          )}
        </div>
        
        <div className="manual-entry">
          <p>Or enter QR code manually:</p>
          <form onSubmit={handleManualEntry}>
            <input
              type="text"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              placeholder="Enter QR code"
              className="form-control"
            />
            <button type="submit" className="btn-primary">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QRScan;

