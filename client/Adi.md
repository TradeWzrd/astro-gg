CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`cart_id`),
  CONSTRAINT FK_user_id FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`),
  CONSTRAINT FK_item_id_cart_items FOREIGN KEY (`item_id`) REFERENCES `cart_items` (`cart_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
