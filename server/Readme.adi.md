faqs:
CREATE TABLE faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
