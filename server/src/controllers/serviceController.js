const Service = require('../models/serviceModel');
const asyncHandler = require('express-async-handler');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const { category, featured, limit = 10, page = 1, search } = req.query;
  
  // Build query
  const query = {};
  
  // Filter by category if provided
  if (category) {
    query.category = category;
  }
  
  // Filter by featured status if provided
  if (featured === 'true') {
    query.featured = true;
  }
  
  // Only show active services unless specifically querying for inactive
  if (req.query.active !== 'false') {
    query.active = true;
  }
  
  // Add text search if provided
  if (search) {
    query.$text = { $search: search };
  }
  
  // Execute query with pagination
  const count = await Service.countDocuments(query);
  const services = await Service.find(query)
    .sort({ featured: -1, createdAt: -1 })
    .limit(Number(limit))
    .skip(Number(limit) * (Number(page) - 1));
    
  res.status(200).json({
    services,
    page: Number(page),
    pages: Math.ceil(count / Number(limit)),
    total: count
  });
});

// @desc    Get a service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  
  if (service) {
    res.status(200).json(service);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Get a service by slug
// @route   GET /api/services/slug/:slug
// @access  Public
const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  
  if (service) {
    res.status(200).json(service);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const {
    name,
    slug,
    description,
    price,
    discountedPrice,
    image,
    category,
    faqs,
    featured,
    metaTitle,
    metaDescription
  } = req.body;
  
  const serviceExists = await Service.findOne({ slug });
  
  if (serviceExists) {
    res.status(400);
    throw new Error('Service with that slug already exists');
  }
  
  const service = await Service.create({
    name,
    slug,
    description,
    price,
    discountedPrice,
    image,
    category,
    faqs: faqs || [],
    featured: featured || false,
    metaTitle,
    metaDescription
  });
  
  if (service) {
    res.status(201).json(service);
  } else {
    res.status(400);
    throw new Error('Invalid service data');
  }
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  
  if (service) {
    // If slug is being changed, check it doesn't conflict with another service
    if (req.body.slug && req.body.slug !== service.slug) {
      const slugExists = await Service.findOne({ slug: req.body.slug });
      if (slugExists) {
        res.status(400);
        throw new Error('Service with that slug already exists');
      }
    }
    
    service.name = req.body.name || service.name;
    service.slug = req.body.slug || service.slug;
    service.description = req.body.description || service.description;
    service.price = req.body.price !== undefined ? req.body.price : service.price;
    service.discountedPrice = req.body.discountedPrice !== undefined ? req.body.discountedPrice : service.discountedPrice;
    service.image = req.body.image || service.image;
    service.category = req.body.category || service.category;
    service.faqs = req.body.faqs || service.faqs;
    service.featured = req.body.featured !== undefined ? req.body.featured : service.featured;
    service.active = req.body.active !== undefined ? req.body.active : service.active;
    service.metaTitle = req.body.metaTitle || service.metaTitle;
    service.metaDescription = req.body.metaDescription || service.metaDescription;
    
    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  
  if (service) {
    // Soft delete by setting active to false
    service.active = false;
    await service.save();
    
    // Or use this for permanent deletion
    // await service.remove();
    
    res.status(200).json({ message: 'Service removed' });
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Update service FAQ
// @route   PUT /api/services/:id/faqs
// @access  Private/Admin
const updateServiceFAQs = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  
  if (service) {
    service.faqs = req.body.faqs || [];
    
    const updatedService = await service.save();
    res.status(200).json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

module.exports = {
  getServices,
  getServiceById,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  updateServiceFAQs
};
