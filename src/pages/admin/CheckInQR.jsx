import React, { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { adminService } from '../../services/api';
import Loader from '../../components/Loader';

const CheckInQR = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [scannerInitialized, setScannerInitialized] = useState(false); // New state to track scanner init

  const handleScanSuccess = async (decodedText) => {
    setLoading(true); // Show loader when a successful scan happens
    setError('');
    setSuccess('');

    console.log('Decoded text:', decodedText);

    try {
      const response = await adminService.checkInByQR(decodedText);
      setSuccess(response.message || 'Participant checked in successfully!');
    } catch (err) {
      setError(err.message || 'Failed to check in participant');
    } finally {
      setLoading(false); // Hide loader when the request is complete
    }
  };

  const handleScanError = (error) => {
    console.error('QR Code scan error:', error);
    setError('Error scanning QR code. Please try again.');
  };

  const startScanner = () => {
    if (scannerInitialized) return; // Avoid reinitializing the scanner

    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(handleScanSuccess, handleScanError);
    setScannerInitialized(true); // Mark scanner as initialized
  };

  useEffect(() => {
    // Cleanup when the component is unmounted
    return () => {
      if (scannerInitialized) {
        const scanner = Html5QrcodeScanner.getScanner('reader');
        scanner && scanner.clear();
      }
    };
  }, [scannerInitialized]);

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
            onClick={startScanner}
            className="px-4 py-2 rounded-md text-white font-medium bg-[#01C38D] hover:bg-[#01C38D]/90"
            disabled={scannerInitialized || loading} // Disable button while loading or after initializing scanner
          >
            {loading ? 'Processing...' : 'Start Scanning'}
          </button>
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
          <Loader />
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
    </div>
  );
};

export default CheckInQR;
