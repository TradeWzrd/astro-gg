import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/AuthSlice";
import { FaFacebook, FaInstagram, FaGoogle, FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    placeOfBirth: "",
    timeOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1c1c3d] to-[#4b0082] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-white mb-8">Create Your Account</h1>
          
          {error && <div className="bg-red-500/20 text-red-100 p-4 rounded-lg mb-6">{error.message}</div>}
          {user && <div className="bg-green-500/20 text-green-100 p-4 rounded-lg mb-6">Registration successful!</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 flex items-center justify-center border-2 border-white/30">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FaUpload className="text-white/50 text-3xl" />
                  )}
                </div>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/30 transition"
                >
                  <FaUpload className="text-white text-sm" />
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Gender*</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Date of Birth*</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Time of Birth*</label>
                <input
                  type="time"
                  name="timeOfBirth"
                  value={formData.timeOfBirth}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">Place of Birth*</label>
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="City, Country"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Password*</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Confirm Password*</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="mt-6 text-center text-white">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-4">
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaGoogle className="text-white text-xl" />
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaFacebook className="text-white text-xl" />
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaInstagram className="text-white text-xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
