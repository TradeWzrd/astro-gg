/**
 * Product Controller
 * Handles product creation, listing, updating and reviews
 */
const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/productModel');

// @desc    Fetch all products with optional filtering
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // Set up pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  
  // Set up search and filter options
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      }
    : {};
    
  const category = req.query.category ? { category: req.query.category } : {};
  const priceRange = req.query.minPrice && req.query.maxPrice 
    ? { 
        price: { 
          $gte: Number(req.query.minPrice), 
          $lte: Number(req.query.maxPrice) 
        } 
      } 
    : {};
  
  // Combine all filters
  const filter = {
    ...keyword,
    ...category,
    ...priceRange
  };

  // Get count of products matching filters
  const count = await Product.countDocuments(filter);
  
  // Get products with pagination
  const products = await Product.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    totalProducts: count
  });
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    detailedDescription,
    category,
    price,
    discountPrice,
    images,
    featured,
    isFreeResource,
    duration,
    format,
    tags,
    countInStock,
    isDigital
  } = req.body;

  const product = await Product.create({
    name,
    description,
    detailedDescription,
    category,
    price,
    discountPrice,
    images: images || [{ url: 'default-product.jpg', alt: name }],
    featured: featured || false,
    isFreeResource: isFreeResource || false,
    duration,
    format,
    tags,
    countInStock: countInStock || 0,
    isDigital: isDigital || false
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    detailedDescription,
    category,
    price,
    discountPrice,
    images,
    featured,
    isFreeResource,
    duration,
    format,
    tags,
    countInStock,
    isDigital
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.detailedDescription = detailedDescription || product.detailedDescription;
    product.category = category || product.category;
    product.price = price !== undefined ? price : product.price;
    product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
    product.images = images || product.images;
    product.featured = featured !== undefined ? featured : product.featured;
    product.isFreeResource = isFreeResource !== undefined ? isFreeResource : product.isFreeResource;
    product.duration = duration || product.duration;
    product.format = format || product.format;
    product.tags = tags || product.tags;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.isDigital = isDigital !== undefined ? isDigital : product.isDigital;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    
    // Update ratings using the method defined in the model
    await product.calculateRatings();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 5;
  
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(Number(limit));

  res.json(products);
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 5;
  
  const products = await Product.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(Number(limit));

  res.json(products);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getFeaturedProducts,
};
