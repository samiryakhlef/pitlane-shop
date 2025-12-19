import { db } from '../config/firebase.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get user orders
 * @route   GET /api/orders
 * @access  Private
 */
export const getOrders = asyncHandler(async (req, res) => {
  const ordersSnapshot = await db
    .collection('orders')
    .where('userId', '==', req.user.id)
    .orderBy('createdAt', 'desc')
    .get();

  const orders = ordersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

/**
 * @desc    Get single order
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrder = asyncHandler(async (req, res) => {
  const orderDoc = await db.collection('orders').doc(req.params.id).get();

  if (!orderDoc.exists) {
    throw new AppError('Order not found', 404);
  }

  const order = orderDoc.data();

  // Verify user owns this order
  if (order.userId !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Not authorized to access this order', 403);
  }

  res.status(200).json({
    status: 'success',
    data: {
      id: orderDoc.id,
      ...order,
    },
  });
});

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod = 'stripe' } = req.body;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.20;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const orderData = {
    userId: req.user.id,
    items,
    shippingAddress,
    paymentMethod,
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    totalAmount: Number(total.toFixed(2)),
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const orderRef = await db.collection('orders').add(orderData);

  // Clear user cart
  const cartSnapshot = await db
    .collection('users')
    .doc(req.user.id)
    .collection('cart')
    .get();

  const batch = db.batch();
  cartSnapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  res.status(201).json({
    status: 'success',
    data: {
      id: orderRef.id,
      ...orderData,
    },
  });
});

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const ordersSnapshot = await db
    .collection('orders')
    .orderBy('createdAt', 'desc')
    .get();

  const orders = ordersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

/**
 * @desc    Update order status (Admin)
 * @route   PUT /api/admin/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const orderDoc = await db.collection('orders').doc(req.params.id).get();

  if (!orderDoc.exists) {
    throw new AppError('Order not found', 404);
  }

  await db.collection('orders').doc(req.params.id).update({
    status,
    updatedAt: new Date().toISOString(),
  });

  const updatedOrder = await db.collection('orders').doc(req.params.id).get();

  res.status(200).json({
    status: 'success',
    data: {
      id: updatedOrder.id,
      ...updatedOrder.data(),
    },
  });
});
