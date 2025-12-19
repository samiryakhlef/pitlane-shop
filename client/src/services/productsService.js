import apiClient from './apiClient';

const productsService = {
  // Obtenir tous les produits avec filtres
  getProducts: async ({ page = 1, limit = 12, category, search, sortBy, priceMin, priceMax }) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (sortBy) params.append('sortBy', sortBy);
    if (priceMin) params.append('priceMin', priceMin);
    if (priceMax) params.append('priceMax', priceMax);

    const response = await apiClient.get(`/products?${params.toString()}`);
    return response.data;
  },

  // Obtenir un produit par ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Obtenir les produits par catégorie
  getProductsByCategory: async (category) => {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  },

  // Rechercher des produits
  searchProducts: async (query) => {
    const response = await apiClient.get(`/products/search?q=${query}`);
    return response.data;
  },

  // Obtenir les catégories
  getCategories: async () => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  },

  // Obtenir les produits en vedette
  getFeaturedProducts: async () => {
    const response = await apiClient.get('/products/featured');
    return response.data;
  },

  // Obtenir les nouveautés
  getNewProducts: async () => {
    const response = await apiClient.get('/products/new');
    return response.data;
  },

  // Admin: Créer un produit
  createProduct: async (productData) => {
    const response = await apiClient.post('/admin/products', productData);
    return response.data;
  },

  // Admin: Modifier un produit
  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/admin/products/${id}`, productData);
    return response.data;
  },

  // Admin: Supprimer un produit
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/admin/products/${id}`);
    return response.data;
  },

  // Admin: Upload d'image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiClient.post('/admin/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default productsService;
