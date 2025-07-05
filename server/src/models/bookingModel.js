/**
 * Booking Model
 * Schema for scheduling consultations with astrologers
 */
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    astrologer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    serviceType: {
      type: String,
      required: true,
      enum: ['astrology', 'numerology', 'vastu', 'tarot', 'palmistry', 'other']
    },
    consultationType: {
      type: String,
      required: true,
      enum: ['video', 'audio', 'chat', 'in-person']
    },
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    duration: {
      type: Number, // Duration in minutes
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
      default: 'pending'
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date
    },
    paymentMethod: {
      type: String
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String }
    },
    notes: {
      type: String
    },
    questionsAsked: [{
      question: String,
      answer: String
    }],
    clientFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      review: String
    },
    meetingLink: {
      type: String
    },
    reminderSent: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
