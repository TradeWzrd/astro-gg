/**
 * Blog Model
 * Schema for blog posts and articles
 */
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
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
    comment: {
      type: String,
      required: true
    },
    isApproved: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: [true, 'Blog content is required']
    },
    excerpt: {
      type: String,
      required: [true, 'Blog excerpt is required']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    featuredImage: {
      type: String,
      default: 'default-blog.jpg'
    },
    category: {
      type: String,
      required: true,
      enum: ['astrology', 'numerology', 'vastu', 'spirituality', 'tarot', 'gemstones', 'meditation', 'other']
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Date
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    views: {
      type: Number,
      default: 0
    },
    comments: [commentSchema],
    readTime: {
      type: Number, // in minutes
      default: 5
    },
    metaTitle: String,
    metaDescription: String,
    relatedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
  },
  {
    timestamps: true
  }
);

// Create a text index for searching
blogSchema.index({ title: 'text', content: 'text', excerpt: 'text', tags: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
