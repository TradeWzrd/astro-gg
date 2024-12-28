const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController'); // Assuming the controller is named faqController.js

// Route to add a single FAQ
router.post('/faqs', faqController.addFaq);

// Route to add multiple FAQs
router.post('/addFaqs/multiple', faqController.addMultipleFaqs);

// Route to get FAQ by ID
router.get('/getFaqs/:id', faqController.getFaqById);

// Route to update an FAQ by ID
router.put('/updateFaqs/:id', faqController.updateFaq);

// Route to delete an FAQ by ID
router.delete('/deleteFaqs/:id', faqController.deleteFaq);

module.exports = router;
