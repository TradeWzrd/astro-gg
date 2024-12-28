// api.js

const API_BASE_URL = 'https://pay0.shop/api';

// Function to create a PayIN order
export async function createOrder({
    customerMobile,
    userToken,
    amount,
    orderId,
    redirectUrl,
    remark1,
    remark2
}) {
    const payload = new URLSearchParams();
    payload.append('customer_mobile', customerMobile);
    payload.append('user_token', userToken);
    payload.append('amount', amount);
    payload.append('order_id', orderId);
    payload.append('redirect_url', redirectUrl);
    payload.append('remark1', remark1);
    payload.append('remark2', remark2);

    try {
        const response = await fetch(`http://localhost:4000/api/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customer_mobile: customerMobile,
                user_token: userToken,
                amount,
                order_id: orderId,
                redirect_url: redirectUrl,
                remark1: remark1,
                remark2: remark2,
            }),
        });

        const data = await response.json();

        // Log the full response to debug
        console.log('API Response:', data);

        // Check for result and payment_url
        if (response.ok && data.status === true) {
            if (data.result && data.result.payment_url) {
                console.log('Order Created Successfully:', data.result.payment_url);
                return data.result.payment_url; // Return payment_url
            } else {
                throw new Error('API Response Missing "payment_url". Full Response: ' + JSON.stringify(data));
            }
        } else {
            throw new Error(data.message || 'Order creation failed.');
        }
    } catch (error) {
        console.error('Error in createOrder:', error.message);
        throw error;
    }
}





// Function to check PayIN order status
export async function checkOrderStatus(userToken, orderId) {
    const payload = new URLSearchParams();
    payload.append('user_token', userToken);
    payload.append('order_id', orderId);

    try {
        const response = await fetch(`${API_BASE_URL}/check-order-status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload,
        });

        const data = await response.json();

        if (response.ok && data.status === true) {
            console.log('Order Status Retrieved:', data.result);
            return data.result; // Return only the result object
        } else {
            console.error('Order Status Check Failed:', data.message || 'Unknown error');
            throw new Error(data.message || 'Failed to fetch order status');
        }
    } catch (error) {
        console.error('Error in checkOrderStatus:', error.message);
        throw error;
    }
}
