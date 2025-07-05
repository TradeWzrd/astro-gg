/**
 * Order Model
 * Schema for tracking user purchases of products/services
 */
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: false },
  price: { type: Number, required: true },
  // For database products - now optional since we're handling custom services
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Product'
  },
  // For custom services that don't exist in our database
  productId: {
    type: String,
    required: false
  }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String }
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required']
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String }
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: {
      type: Date
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false
    },
    deliveredAt: {
      type: Date
    },
    orderNotes: {
      type: String
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'processing', 'completed', 'cancelled', 'refunded'],
      default: 'pending'
    },
    // For digital products
    isDigitalOrder: {
      type: Boolean,
      default: false
    },
    downloadLinks: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      url: {
        type: String
      },
      expiresAt: {
        type: Date
      },
      downloaded: {
        type: Boolean,
        default: false
      }
    }]
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
