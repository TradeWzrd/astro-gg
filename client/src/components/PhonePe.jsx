import React, { useState } from 'react';
import axios from 'axios';

const PhonePeApi = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const generateXVerify = (requestPayload, saltKey) => {
    const payloadString = JSON.stringify(requestPayload);
    const payloadBase64 = btoa(payloadString);
    const hash = btoa(payloadBase64 + saltKey); // Simple Base64 encoding for demonstration
    return hash;
  };

  const handleApiCall = async () => {
    const requestPayload = { /* Your request payload */ };
    const saltKey = 'your_salt_key';
    const xVerify = generateXVerify(requestPayload, saltKey);

    const options = {
      method: 'post',
      url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
      },
      data: requestPayload,
    };

    try {
      const response = await axios.request(options);
      setResponseData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponseData(null);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>PhonePe API Integration</h1>
      <button
        onClick={handleApiCall}
        style={{
          padding: '10px 20px',
          backgroundColor: '#6200ea',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Call API
      </button>

      {responseData && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e0f7fa' }}>
          <h2>Response:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ffebee', color: '#d32f2f' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default PhonePeApi;