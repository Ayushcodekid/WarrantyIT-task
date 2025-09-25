const express = require('express');
const { createProduct, listProducts, getUserProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(auth); // Apply auth middleware to all routes

router.post('/create', createProduct);
router.get('/list', listProducts);
router.get('/get/:userId', getUserProductById);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
