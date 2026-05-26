require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/BookingModel');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Tour database (should be in real DB) 
const tours = [
  { id: 1, name: "Paris Tour", price: 27000 },
  { id: 2, name: "London Tour", price: 15000 },
  { id: 3, name: "Tokyo Tour", price: 32000 },
];

class PaymentService {
  // Create order
  static async createOrder(tourId, email, phone, fullName) {
    try {
      const tour = tours.find(t => t.id === Number(tourId));
      if (!tour) throw new Error('Tour not found');

      const totalAmount = tour.price;
      const advanceAmount = Math.floor(totalAmount * 0.1);

      const options = {
        amount: advanceAmount * 100, // Convert to paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          tourId: tourId.toString(),
          email,
          phone,
          fullName,
        }
      };

      const order = await razorpay.orders.create(options);

      return {
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
        },
        tourDetails: {
          id: tour.id,
          name: tour.name,
          totalAmount,
          advanceAmount,
          remainingAmount: totalAmount - advanceAmount,
        }
      };
    } catch (error) {
      throw new Error(`Order creation failed: ${error.message}`);
    }
  }

  // Verify payment signature
  static async verifyPayment(paymentData) {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        email,
        phone,
        fullName,
        tourId,
      } = paymentData;

      // Verify signature
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        throw new Error('Invalid signature');
      }

      // Create booking record
      const booking = await Booking.create({
        email,
        phone,
        fullName,
        tourId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: 'completed',
        advancePaid: true,
      });

      return {
        success: true,
        booking: {
          id: booking._id,
          orderId: razorpay_order_id,
          email: booking.email,
        }
      };
    } catch (error) {
      throw new Error(`Payment verification failed: ${error.message}`);
    }
  }

  // Get booking details
  static async getBooking(bookingId) {
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) throw new Error('Booking not found');
      return booking;
    } catch (error) {
      throw new Error(`Failed to fetch booking: ${error.message}`);
    }
  }
}

module.exports = PaymentService;
