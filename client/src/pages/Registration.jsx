import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/AuthSlice"; // Adjust the path
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    birthdate: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [otpTimer, setOtpTimer] = useState(16);

  // Handle OTP Timer Countdown
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Dispatch the registerUser action
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] flex flex-col items-center justify-center text-white font-sans px-4">
      {/* Transparent Form */}
      <div className="w-full max-w-2xl sm:max-w-xl p-6 bg-opacity-20 backdrop-blur-md bg-white/10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">GET REGISTERED</h1>

        {/* Display error or success */}
        {error && <p className="text-red-500 text-center mb-4">{error.message}</p>}
        {user && <p className="text-green-500 text-center mb-4">Registration successful!</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm">NAME*</label>
            <input
              type="text"
              name="name"
              className="p-3 bg-transparent border border-white rounded w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm">AGE*</label>
              <input
                type="number"
                name="age"
                className="p-3 bg-transparent border border-white rounded w-full"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm">BIRTHDATE*</label>
              <input
                type="date"
                name="birthdate"
                className="p-3 bg-transparent border border-white rounded w-full"
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm">EMAIL*</label>
            <input
              type="email"
              name="email"
              className="p-3 bg-transparent border border-white rounded w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">PHONE NUMBER*</label>
            <input
              type="tel"
              name="phone"
              className="p-3 bg-transparent border border-white rounded w-full"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">PASSWORD*</label>
            <input
              type="password"
              name="password"
              className="p-3 bg-transparent border border-white rounded w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">RE-ENTER PASSWORD*</label>
            <input
              type="password"
              name="confirmPassword"
              className="p-3 bg-transparent border border-white rounded w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-white text-[#1c1c3d] font-bold rounded hover:bg-gray-200 transition"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Registering..." : "REGISTER NOW"}
          </button>
        </form>

        {/* Link to Login Page */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login" // Link to the login page
              className="text-blue-400 underline hover:text-blue-500 transition"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
