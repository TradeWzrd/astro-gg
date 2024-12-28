const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const qs=require("qs");
require("dotenv").config();
const axios=require("axios");
const userRoutes = require("./routes/userRoutes"); 
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); 
const faqRoutes = require("./routes/faqRoutes")
const cloudinaryConnect = require("./config/cloudinary");

const app = express();
const port = process.env.PORT || 4001;

// Initialize Cloudinary connection
cloudinaryConnect();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Proxy endpoint to forward the request to the external API
app.post('/api/create-order', async (req, res) => {
  const { customer_mobile, user_token, amount, order_id, redirect_url, remark1, remark2 } = req.body;

  const payload = qs.stringify({
      customer_mobile,
      user_token,
      amount,
      order_id,
      redirect_url,
      remark1,
      remark2,
  });

  try {
      const response = await axios.post('https://pay0.shop/api/create-order', payload, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: 10000, // 10-second timeout
      });
      res.status(response.status).json(response.data);
  } catch (error) {
      console.error('Error proxying request:', error.message);
      res.status(500).json({ error: 'Failed to fetch from external API', details: error.message });
  }
});

// Integration of routes
app.use("/api/v1/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes); // Integrate Razorpay routes
app.use("/api",faqRoutes);
// Root route
app.get("/", (req, res) => {
  res.send(`<h1> Say Hello To Astrology..</h1>`);
});

// Server listener
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
