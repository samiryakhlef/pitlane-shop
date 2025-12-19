import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.js';
import {
  getAllOrders,
  updateOrderStatus,
} from '../controllers/ordersController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { productValidation } from '../middleware/validation.js';
import { createLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect, restrictTo('admin'));

// Products management
router.post('/products', createLimiter, productValidation, createProduct);
router.put('/products/:id', productValidation, updateProduct);
router.delete('/products/:id', deleteProduct);

// Orders management
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

export default router;
