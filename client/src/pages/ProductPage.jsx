import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartItem } from "../Redux/CartSlice"; // Redux action
import axios from "axios"; // API requests
import { useNavigate, useParams } from "react-router-dom"; // For navigation
import { createOrder, checkOrderStatus } from '../components/api';
// Styled-components for custom styling
const FAQsSection = styled.section`
  margin-top: 4rem;
  .faq-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 15px;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
  }
  .faq-answer {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem 1.5rem;
    margin-top: 1rem;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.3s ease;
    transform: translateY(-10px);
    backdrop-filter: blur(8px);
  }
  .show-answer {
    opacity: 1;
    transform: translateY(0);
  }
`;
const bubble = keyframes`
  0% {
    transform: translateY(100%) scale(1); /* Start from the bottom */
    opacity: 0.7;
  }
  50% {
    transform: translateY(-40px) scale(1.2); /* Move upwards */
    opacity: 0.5;
  }
  100% {
    transform: translateY(-80px) scale(0.8); /* End near the top */
    opacity: 0;
  }
`;
const Bubble = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.4;
  animation: ${bubble} 5s ease-in-out infinite;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  left: ${(props) => `${props.left}%`};
  bottom: ${(props) => `${props.bottom}%`};
  animation-delay: ${(props) => `${props.delay}s`};
  z-index: 0; /* Ensure bubbles are behind the button text */
`;


const CartNotification = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;
const Button = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background-color: ${(props) => props.color || '#004b8d'}; /* Default is blue */
  color: white;
  font-weight: bold;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: ${(props) => props.hoverColor || '#003366'}; /* Default is darker blue */
  }
`;

const ButtonText = styled.p`
  font-size: 16px;
  color: white; /* Default text color */
  transition: color 0.3s ease;

  &:hover {
    color: #00b0ff; /* Hover text color */
  }
`;
const ButtonWrapper = styled.div`
  position: relative;
  overflow: hidden; /* Restrict overflow of bubbles */
  display: inline-block; /* Ensure it wraps the button */
`;

const ProductPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { id } = useParams(); // Service ID from the URL

  const [service, setService] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const randomBubbles = Array.from({ length: 5 }, () => ({
    size: Math.random() * 8 + 10, // Random size between 10px and 18px
    left: Math.random() * 100, // Random position between 0% and 100%
    bottom: Math.random() * 20 + 5, // Random vertical start position (avoids all at 0%)
    delay: Math.random() * 3, // Random delay for animation
  }));
  
  
  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay script loaded");
        script.onerror = () => console.error("Failed to load Razorpay script");
        document.body.appendChild(script);
      }
    };
    loadRazorpayScript();
  }, []);


  // Fetch service details by ID
  useEffect(() => {
    const fetchServiceById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/cart/getServiceByID/${id}`);
        console.log("id", id);
        setService(response.data); // Set the fetched service data
        console.log(response.data)
      } catch (error) {
        console.error("Failed to fetch service:", error);
        alert("Failed to fetch service data.");
      }
    };

    fetchServiceById();
  }, [id]);

  if (!service) {
    return <div>Loading...</div>; // Show loading state while fetching service data
  }

  const handleFAQClick = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Handle Buy Now with Razorpay
  const handleBuyNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    // Generate order details dynamically
    const generateRandomOrderId = () => "ORD" + Math.floor(100000 + Math.random() * 900000);
    const generateRandomRemarks = () => {
      const randomTexts = ["Payment123", "OrderProcessed", "RemarkHidden"];
      return randomTexts[Math.floor(Math.random() * randomTexts.length)];
    };
  
    const orderDetails = {
      customerMobile: user.phone || "1234567890", // Replace with actual user mobile
      userToken: "fa156e4ff3276ae0ef4326cad74c1fa0", // Hardcoded user token
      amount: service.price, 
      orderId: generateRandomOrderId(),
      redirectUrl: "http://localhost:3000", // Hardcoded redirect URL
      remark1: generateRandomRemarks(),
      remark2: generateRandomRemarks(),
    };
  
    try {
      // Create Pay0 order and get the payment URL
      const paymentUrl = await createOrder(orderDetails);
  
      if (paymentUrl) {
        console.log("Redirecting to payment URL:", paymentUrl);
        window.location.href = paymentUrl; // Redirect to the Pay0 payment page
      } else {
        throw new Error("Payment URL not received.");
      }
    } catch (error) {
      console.error("Error during payment:", error.message);
      alert("Something went wrong while creating the Pay0 order. Please try again.");
    }
  };
  
  

  // Handle Book Now - Add to Cart
  const handleBookNow = async (service) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const userId = user.userId;
    const existingItem = cartItems.find((item) => item.item_id === service.id);

    const cartItem = {
      user_id: userId,
      item_id: service.id,
      title: service.title,
      description: service.description,
      price: service.price,
      quantity: existingItem ? existingItem.quantity + 1 : 1, // Increment quantity if item already exists
    };

    try {
      const response = await axios.post("http://localhost:4000/api/cart/add", cartItem);
      if (response.status === 201) {
        dispatch(addToCart(cartItem)); // Dispatch to Redux store
        alert("Item added to the cart successfully!");
      }
    } catch (error) {
      console.error("Failed to add item to the cart:", error);
      if (error.response) {
        alert(error.response.data.error || "Failed to add item to the cart");
      } else {
        alert("Network error, please try again later.");
      }
    }
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="min-h-screen bg-gradient-to-t from-purple-800 to-indigo-900 text-white p-8">
      <div className="flex justify-end items-center mb-8">
        <button
          className="bg-opacity-20 hover:bg-opacity-40 text-white py-2 px-6 rounded-lg transition duration-300"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <div className="relative ml-4">
          <button
            className="bg-opacity-20 hover:bg-opacity-40 text-white py-2 px-6 rounded-lg transition duration-300"
            onClick={() => navigate("/cart")}
          >
            Cart
          </button>
          {totalCartItems > 0 && <CartNotification>{totalCartItems}</CartNotification>}
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:gap-8">
        <div className="flex flex-col md:w-1/2 bg-opacity-10 p-4 rounded-lg shadow-lg backdrop-blur-md">
          <div className="w-full h-72 bg-gray-400 rounded-lg shadow-lg"></div>
          <div className="flex flex-row gap-4 mt-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-12 h-12 bg-gray-400 rounded-lg shadow-md"></div>
              ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold">{service.title}</h1>
          <p className="text-xl text-gray-300">Certified by Professionals • 4.9/5 ⭐ (120 reviews)</p>
          <p className="text-2xl font-bold text-yellow-400 flex gap-5">
            <span className="">Price</span>₹{service.price}
          </p>
          <p className="text-lg text-gray-200">{service.description}</p>
          <div className="flex flex-row gap-6">
            <ButtonWrapper>
                <Button rel="noopener" onClick={handleBuyNow}>
        {randomBubbles.map((bubbleProps, index) => (
          <Bubble key={index} {...bubbleProps} />
        ))}
        <ButtonText>Buy Now</ButtonText>
      </Button>
            </ButtonWrapper>
            <ButtonWrapper>
  <Button
    rel="noopener"
    onClick={() => handleBookNow(service)}
    color="#16a34a" /* green-600 */
    hoverColor="#15803d" /* green-700 */
  >
    {randomBubbles.map((bubbleProps, index) => (
      <Bubble key={index} {...bubbleProps} />
    ))}
    <ButtonText>Add to Cart</ButtonText>
  </Button>
</ButtonWrapper>


          </div>
        </div>
      </div>

      <FAQsSection>
        <h2 className="text-2xl font-extrabold text-white mt-8">Frequently Asked Questions</h2>
        <div className="mt-4">
          {[
            {
              question: "How do I book a consultation for Astrology?",
              answer: "You can book an Astrology consultation by clicking 'Add to Cart' or 'Buy Now' on the booking page."
            },
            {
              question: "What does an Astrology consultation cover?",
              answer: "The Astrology consultation includes an in-depth analysis of your birth chart, predictions, and guidance based on planetary positions."
            },
            {
              question: "Can I reschedule my Astrology consultation?",
              answer: "Yes, you can reschedule your Astrology consultation. Simply reach out to us via email or call for assistance."
            },
            {
              question: "How do I book a Vastu consultation?",
              answer: "You can book a Vastu consultation by selecting 'Vastu Consultation' and completing the payment process."
            },
            {
              question: "What is covered in a Vastu consultation?",
              answer: "A Vastu consultation covers a detailed analysis of your living or workspaces, with suggestions for enhancing energy flow and harmony."
            },
            {
              question: "Can I reschedule my Vastu consultation?",
              answer: "Yes, rescheduling your Vastu consultation is possible. Please contact us to make changes to your appointment."
            },
            {
              question: "How do I book a Numerology consultation?",
              answer: "Book your Numerology consultation by choosing 'Numerology Consultation' and completing your order on the website."
            },
            {
              question: "What does a Numerology consultation include?",
              answer: "A Numerology consultation provides insights based on your birth date and name, offering personalized recommendations for better life outcomes."
            },
            {
              question: "Can I reschedule my Numerology consultation?",
              answer: "Yes, rescheduling your Numerology consultation is available. You can change the time by contacting us."
            }
          ].map((faq, index) => (
            <div key={index} className="faq-item" onClick={() => handleFAQClick(index)}>
              <div className="text-lg font-bold">{faq.question}</div>
              <div className={`faq-answer ${openFAQ === index ? "show-answer" : ""}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

      </FAQsSection>
    </div>
  );
};

export default ProductPage;
