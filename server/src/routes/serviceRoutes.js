const express = require('express');
const router = express.Router();
const { 
  getServices, 
  getServiceById, 
  getServiceBySlug,
  createService, 
  updateService, 
  deleteService,
  updateServiceFAQs
} = require('../controllers/serviceController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getServices);
router.get('/id/:id', getServiceById);
router.get('/slug/:slug', getServiceBySlug);

// Admin routes
router.post('/', protect, admin, createService);
router.put('/:id', protect, admin, updateService);
router.delete('/:id', protect, admin, deleteService);
router.put('/:id/faqs', protect, admin, updateServiceFAQs);

module.exports = router;
