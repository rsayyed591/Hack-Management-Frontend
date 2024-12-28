import React, { useEffect, useRef } from 'react';

import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = () => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader', // ID of the div where the scanner will render
      {
        fps: 10, // Frames per second
        qrbox: { width: 250, height: 250 }, // Scanner box dimensions
      },
      false // verbose mode
    );

    scanner.render(
      (decodedText) => {
        handleScanSuccess(decodedText);
      },
      (error) => {
        console.error('QR Code scan error:', error);
      }
    );

    // Cleanup function to clear the scanner on component unmount
    return () => {
      if (scanner) {
        scanner.clear().catch((err) => {
          console.error('Error clearing scanner:', err);
        });
      }
    };
  }, []);

  const handleScanSuccess = async (decodedText) => {
    console.log('Decoded text:', decodedText);
    try {
      // Send the decoded text to the backend for validation
      const response = await fetch('https://hackathon-eight-roan.vercel.app/api/v1/admin/checkInByQr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrData: decodedText }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Display success message
      } else {
        alert(`Error: ${data.message}`); // Display error message from backend
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div>
      <div id="reader" style={{ width: '100%' }}></div>
    </div>
  );
};

export default QRScanner;
