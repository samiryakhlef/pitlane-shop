import { db } from '../config/firebase.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all products with pagination and filters
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 12, category, search, sortBy = 'newest', priceMin, priceMax } = req.query;

  let query = db.collection('products');

  // Filter by category
  if (category && category !== 'all') {
    query = query.where('category', '==', category);
  }

  // Filter by price range
  if (priceMin) {
    query = query.where('price', '>=', Number(priceMin));
  }
  if (priceMax) {
    query = query.where('price', '<=', Number(priceMax));
  }

  // Get all matching products
  const snapshot = await query.get();
  let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Search filter (in-memory since Firestore doesn't support full-text search)
  if (search) {
    const searchLower = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Sorting
  products.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'popular':
        return (b.reviews || 0) - (a.reviews || 0);
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = products.slice(startIndex, endIndex);

  res.status(200).json({
    status: 'success',
    data: {
      products: paginatedProducts,
      page: Number(page),
      limit: Number(limit),
      total: products.length,
      totalPages: Math.ceil(products.length / limit),
    },
  });
});

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProduct = asyncHandler(async (req, res) => {
  const productDoc = await db.collection('products').doc(req.params.id).get();

  if (!productDoc.exists) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      id: productDoc.id,
      ...productDoc.data(),
    },
  });
});

/**
 * @desc    Get product categories
 * @route   GET /api/products/categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = [
    { name: 'Vêtements', count: 230 },
    { name: 'Casquettes', count: 145 },
    { name: 'Accessoires', count: 189 },
    { name: 'Modèles réduits', count: 98 },
    { name: 'Posters', count: 167 },
    { name: 'Livres', count: 76 },
  ];

  res.status(200).json({
    status: 'success',
    data: categories,
  });
});

/**
 * @desc    Create product (Admin)
 * @route   POST /api/admin/products
 * @access  Private/Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
  const productData = {
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const productRef = await db.collection('products').add(productData);

  res.status(201).json({
    status: 'success',
    data: {
      id: productRef.id,
      ...productData,
    },
  });
});

/**
 * @desc    Update product (Admin)
 * @route   PUT /api/admin/products/:id
 * @access  Private/Admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const productDoc = await db.collection('products').doc(req.params.id).get();

  if (!productDoc.exists) {
    throw new AppError('Product not found', 404);
  }

  const updateData = {
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  await db.collection('products').doc(req.params.id).update(updateData);

  const updatedProduct = await db.collection('products').doc(req.params.id).get();

  res.status(200).json({
    status: 'success',
    data: {
      id: updatedProduct.id,
      ...updatedProduct.data(),
    },
  });
});

/**
 * @desc    Delete product (Admin)
 * @route   DELETE /api/admin/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const productDoc = await db.collection('products').doc(req.params.id).get();

  if (!productDoc.exists) {
    throw new AppError('Product not found', 404);
  }

  await db.collection('products').doc(req.params.id).delete();

  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully',
  });
});
