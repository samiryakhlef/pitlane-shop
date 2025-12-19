import { db } from '../config/firebase.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get user cart
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = asyncHandler(async (req, res) => {
  const cartSnapshot = await db
    .collection('users')
    .doc(req.user.id)
    .collection('cart')
    .get();

  const cartItems = await Promise.all(
    cartSnapshot.docs.map(async (doc) => {
      const cartItem = doc.data();
      const productDoc = await db.collection('products').doc(cartItem.productId).get();

      if (!productDoc.exists) {
        return null;
      }

      const product = productDoc.data();

      return {
        id: doc.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
      };
    })
  );

  // Filter out null items (deleted products)
  const validItems = cartItems.filter(item => item !== null);

  res.status(200).json({
    status: 'success',
    data: {
      items: validItems,
    },
  });
});

/**
 * @desc    Add item to cart
 * @route   POST /api/cart/add
 * @access  Private
 */
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  // Verify product exists
  const productDoc = await db.collection('products').doc(productId).get();
  if (!productDoc.exists) {
    throw new AppError('Product not found', 404);
  }

  // Check if item already in cart
  const existingItem = await db
    .collection('users')
    .doc(req.user.id)
    .collection('cart')
    .where('productId', '==', productId)
    .get();

  if (!existingItem.empty) {
    // Update quantity
    const itemDoc = existingItem.docs[0];
    const newQuantity = itemDoc.data().quantity + quantity;

    await db
      .collection('users')
      .doc(req.user.id)
      .collection('cart')
      .doc(itemDoc.id)
      .update({ quantity: newQuantity });
  } else {
    // Add new item
    await db
      .collection('users')
      .doc(req.user.id)
      .collection('cart')
      .add({
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      });
  }

  // Return updated cart
  const cartSnapshot = await db
    .collection('users')
    .doc(req.user.id)
    .collection('cart')
    .get();

  const items = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  res.status(200).json({
    status: 'success',
    data: { items },
  });
});

/**
 * @desc    Update cart item quantity
 * @route   PUT /api/cart/update/:id
 * @access  Private
 */
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  await db
    .collection('users')
    .doc(req.user.id)
    .collection('cart')
    .doc(req.params.id)
    .update({ quantity });

  const cartSnapshot = await db
    .collection('users')
    .doc(req.user.id)
    .collection('cart')
    .get();

  const items = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  res.status(200).json({
    status: 'success',
    data: { items },
  });
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/remove/:id
 * @access  Private
 */
export const removeFromCart = asyncHandler(async (req, res) => {
  await db
    .collection('users')
    .doc(req.user.id)
    .collection('cart')
    .doc(req.params.id)
    .delete();

  const cartSnapshot = await db
    .collection('users')
    .doc(req.user.id)
    .collection('cart')
    .get();

  const items = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  res.status(200).json({
    status: 'success',
    data: { items },
  });
});

/**
 * @desc    Clear cart
 * @route   DELETE /api/cart/clear
 * @access  Private
 */
export const clearCart = asyncHandler(async (req, res) => {
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

  res.status(200).json({
    status: 'success',
    data: { items: [] },
  });
});
