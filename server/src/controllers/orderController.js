/**
 * Order Controller
 * Handles order creation, payment processing, and order management
 */
const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderNotes,
    isDigitalOrder
  } = req.body;

  // Validate order items exist
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Custom services from the home page not in our database
  const customServices = {
    'birth-chart-analysis': {
      name: 'Comprehensive Birth Chart Analysis',
      price: 9999,
      image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=500&auto=format&fit=crop&q=60'
    },
    'yearly-transit': {
      name: 'Yearly Transit Forecast',
      price: 8499,
      image: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=500&auto=format&fit=crop&q=60'
    },
    'relationship-compatibility': {
      name: 'Relationship Compatibility',
      price: 6999,
      image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&auto=format&fit=crop&q=60'
    }
  };
  
  // Create a modified order items list that handles both database products and custom services
  const processedOrderItems = [];
  
  for (const item of orderItems) {
    // Ensure image is present
    if (!item.image) {
      item.image = 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=500&auto=format&fit=crop&q=60';
    }
    
    // Check if this is a custom service
    if (typeof item.product === 'string' && customServices[item.product]) {
      const service = customServices[item.product];
      // Validate the price matches our expected price
      if (service.price !== item.price) {
        res.status(400);
        throw new Error(`Price mismatch for service: ${service.name}`);
      }
      
      // Add the item with service details
      processedOrderItems.push({
        product: null, // No actual product ID since it's a custom service
        name: service.name,
        price: service.price,
        image: service.image,
        quantity: item.quantity,
        productId: item.product // Store the service identifier
      });
    } else {
      // This is a regular product that should exist in database
      try {
        const product = await Product.findById(item.product);
        if (!product) {
          // Product not found, use the item details directly
          processedOrderItems.push({
            product: null,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            productId: item.product
          });
          continue; // Skip to next item
        }
        
        const actualPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
        if (actualPrice !== item.price) {
          res.status(400);
          throw new Error(`Price mismatch for product: ${product.name}`);
        }
        
        // Add the item with product details
        processedOrderItems.push({
          product: product._id,
          name: product.name,
          price: actualPrice,
          image: product.images && product.images.length > 0 ? product.images[0].url : item.image,
          quantity: item.quantity
        });
      } catch (error) {
        // If it's an invalid ObjectId error, we'll use the item details directly
        if (error.name === 'CastError' || error.kind === 'ObjectId') {
          processedOrderItems.push({
            product: null,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            productId: item.product
          });
        } else {
          throw error;
        }
      }
    }
  }

  // Create order with our processed items
  const order = await Order.create({
    user: req.user._id,
    orderItems: processedOrderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderNotes,
    isDigitalOrder: isDigitalOrder || false
  });

  // Update stock if not a digital product
  if (!isDigitalOrder) {
    for (const item of orderItems) {
      if (item.quantity > 0) {
        const product = await Product.findById(item.product);
        if (product && product.countInStock > 0) {
          product.countInStock -= item.quantity;
          await product.save();
        }
      }
    }
  }

  res.status(201).json(order);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // Find order and populate with user's name and email
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  // Validate order exists and belongs to user or is admin
  if (order && (order.user._id.toString() === req.user._id.toString() || req.user.role === 'admin')) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // Update payment information
    order.isPaid = true;
    order.paidAt = Date.now();
    
    // Handle different payment data structures
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      // Check if we have payer object (PayPal format) or direct email_address (our direct format)
      email_address: req.body.payer?.email_address || req.body.email_address || 'customer@example.com',
    };
    
    // For digital orders, generate download links
    if (order.isDigitalOrder) {
      // Create fake download links for demo purposes
      order.orderItems.forEach(item => {
        const downloadUrl = item.productId 
          ? `https://astrology-app.com/downloads/${item.productId}` 
          : `https://astrology-app.com/downloads/service-${Date.now()}`;
          
        order.downloadLinks.push({
          productId: item.productId || item.product,
          url: downloadUrl,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          downloaded: false
        });
      });
    }
    
    // Update order status
    order.status = 'processing';

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// Helper function to generate download links (placeholder)
const generateDownloadLink = (productId) => {
  // In a real implementation, this would generate a secure, time-limited download URL
  return `/api/downloads/${productId}?token=${Date.now()}`;
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = 'completed';

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // Pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  
  // Filter options
  const status = req.query.status ? { status: req.query.status } : {};
  
  // Get count
  const count = await Order.countDocuments(status);
  
  // Get orders
  const orders = await Order.find(status)
    .populate('user', 'id name')
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    orders,
    page,
    pages: Math.ceil(count / pageSize),
    totalOrders: count
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;
    
    // Set related fields based on status
    if (status === 'completed') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else if (status === 'cancelled') {
      // Return stock to inventory
      if (!order.isDigitalOrder && order.orderItems) {
        for (const item of order.orderItems) {
          const product = await Product.findById(item.product);
          if (product) {
            product.countInStock += item.quantity;
            await product.save();
          }
        }
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus,
};
