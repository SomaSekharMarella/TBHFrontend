import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api'; // Your backend API base URL

const AdminLogin = ({ onLogin }) => {
    const [adminSecret, setAdminSecret] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('secretInput'); // 'secretInput' or 'otpInput'
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSendingOtp, setIsSendingOtp] = useState(false); // To prevent multiple OTP requests
    const navigate = useNavigate();
    // In your backend, otpId is not returned/used for session tracking in the way you might expect.
    // The backend uses the email itself as the key in otpStore.
    // So, we'll use the admin email directly for the OTP verification.
    const adminEmail = "theblockchainhub.klu@gmail.com"; // <--- IMPORTANT: Hardcode your CLUB_EMAIL here

    const handleSecretChange = (e) => {
        setAdminSecret(e.target.value);
        setError(''); // Clear error on input change
        setMessage('');
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
        setError(''); // Clear error on input change
        setMessage('');
    };

    // Step 1: Submit Admin Secret to request OTP
    const requestOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSendingOtp(true); // Disable button

        try {
            // *** CRITICAL CHANGE 1: Correct the endpoint to /generate-otp ***
            // *** CRITICAL CHANGE 2: Include the email in the request body ***
            const response = await axios.post(`${API_BASE_URL}/auth/generate-otp`, {
                email: adminEmail, // Send the admin email
                adminSecret // Send the admin secret
            });
            setMessage(response.data.message || "OTP sent to your registered email");
            setStep('otpInput'); // Move to OTP input step
        } catch (err) {
            console.error('Error requesting OTP:', err);
            setError(err.response?.data?.message || 'Failed to request OTP. Please check your secret and email.');
        } finally {
            setIsSendingOtp(false); // Re-enable button
        }
    };

    // Step 2: Submit OTP for verification and final login
    const verifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            // *** CRITICAL CHANGE: Send email and otp, not otpId ***
            const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
                email: adminEmail, // Send the admin email
                otp // Send the OTP
            });

            // Backend sends 'token'
            sessionStorage.setItem('adminToken', response.data.token);
            setMessage(response.data.message || "Login successful!");

            if (onLogin) {
                onLogin(true); // Notify parent (App.js) that login is successful
            }
            navigate('/admin/dashboard'); // Navigate to the dashboard
        } catch (err) {
            console.error('Error verifying OTP:', err);
            setError(err.response?.data?.message || 'Failed to verify OTP. Please try again.');
            setOtp(''); // Clear OTP field for re-entry
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Admin Login</h2>

            {message && <p style={{ color: 'green', textAlign: 'center', marginBottom: '15px' }}>{message}</p>}
            {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

            {step === 'secretInput' && (
                <form onSubmit={requestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label htmlFor="adminSecret" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Admin Secret Key:</label>
                        <input
                            type="password"
                            id="adminSecret"
                            value={adminSecret}
                            onChange={handleSecretChange}
                            required
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                            placeholder="Enter your admin secret key"
                            disabled={isSendingOtp}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSendingOtp}
                        style={{
                            padding: '12px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isSendingOtp ? 'not-allowed' : 'pointer',
                            fontSize: '1.1em',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        {isSendingOtp ? 'Sending OTP...' : 'Request OTP'}
                    </button>
                </form>
            )}

            {step === 'otpInput' && (
                <form onSubmit={verifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label htmlFor="otp" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>One-Time Password (OTP):</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                            maxLength="6"
                            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
                            placeholder="Enter the 6-digit OTP"
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '12px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1.1em',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        Verify OTP & Log In
                    </button>
                    <button
                        type="button"
                        onClick={() => { setStep('secretInput'); setAdminSecret(''); setOtp(''); setMessage(''); setError(''); }} // Clear all state on going back
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9em',
                            marginTop: '10px'
                        }}
                    >
                        Go Back
                    </button>
                </form>
            )}
        </div>
    );
};

export default AdminLogin;