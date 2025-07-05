const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const serviceSchema = mongoose.Schema({
  // Basic information
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  
  // Display information
  image: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['astrology', 'numerology', 'vastu', 'general']
  },
  
  // Additional details
  faqs: [faqSchema],
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  
  // SEO
  metaTitle: { type: String },
  metaDescription: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add text index for search
serviceSchema.index({ 
  name: 'text', 
  description: 'text', 
  'faqs.question': 'text', 
  'faqs.answer': 'text' 
});

// Pre-save hook to update the updatedAt field
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create slug from name if not provided
serviceSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }
  next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
