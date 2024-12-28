import React, { useState } from 'react';
import { createOrder, checkOrderStatus } from './api';

const PayINComponent = () => {
    const generateRandomOrderId = () => {
        return 'ORD' + Math.floor(100000 + Math.random() * 900000); // Random 6-digit ID prefixed
    };

    const generateRandomRemarks = () => {
        const randomTexts = ['Payment123', 'OrderProcessed', 'RemarkHidden'];
        return randomTexts[Math.floor(Math.random() * randomTexts.length)];
    };

    const [orderDetails, setOrderDetails] = useState({
        customerMobile: '',                
        userToken: 'fa156e4ff3276ae0ef4326cad74c1fa0', // Hardcoded
        amount: '',                        // User input
        orderId: generateRandomOrderId(),  // Hidden and auto-generated
        redirectUrl: 'http://localhost:5173/', // Hardcoded redirect URL
        remark1: generateRandomRemarks(),  // Hidden and auto-generated
        remark2: generateRandomRemarks()   // Hidden and auto-generated
    });

    const [orderStatus, setOrderStatus] = useState('');
    const [error, setError] = useState('');

    // Create Order
    const handleCreateOrder = async () => {
        try {
            const paymentUrl = await createOrder(orderDetails);
            if (paymentUrl) {
                console.log('Order Created Successfully: ' + paymentUrl);
                window.location.href = paymentUrl; // Redirect to payment link
            }
        } catch (err) {
            setError(err.message);
            console.error('Order Creation Failed:', err.message);
        }
    };

    // Check Order Status
    const handleCheckStatus = async () => {
        try {
            const result = await checkOrderStatus(orderDetails.userToken, orderDetails.orderId);
            setOrderStatus(`Order Status: ${result.txnStatus}`);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center">PayIN Order Management</h2>

                {/* Input Fields */}
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Customer Mobile"
                        value={orderDetails.customerMobile}
                        onChange={(e) =>
                            setOrderDetails({ ...orderDetails, customerMobile: e.target.value })
                        }
                        className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={orderDetails.amount}
                        onChange={(e) =>
                            setOrderDetails({ ...orderDetails, amount: e.target.value })
                        }
                        className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleCreateOrder}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all focus:ring-2 focus:ring-purple-500"
                    >
                        Create Order
                    </button>
                    <button
                        onClick={handleCheckStatus}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all focus:ring-2 focus:ring-blue-500"
                    >
                        Check Status
                    </button>
                </div>

                {/* Results and Errors */}
                {orderStatus && (
                    <div className="mt-6 p-3 bg-green-600 rounded-lg text-white">
                        {orderStatus}
                    </div>
                )}
                {error && (
                    <div className="mt-6 p-3 bg-red-600 rounded-lg text-white">
                        Error: {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PayINComponent;
