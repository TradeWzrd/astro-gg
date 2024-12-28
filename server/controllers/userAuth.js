const express = require("express");
const { db } = require("../config/db");
const { sendOtpEmail } = require("../middleware/mail");
const bcrypt = require("bcrypt");
const otpStore = new Map();
const tempUserStore = new Map();

// Function to send OTP
const sendOtp = async (email) => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    const otpExpiryTime = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

    otpStore.set(email, { otp: generatedOtp, otpExpiryTime }); // Save OTP with expiry
    console.log(`Generated OTP for ${email}: ${generatedOtp}`); // Debugging log

    await sendOtpEmail(email, generatedOtp); // Send OTP to user's email
    console.log(`OTP sent to ${email}`); // Confirmation log

    return { otpExpiryTime };
};

// Registration Endpoint
const register = async (req, res) => {
    try {
        const { name, age, birthdate, email, phone, password, confirmPassword, role = "user" } = req.body;

        // Validate inputs
        if (!name || !age || !birthdate || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (!/^[0-9]{10,15}$/.test(phone.trim())) {
            return res.status(400).json({ error: "Invalid phone number" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user exists
        const existingUser = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM userdata WHERE email = ?", [email.trim()], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "User already exists." });
        }

        // OTP logic for admin users
        if (role === "admin") {
            const { otpExpiryTime } = await sendOtp(email.trim());
            tempUserStore.set(email.trim(), { name, age, birthdate, phone, password, role });
            return res.status(200).json({
                message: "OTP sent to your email. Please verify to complete registration.",
                otpExpiryTime,
            });
        }

        // Save regular users
        await saveUser(name, age, birthdate, email, phone, password, role, res);
    } catch (error) {
        console.error("Error in registration:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in registration",
            error: error.message,
        });
    }
};

// Helper function to save user to the database
const saveUser = async (name, age, birthdate, email, phone, password, role, res) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password for security

    const insertUserQuery = `
        INSERT INTO userdata (name, email, phone_number, age, birthdate, password, role) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await new Promise((resolve, reject) => {
        db.query(
            insertUserQuery,
            [name.trim(), email.trim(), phone.trim(), age, birthdate, hashedPassword, role],
            (err) => {
                if (err) return reject(err);
                resolve();
            }
        );
    });

    // After inserting, you can fetch the userId from the database if necessary
    const userIdQuery = "SELECT user_id FROM userdata WHERE email = ?";
    const user = await new Promise((resolve, reject) => {
        db.query(userIdQuery, [email.trim()], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]?.user_id);  // Assuming `user_id` is the field in your database
        });
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: { name, email, phone, role, birthdate, age, userId: user ? user.user_id : null }, // Include userId in response
    });
};

// OTP Verification Endpoint
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const storedData = otpStore.get(email);
    if (!storedData) {
        return res.status(400).json({ success: false, message: "No OTP found for this email." });
    }

    const { otp: storedOtp, otpExpiryTime } = storedData;

    if (otp == storedOtp && Date.now() < otpExpiryTime) {
        otpStore.delete(email); // Clear OTP after verification

        // Retrieve user data from temp store and save it to the database
        const userData = tempUserStore.get(email);
        if (userData) {
            const { name, password, role } = userData;

            try {
                // Save verified admin user to the database
                await saveUser(name, email, password, role, res);
                tempUserStore.delete(email); // Clear temporary data
            } catch (error) {
                console.error("Error saving user:", error.message);
                return res.status(500).json({ 
                    success: false, 
                    message: "Error saving user to the database." 
                });
            }
        } else {
            return res.status(400).json({ success: false, message: "User data not found." });
        }
    } else {
        return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }
};

// Login Endpoint
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const trimmedPassword = password.trim();
        const findUserQuery = "SELECT * FROM userdata WHERE email = ?";

        const user = await new Promise((resolve, reject) => {
            db.query(findUserQuery, [email], (err, result) => {
                if (err) return reject(err);
                resolve(result.length ? result[0] : null);
            });
        });

        if (!user) {
            return res.status(400).json({ error: "User does not exist." });
        }

        // Compare hashed password with the input password
        const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);

        if (isPasswordValid) {
            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: { 
                    name: user.name, 
                    email: user.email, 
                    role: user.role,
                    userId: user.user_id  // Include userId in the response
                },
            });
        } else {
            return res.status(401).json({ error: "Invalid credentials." });
        }
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = { register, verifyOtp, login };
