/**
 * Product Model
 * Schema for astrology products/services available for purchase
 */
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    detailedDescription: {
      type: String
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['astrology', 'numerology', 'vastu']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      default: 0
    },
    discountPrice: {
      type: Number,
      default: 0
    },
    images: [
      {
        url: {
          type: String,
          required: true
        },
        alt: {
          type: String
        }
      }
    ],
    featured: {
      type: Boolean,
      default: false
    },
    isFreeResource: {
      type: Boolean,
      default: false
    },
    duration: {
      type: String, // e.g., "30 minutes", "1 hour"
    },
    format: {
      type: String, // e.g., "PDF", "Video Call", "Audio"
    },
    tags: [String],
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0
    },
    numReviews: {
      type: Number,
      default: 0
    },
    countInStock: {
      type: Number,
      default: 0 // For digital products, can be set to -1 for unlimited
    },
    isDigital: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Method to calculate average rating
productSchema.methods.calculateRatings = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    this.numReviews = this.reviews.length;
    this.rating = this.reviews.reduce((acc, item) => item.rating + acc, 0) / this.reviews.length;
  }
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
