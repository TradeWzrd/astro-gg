const Cart = require('../models/cartModel');
const asyncHandler = require('express-async-handler');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  let cart = await Cart.findOne({ user: userId });
  
  if (!cart) {
    // If no cart exists, create an empty one
    cart = await Cart.create({
      user: userId,
      items: [],
      totalAmount: 0
    });
  }
  
  res.status(200).json({
    items: cart.items,
    totalAmount: cart.totalAmount
  });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user._id;
  
  if (!productId) {
    res.status(400);
    throw new Error('Product ID is required');
  }
  
  // Find user's cart or create new one
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
      totalAmount: 0
    });
  }
  
  // Check if product already exists in cart
  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  
  // For simplicity, we're using the service data directly since we don't have a 
  // formal product database for the services on the home page
  // In a real app, you'd fetch the product details from the database here
  let price = 0;
  let name = '';
  let image = '';
  
  // Handle services from the home page
  if (productId === 'birth-chart-analysis') {
    price = 9999;
    name = 'Comprehensive Birth Chart Analysis';
    image = 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=500&auto=format&fit=crop&q=60';
  } else if (productId === 'yearly-transit') {
    price = 8499;
    name = 'Yearly Transit Forecast';
    image = 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=500&auto=format&fit=crop&q=60';
  } else if (productId === 'relationship-compatibility') {
    price = 6999;
    name = 'Relationship Compatibility';
    image = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&auto=format&fit=crop&q=60';
  } 
  // Handle astrology reports and services
  else if (productId === 'astro-birth-chart') {
    price = 13999;
    name = 'Astrology: Comprehensive Birth Chart Report';
    image = 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=500&auto=format&fit=crop&q=60';
  } else if (productId === 'astro-transit') {
    price = 9999;
    name = 'Astrology: Personalized Transit Report';
    image = 'https://images.unsplash.com/photo-1518141532615-4305c9f914c9?w=500&auto=format&fit=crop&q=60';
  } else if (productId === 'astro-career') {
    price = 8499;
    name = 'Astrology: Career & Finance Forecast';
    image = 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=500&auto=format&fit=crop&q=60';
  } else if (productId.startsWith('astro-')) {
    // Handle dynamically generated astrology services
    price = 9999;
    name = 'Astrology: ' + productId.replace('astro-', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    image = 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=500&auto=format&fit=crop&q=60';
  }
  // Handle numerology reports
  else if (productId === 'num-life-path') {
    price = 6999;
    name = 'Numerology: Life Path Number Analysis';
    image = 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=500&auto=format&fit=crop&q=60';
  } else if (productId === 'num-year-forecast') {
    price = 5499;
    name = 'Numerology: Personal Year Forecast';
    image = 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=500&auto=format&fit=crop&q=60';
  } else if (productId === 'num-name-analysis') {
    price = 4999;
    name = 'Numerology: Name Analysis Report';
    image = 'https://images.unsplash.com/photo-1567767330332-9d66810dcdaf?w=500&auto=format&fit=crop&q=60';
  } else if (productId.startsWith('num-')) {
    // Handle dynamically generated numerology services
    price = 5999;
    name = 'Numerology: ' + productId.replace('num-', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    image = 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=500&auto=format&fit=crop&q=60';
  }
  // Handle vastu services
  else if (productId.startsWith('vastu-')) {
    // Vastu services with different price ranges based on service type
    const serviceType = productId.replace('vastu-', '');
    if (serviceType.includes('business') || serviceType.includes('profession')) {
      price = 15000; // Business vastu services are premium
    } else if (serviceType.includes('home')) {
      price = 10000; // Home vastu
    } else if (serviceType.includes('plot') || serviceType.includes('land')) {
      price = 8000; // Land analysis
    } else {
      price = 7999; // Default vastu price
    }
    
    // Format the name properly
    name = 'Vastu: ' + productId.replace('vastu-', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    image = 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=500&auto=format&fit=crop&q=60';
  } 
  else {
    try {
      // For products stored in the database, lookup product info from the database
      const Product = require('../models/productModel');
      const product = await Product.findById(productId);
      
      if (product) {
        price = product.price;
        name = product.name;
        image = product.images && product.images.length > 0 ? product.images[0].url : 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=500&auto=format&fit=crop&q=60';
        
        // Set category-specific name format
        if (product.category === 'astrology') {
          name = `Astrology: ${product.name}`;
        } else if (product.category === 'numerology') {
          name = `Numerology: ${product.name}`;
        } else if (product.category === 'vastu') {
          name = `Vastu: ${product.name}`;
        }
      } else {
        // Default for unknown products
        price = 1000;
        name = 'Miscellaneous Service';
        image = 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=500&auto=format&fit=crop&q=60';
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      // Default for error cases
      price = 1000;
      name = 'Miscellaneous Service';
      image = 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=500&auto=format&fit=crop&q=60';
    }
  }
  
  if (itemIndex > -1) {
    // Product exists in cart, update quantity
    cart.items[itemIndex].quantity += quantity;
  } else {
    // Product does not exist in cart, add new item
    cart.items.push({
      productId,
      name,
      price,
      quantity,
      image // Include the image from our service data
    });
  }
  
  // Recalculate total price
  cart.totalAmount = cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  await cart.save();
  
  res.status(200).json({
    items: cart.items,
    totalAmount: cart.totalAmount
  });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const itemId = req.params.id;
  const userId = req.user._id;
  
  if (!quantity || quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }
  
  // Find user's cart
  const cart = await Cart.findOne({ user: userId });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  
  // Find the item
  const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
  
  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }
  
  // Update quantity
  cart.items[itemIndex].quantity = quantity;
  
  // Save the cart
  await cart.save();
  
  res.status(200).json({
    items: cart.items,
    totalAmount: cart.totalAmount
  });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  const userId = req.user._id;
  
  // Find user's cart
  const cart = await Cart.findOne({ user: userId });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  
  // Remove the item
  cart.items = cart.items.filter(item => item._id.toString() !== itemId);
  
  // Save the cart
  await cart.save();
  
  res.status(200).json({
    message: 'Item removed from cart',
    itemId
  });
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  // Find user's cart
  const cart = await Cart.findOne({ user: userId });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  
  // Clear items array
  cart.items = [];
  cart.totalAmount = 0;
  
  // Save the cart
  await cart.save();
  
  res.status(200).json({
    message: 'Cart cleared'
  });
});

module.exports = {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
