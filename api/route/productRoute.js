const express = require('express');
const ProductController = require('../controller/product_controller');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// router.post('/save-customer', verifyToken, ProductController.createProduct);
router.post('/save-product',ProductController.createProduct);
// router.get('/find-customer', verifyToken, ProductController.findProduct);
router.get('/find-product/:id',ProductController.findProduct);
// router.put('/update-customer', verifyToken, ProductController.updateProduct);
router.put('/update-product/:id',ProductController.updateProduct);

router.delete('/delete-by-id/:id',ProductController.deleteProduct);
// router.get('/find-all-customer', verifyToken, ProductController.findAllProduct);
router.get('/find-all-product',ProductController.findAllProduct);


// router.get('/find-all-min',verifyUser, ProductController.findAllMin);
// router.get('/find-all-count',verifyUser, ProductController.findCount);
// router.get('/find-all-min', verifyToken, ProductController.findAllMin);
// router.get('/find-all-count', verifyToken, ProductController.findAllCount);

module.exports = router;