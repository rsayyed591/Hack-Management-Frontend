import React, { useEffect, useRef, useState } from 'react';
import { QrCode } from 'lucide-react'
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { adminService } from '../../services/api';
import Loader from '../../components/Loader';

const CheckInQR = () => {
    const scannerRef = useRef(null); // Preserve scanner instance
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [isScanning, setIsScanning] = useState(false)

    // Initialize scanner on mount
    useEffect(() => {
        scannerRef.current = new Html5Qrcode('reader'); // Create scanner instance
        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().then(() => {
                    scannerRef.current.clear();
                });
            }
        };
    }, []);

    // Handle QR Scan success
    const handleScanSuccess = async (decodedText) => {
        console.log('Decoded text:', decodedText);
        setLoading(true);
        setError(''); // Clear previous errors
        setSuccess(''); // Clear previous success
        try {
            const response = await adminService.checkInByQR(decodedText);
            setSuccess(response.message || 'Participant checked in successfully!');
        } catch (error) {
            setError(error.message || 'Failed to check in participant');
        } finally {
            setLoading(false);
        }
    };

    // Handle QR Scan error
    const handleScanError = (error) => {
        console.error('QR Code scan error:', error);
        setError('Error scanning QR code.');
    };

    // Start or Stop Scanning
    const handleStartStop = async () => {
        if (isScanning) {
            // Stop scanning
            await scannerRef.current.stop();
            await scannerRef.current.clear();
            setIsScanning(false);
        } else {
            // Start scanning
            setError(''); // Clear errors
            setSuccess(''); // Clear success messages
            scannerRef.current.start(
                { facingMode: "environment" }, // Rear camera
                { fps: 10, qrbox: { width: 250, height: 250 } },
                handleScanSuccess,
                handleScanError
            );
            setIsScanning(true);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center lg:h-[70vh] bg-[#191E29]">
            <Loader />
        </div>;
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
