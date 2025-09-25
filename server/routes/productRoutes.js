const express = require('express');
const { createProduct, listProducts, getUserProductById, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(auth); // Apply auth middleware to all routes

router.post('/create', createProduct);
router.get('/list', listProducts);
router.get('/get/:userId', getUserProductById);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
