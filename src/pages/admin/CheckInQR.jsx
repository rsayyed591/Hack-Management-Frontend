import React, { useEffect, useRef, useState } from 'react';
import { QrCode } from 'lucide-react'
import { Html5Qrcode } from 'html5-qrcode';
import { adminService } from '../../services/api';
import Loader from '../../components/Loader';

const CheckInQR = () => {
  const scannerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Initialize scanner only once
    scannerRef.current = new Html5Qrcode('reader');

    // Cleanup function to stop the scanner when the component unmounts
    return () => {
      stopScanner();
    };
  }, []);

  const handleScanSuccess = async (decodedText) => {
    if (isScanning) {
      // Prevent multiple scans from triggering the function
      setIsScanning(false);

      console.log('Decoded text:', decodedText);
      setLoading(true);
      setError('');
      setSuccess('');

      try {
        const response = await adminService.checkInByQR(decodedText);
        setSuccess(response.message || 'Participant checked in successfully!');
        // Restart scanner after successful check-in
        startScanner();
      } catch (error) {
        setError(error.message || 'Failed to check in participant');
        // Restart scanner after failed check-in
        startScanner();
      } finally {
        setLoading(false);
      }
    }
  };

  const handleScanError = (error) => {
    console.error('QR Code scan error:', error);
    setError('Error scanning QR code.');
    // Restart the scanner after an error
    startScanner();
  };

  const startScanner = async () => {
    setError('');
    setSuccess('');

    if (!isScanning && scannerRef.current) {
      try {
        await scannerRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          handleScanSuccess,
          handleScanError
        );
        setIsScanning(true);
      } catch (err) {
        console.error("Error starting scanner:", err);
        setError("Could not start scanner. Please try again.");
      }
    }
  };

  const stopScanner = async () => {
    if (isScanning && scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear(); // Clear the scanner
        setIsScanning(false);
      } catch (err) {
        console.error("Error stopping scanner:", err);
        setError("Could not stop scanner. Please try again.");
      }
    }
  };

  const handleStartStop = () => {
    if (isScanning) {
      stopScanner();
    } else {
      startScanner();
    }
  };

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

