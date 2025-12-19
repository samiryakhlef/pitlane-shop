import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';
import { cartValidation } from '../middleware/validation.js';

const router = express.Router();

// All cart routes require authentication
router.use(protect);

router.get('/', getCart);
router.post('/add', cartValidation, addToCart);
router.put('/update/:id', updateCartItem);
router.delete('/remove/:id', removeFromCart);
router.delete('/clear', clearCart);

export default router;
