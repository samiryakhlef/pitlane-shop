import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
} from '../controllers/ordersController.js';
import { protect } from '../middleware/auth.js';
import { orderValidation } from '../middleware/validation.js';

const router = express.Router();

// All order routes require authentication
router.use(protect);

router.get('/', getOrders);
router.post('/', orderValidation, createOrder);
router.get('/:id', getOrder);

export default router;
