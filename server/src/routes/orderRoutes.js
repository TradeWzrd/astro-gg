/**
 * Order Routes
 * API endpoints for order management and processing
 */
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// All order routes require authentication
router.use(protect);

// User routes
router.route('/')
  .post(createOrder)
  .get(admin, getOrders);

router.route('/myorders')
  .get(getMyOrders);

router.route('/:id')
  .get(getOrderById);

router.route('/:id/pay')
  .put(updateOrderToPaid);

// Admin routes
router.route('/:id/deliver')
  .put(admin, updateOrderToDelivered);

router.route('/:id/status')
  .put(admin, updateOrderStatus);

module.exports = router;
