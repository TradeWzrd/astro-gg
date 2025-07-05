import React from 'react';
import { FaCheck, FaClock, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { orderAPI } from '../services/api';

/**
 * OrderDetailsModal component
 * Displays order details in a modal dialog
 */
const OrderDetailsModal = ({ order, onClose, onOrderUpdated }) => {
  if (!order) return null;

  // Handle marking order as complete
  const handleCompleteOrder = async () => {
    try {
      await orderAPI.updateOrderStatus(order._id, 'completed');
      toast.success('Order marked as completed');
      if (onOrderUpdated) onOrderUpdated();
      onClose();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  // Handle order deletion
  const handleDeleteOrder = async () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderAPI.deleteOrder(order._id);
        toast.success('Order deleted successfully');
        if (onOrderUpdated) onOrderUpdated();
        onClose();
      } catch (error) {
        toast.error('Failed to delete order');
      }
    }
  };

  // Get status style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'rgba(16, 185, 129, 0.2)',
          color: '#10B981',
          icon: <FaCheck />
        };
      case 'pending':
        return {
          bg: 'rgba(245, 158, 11, 0.2)',
          color: '#F59E0B',
          icon: <FaClock />
        };
      default:
        return {
          bg: 'rgba(239, 68, 68, 0.2)',
          color: '#EF4444',
          icon: <FaTimes />
        };
    }
  };

  const statusStyle = getStatusStyle(order.status);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div 
        style={{
          backgroundColor: '#1a103c',
          borderRadius: '12px',
          width: '80%',
          maxWidth: '800px',
          maxHeight: '80vh',
          overflow: 'auto',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
        
        <h2 style={{ marginTop: 0 }}>Order Details</h2>
        
        {/* Order header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Order #{order._id}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
            <span style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              backgroundColor: statusStyle.bg,
              color: statusStyle.color,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              {statusStyle.icon} {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
            </span>
          </div>
        </div>
        
        {/* Customer information */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Customer Information</h3>
          <p>Name: {order.user?.name || 'Guest User'}</p>
          <p>Email: {order.user?.email || 'Not available'}</p>
          {order.shippingAddress && (
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', marginTop: '1rem' }}>Shipping Address</h4>
              <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
              <p>{order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            </div>
          )}
        </div>
        
        {/* Order Items */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Order Items</h3>
          {order.orderItems && order.orderItems.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Product</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Price</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Qty</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      {item.name}
                    </td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      ₹{item.price?.toFixed(2) || 0}
                    </td>
                    <td style={{ padding: '0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      {item.quantity}
                    </td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      ₹{(item.price * item.quantity)?.toFixed(2) || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items in this order</p>
          )}
        </div>
        
        {/* Order Summary */}
        <div style={{ marginBottom: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
            <span>Items Total:</span>
            <span>₹{order.itemsPrice?.toFixed(2) || '0.00'}</span>
          </div>
          {order.taxPrice > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
              <span>Tax:</span>
              <span>₹{order.taxPrice?.toFixed(2) || '0.00'}</span>
            </div>
          )}
          {order.shippingPrice > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
              <span>Shipping:</span>
              <span>₹{order.shippingPrice?.toFixed(2) || '0.00'}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
            <span>Total:</span>
            <span>₹{order.totalPrice?.toFixed(2) || '0.00'}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        {order.status !== 'completed' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '2rem' }}>
            <button
              onClick={handleCompleteOrder}
              style={{
                background: 'linear-gradient(to right, #10B981, #059669)',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Mark as Completed
            </button>
            {(order.status === 'pending' || order.status === 'failed') && (
              <button
                onClick={handleDeleteOrder}
                style={{
                  background: 'linear-gradient(to right, #EF4444, #DC2626)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Delete Order
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsModal;
