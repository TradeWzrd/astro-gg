const express = require('express');
const router = express.Router();

// Sample service data (replace with database in production)
const services = {
  'vastu-consultation': {
    id: 'vastu-consultation',
    name: 'Vastu Consultation Platinum',
    description: 'Transform your space into a haven of positive energy with our premium Vastu consultation service. Our certified experts will provide comprehensive analysis and personalized recommendations to enhance the harmony and prosperity of your environment.',
    price: 1000,
    originalPrice: 2000,
    discount: 50,
    rating: 4.8,
    reviewCount: 128,
    features: [
      {
        icon: 'FaClock',
        title: '60-Min Session',
        description: 'Detailed consultation'
      },
      {
        icon: 'FaVideo',
        title: 'Video Call',
        description: 'Face-to-face guidance'
      },
      {
        icon: 'FaFileAlt',
        title: 'Detailed Report',
        description: 'Written recommendations'
      },
      {
        icon: 'FaPhoneAlt',
        title: 'Follow-up Call',
        description: '30-day support'
      }
    ],
    image: '/assets/vastu-consultation.jpg'
  },
  // Add more services here
};

// Get all services
router.get('/', (req, res) => {
  try {
    const serviceList = Object.values(services);
    res.json(serviceList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get service by ID
router.get('/:id', (req, res) => {
  try {
    const service = services[req.params.id];
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
