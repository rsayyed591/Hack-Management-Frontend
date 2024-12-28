import React, { useEffect, useRef, useState } from 'react';
import { QrCode } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { adminService } from '../../services/api';
import Loader from '../../components/Loader';

const CheckInQR = () => {
  const scannerRef = useRef(null); // To preserve scanner instance
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [processing, setProcessing] = useState(false); // To prevent repeated processing

  useEffect(() => {
    scannerRef.current = new Html5Qrcode('reader'); // Initialize scanner
  
    return () => {
      // Cleanup only if scanner is active
      if (scannerRef.current && scannerRef.current.getState() === 2) { // Check if scanner is RUNNING
        scannerRef.current.stop()
          .then(() => scannerRef.current.clear())
          .catch((err) => console.error('Error stopping scanner during cleanup:', err));
      }
    };
  }, []);
  

  // Handle QR Code Scanning Success
  const handleScanSuccess = async (decodedText) => {
    if (processing) return; // Ignore if already processing
    setProcessing(true); // Lock further scans until processing is complete

    console.log('Decoded text:', decodedText);
    setLoading(true); // Show loader
    setError('');
    setSuccess('');

    try {
      // Simulate backend API call
      const response = await adminService.checkInByQR(decodedText);
      setSuccess(response.message || 'Participant checked in successfully!');
    } catch (error) {
      setError(error.message || 'Failed to check in participant');
    } finally {
      setLoading(false);
      setProcessing(false); // Unlock scanning for the next QR code
    }
  };

  // Handle QR Code Scan Errors
  const handleScanError = (error) => {
    console.error('QR Code scan error:', error);
    if (!processing) {
      setError('Error scanning QR code. Please try again.');
    }
  };

  // Start Scanner
  const startScanner = async () => {
    if (isScanning || !scannerRef.current) return; // Prevent multiple starts

    setError('');
    setSuccess('');
    try {
      await scannerRef.current.start(
        { facingMode: "environment" }, // Use rear camera
        { fps: 10, qrbox: { width: 250, height: 250 } }, // Settings
        handleScanSuccess,
        handleScanError
      );
      setIsScanning(true); // Set scanning state
    } catch (err) {
      console.error('Error starting scanner:', err);
      setError('Could not start scanner. Please try again.');
    }
  };

  // Stop Scanner
  const stopScanner = async () => {
    if (!isScanning || !scannerRef.current) return;
  
    try {
      const state = scannerRef.current.getState(); // Check scanner state
      if (state === 2) { // Only stop if scanner is RUNNING
        await scannerRef.current.stop();
        scannerRef.current.clear();
        setIsScanning(false);
      }
    } catch (err) {
      console.error("Error stopping scanner:", err);
      setError("Could not stop scanner. Please try again.");
    }
  };
  

  // Toggle Start/Stop Scanner
  const handleStartStop = () => {
    if (isScanning) {
      stopScanner();
    } else {
      startScanner();
    }
  };

  // Show loader while processing
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <QrCode className="h-6 w-6 text-[#01C38D]" />
        <h1 className="text-2xl font-bold text-white">Check In by QR</h1>
      </div>
      <div className="border border-[#01C38D] rounded-lg p-4 sm:p-8 bg-[#132D46]">
        <div id="reader" style={{ width: '100%' }} />
        <div className="flex justify-center mt-4">
          <button
            onClick={handleStartStop}
            className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${isScanning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-[#01C38D] hover:bg-[#01C38D]/90'
              }`}
          >
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </button>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
    </div>
  );
};

export default CheckInQR;
