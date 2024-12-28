import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const nav=useNavigate();
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/user/verify-otp', {
        email,
        otp,
      });
      alert(response.data.message); // Show success message
      nav('/login')
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('Verification failed. Please check your OTP.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>
        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;