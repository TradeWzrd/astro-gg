const {db} = require('../config/db'); // Assuming you have a database connection setup

// Add a single FAQ
const addFaq = async (req, res) => {
    try {
        const { serviceId, question, answer } = req.body;

        if (!serviceId || !question || !answer) {
            return res.status(400).json({ error: "Service ID, question, and answer are required" });
        }

        const query = "INSERT INTO faqs (service_id, question, answer) VALUES (?, ?, ?)";
        db.query(query, [serviceId, question, answer], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: "FAQ added successfully",
                faqId: result.insertId, // Return the generated FAQ ID
            });
        });
    } catch (error) {
        console.error("Error adding FAQ:", error.message);
        res.status(500).json({
            success: false,
            message: "Error adding FAQ",
            error: error.message,
        });
    }
};

// Add multiple FAQs
const addMultipleFaqs = async (req, res) => {
    try {
        const faqs = req.body; // Array of FAQ objects

        // Validate that the array is not empty
        if (!Array.isArray(faqs) || faqs.length === 0) {
            return res.status(400).json({ error: "At least one FAQ is required" });
        }

        // Validate each FAQ object
        for (const faq of faqs) {
            const { serviceId, question, answer } = faq;

            if (!serviceId || !question || !answer) {
                return res.status(400).json({ error: "Each FAQ must have serviceId, question, and answer" });
            }
        }

        // Prepare query to insert multiple FAQs
        const query = "INSERT INTO faqs (service_id, question, answer) VALUES ?";

        // Prepare values array for bulk insert
        const values = faqs.map(faq => [faq.serviceId, faq.question, faq.answer]);

        db.query(query, [values], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "FAQs added successfully",
                affectedRows: result.affectedRows, // Number of rows inserted
            });
        });
    } catch (error) {
        console.error("Error adding multiple FAQs:", error.message);
        res.status(500).json({
            success: false,
            message: "Error adding FAQs",
            error: error.message,
        });
    }
};


// Get FAQ by ID
const getFaqById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = "SELECT * FROM faqs WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "FAQ not found" });
            }
            res.status(200).json(result[0]);
        });
    } catch (error) {
        console.error("Error fetching FAQ:", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching FAQ",
            error: error.message,
        });
    }
};

// Update an FAQ by ID
const updateFaq = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ error: "Question and answer are required" });
        }

        const query = "UPDATE faqs SET question = ?, answer = ? WHERE id = ?";
        db.query(query, [question, answer, id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "FAQ not found" });
            }
            res.status(200).json({
                message: "FAQ updated successfully",
            });
        });
    } catch (error) {
        console.error("Error updating FAQ:", error.message);
        res.status(500).json({
            success: false,
            message: "Error updating FAQ",
            error: error.message,
        });
    }
};

// Delete FAQ by ID
const deleteFaq = async (req, res) => {
    try {
        const { id } = req.params;

        const query = "DELETE FROM faqs WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "FAQ not found" });
            }
            res.status(200).json({
                message: "FAQ deleted successfully",
            });
        });
    } catch (error) {
        console.error("Error deleting FAQ:", error.message);
        res.status(500).json({
            success: false,
            message: "Error deleting FAQ",
            error: error.message,
        });
    }
};

module.exports = {
    addFaq,
    addMultipleFaqs,
    getFaqById,
    updateFaq,
    deleteFaq,
};
