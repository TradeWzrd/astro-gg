-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    discount INT,
    rating DECIMAL(3, 2),
    review_count INT,
    image_url VARCHAR(255),
    features JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample service data
INSERT INTO services (id, name, description, price, original_price, discount, rating, review_count, image_url, features) 
VALUES (
    'vastu-consultation',
    'Vastu Consultation Platinum',
    'Transform your space into a haven of positive energy with our premium Vastu consultation service. Our certified experts will provide comprehensive analysis and personalized recommendations to enhance the harmony and prosperity of your environment.',
    1000.00,
    2000.00,
    50,
    4.8,
    128,
    '/assets/vastu-consultation.jpg',
    '[
        {
            "icon": "FaClock",
            "title": "60-Min Session",
            "description": "Detailed consultation"
        },
        {
            "icon": "FaVideo",
            "title": "Video Call",
            "description": "Face-to-face guidance"
        },
        {
            "icon": "FaFileAlt",
            "title": "Detailed Report",
            "description": "Written recommendations"
        },
        {
            "icon": "FaPhoneAlt",
            "title": "Follow-up Call",
            "description": "30-day support"
        }
    ]'
);
