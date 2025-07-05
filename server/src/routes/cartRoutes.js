const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// All routes are protected and require authentication
router.use(protect);

// Get cart and add to cart
router.route('/')
  .get(getUserCart)  
  .post(addToCart)
  .delete(clearCart);

// Update and remove cart items
router.route('/:id')
  .put(updateCartItem)
  .delete(removeFromCart);

module.exports = router;
