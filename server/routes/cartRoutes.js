const express = require('express');
const router = express.Router();

// Importing the controller
const {
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
} = require('../controllers/cartController');


// services
router.get("/getService", getAllServices); 
router.get("/getServiceByID/:id", getServiceById);
router.post("/addService", addService);
router.delete("/deleteServiceByID/:id", deleteService);
router.put("/updateServiceByID/:id", updateService);
router.post("/multipleService",addMultipleService);

// cart items
router.post('/add', createCartItem);
router.get('/:user_id', getCartItems); 
router.put('/update/:cart_item_id', updateCartItem);
router.delete('/delete/:cart_item_id', deleteCartItem);

module.exports = router;
