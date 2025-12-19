import apiClient from './apiClient';

const cartService = {
  // Obtenir le panier
  getCart: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  // Ajouter un produit au panier
  addToCart: async (productId, quantity = 1) => {
    const response = await apiClient.post('/cart/add', { productId, quantity });
    return response.data;
  },

  // Mettre à jour la quantité d'un produit
  updateCartItem: async (itemId, quantity) => {
    const response = await apiClient.put(`/cart/update/${itemId}`, { quantity });
    return response.data;
  },

  // Retirer un produit du panier
  removeFromCart: async (itemId) => {
    const response = await apiClient.delete(`/cart/remove/${itemId}`);
    return response.data;
  },

  // Vider le panier
  clearCart: async () => {
    const response = await apiClient.delete('/cart/clear');
    return response.data;
  },

  // Synchroniser le panier local avec le serveur (après connexion)
  syncCart: async (localCart) => {
    const response = await apiClient.post('/cart/sync', { items: localCart });
    return response.data;
  },
};

export default cartService;
