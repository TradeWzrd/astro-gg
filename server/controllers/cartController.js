const express = require("express");
const { db } = require("../config/db");

// Create a new cart (if not exists) and add cart item
const createCartItem = async (req, res) => {
    try {
        const { user_id, item_id, price, quantity, description, title } = req.body;

        // Validate inputs
        if (!user_id || !item_id || !price || !quantity || !description || !title) {
            return res.status(400).json({ error: "user_id, item_id, price, quantity, description, and title are required" });
        }

        // First, check if the user already has a cart
        const cartQuery = "SELECT * FROM cart WHERE user_id = ?";
        db.query(cartQuery, [user_id], (err, cartResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            let cart_id;
            if (cartResult.length === 0) {
                // If the user doesn't have a cart, create one
                const createCartQuery = "INSERT INTO cart (user_id) VALUES (?)";
                db.query(createCartQuery, [user_id], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    cart_id = result.insertId;
                    addCartItem(cart_id); // Proceed to add the cart item
                });
            } else {
                // If the cart exists, use the existing cart_id
                cart_id = cartResult[0].cart_id;
                addCartItem(cart_id); // Proceed to add the cart item
            }

            // Helper function to add the cart item
            function addCartItem(cart_id) {
                const query = "INSERT INTO cart_item (cart_id, item_id, price, quantity, description, title) VALUES (?, ?, ?, ?, ?, ?)";
                db.query(query, [cart_id, item_id, price, quantity, description, title], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.status(201).json({ message: "Cart item added successfully", cartItemId: result.insertId });
                });
            }
        });
    } catch (error) {
        console.error("Error in creating cart item:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in creating cart item",
            error: error.message,
        });
    }
};

// Read all cart items for a user
const getCartItems = async (req, res) => {
    try {
        const { user_id } = req.params;

        const cartQuery = "SELECT * FROM cart WHERE user_id = ?";
        db.query(cartQuery, [user_id], (err, cartResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (cartResult.length === 0) {
                return res.status(404).json({ message: "No cart found for this user" });
            }

            const cart_id = cartResult[0].cart_id;
            const query = "SELECT * FROM cart_item WHERE cart_id = ?";
            db.query(query, [cart_id], (err, items) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json(items);
            });
        });
    } catch (error) {
        console.error("Error in fetching cart items:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in fetching cart items",
            error: error.message,
        });
    }
};

// Update a cart item (quantity or price)
const updateCartItem = async (req, res) => {
    try {
        const { cart_item_id } = req.params;
        const { quantity, price } = req.body;

        if (quantity === undefined && price === undefined) {
            return res.status(400).json({ error: "Quantity or price is required" });
        }

        const query = "UPDATE cart_item SET quantity = ?, price = ? WHERE cart_item_id = ?";
        db.query(query, [quantity, price, cart_item_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Cart item not found" });
            }
            res.status(200).json({ message: "Cart item updated successfully" });
        });
    } catch (error) {
        console.error("Error in updating cart item:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in updating cart item",
            error: error.message,
        });
    }
};

// Delete a cart item
const deleteCartItem = async (req, res) => {
    try {
        const { cart_item_id } = req.params;

        const query = "DELETE FROM cart_item WHERE cart_item_id = ?";
        db.query(query, [cart_item_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Cart item not found" });
            }
            res.status(200).json({ message: "Cart item deleted successfully" });
        });
    } catch (error) {
        console.error("Error in deleting cart item:", error.message);
        res.status(500).json({
            success: false,
            message: "Error in deleting cart item",
            error: error.message,
        });
    }
};

const addService = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        // Validate required fields
        if (!title || !description || price === undefined) {
            return res.status(400).json({ error: "Title, description, and price are required" });
        }

        const query = "INSERT INTO services (title, description, price) VALUES (?, ?, ?)";
        db.query(query, [title, description, price], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: "Service added successfully",
                serviceId: result.insertId, // Return the generated service ID
            });
        });
    } catch (error) {
        console.error("Error adding service:", error.message);
        res.status(500).json({
            success: false,
            message: "Error adding service",
            error: error.message,
        });
    }
};
const addMultipleService = async (req, res) => {
    try {
        const services = req.body; // Array of services

        // Validate that the array is not empty
        if (!Array.isArray(services) || services.length === 0) {
            return res.status(400).json({ error: "At least one service is required" });
        }

        // Validate each service object
        for (const service of services) {
            const { title, description, price } = service;

            if (!title || !description || price === undefined) {
                return res.status(400).json({ error: "Title, description, and price are required for each service" });
            }
        }

        // Prepare query to insert multiple services
        const query = "INSERT INTO services (title, description, price) VALUES ?";
        
        // Prepare values array for bulk insert
        const values = services.map(service => [service.title, service.description, service.price]);

        db.query(query, [values], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Services added successfully",
                affectedRows: result.affectedRows, // Number of rows inserted
            });
        });
    } catch (error) {
        console.error("Error adding services:", error.message);
        res.status(500).json({
            success: false,
            message: "Error adding services",
            error: error.message,
        });
    }
};


 // Fetch all services
 const getAllServices = async (req, res) => {
    console.log("getAllServices route hit");
    try {
        const query = "SELECT * FROM services";
        db.query(query, (err, results) => {
            if (err) {
                console.error("Error fetching services:", err.message);
                return res.status(500).json({ error: "Database error", details: err.message });
            }
            if (results.length == 0) {
                return res.status(404).json({ message: "No services found" });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error("Error in getAllServices:", error.message);
        res.status(500).json({ success: false, message: "Error fetching services", error: error.message });
    }
};


// Fetch a single service by ID
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = "SELECT * FROM services WHERE id = ?"; // Assuming 'services' table has 'id' column
        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: "Service not found" });
            }
            res.status(200).json(result[0]);
        });
    } catch (error) {
        console.error("Error fetching service by ID:", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching service by ID",
            error: error.message,
        });
    }
};      

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete service by id
        const query = "DELETE FROM services WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Service not found" });
            }
            res.status(200).json({ message: "Service deleted successfully" });
        });
    } catch (error) {
        console.error("Error deleting service:", error.message);
        res.status(500).json({
            success: false,
            message: "Error deleting service",
            error: error.message,
        });
    }
};
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;

        // Validate required fields
        if (!title && !description && price === undefined) {
            return res.status(400).json({ error: "At least one field (title, description, price) is required" });
        }

        // Build the update query dynamically
        const fields = [];
        const values = [];

        if (title) {
            fields.push("title = ?");
            values.push(title);
        }
        if (description) {
            fields.push("description = ?");
            values.push(description);
        }
        if (price !== undefined) {
            fields.push("price = ?");
            values.push(price);
        }

        const query = `UPDATE services SET ${fields.join(", ")} WHERE id = ?`;
        values.push(id);

        db.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Service not found" });
            }
            res.status(200).json({ message: "Service updated successfully" });
        });
    } catch (error) {
        console.error("Error updating service:", error.message);
        res.status(500).json({
            success: false,
            message: "Error updating service",
            error: error.message,
        });
    }
};


module.exports = {
    createCartItem,
    getCartItems,
    updateCartItem,
    deleteCartItem,
    getAllServices,
    getServiceById,
    deleteService,
    updateService,
    addService,
    addMultipleService
    
};
