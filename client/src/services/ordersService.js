import apiClient from './apiClient';

const ordersService = {
  // Obtenir toutes les commandes de l'utilisateur
  getOrders: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  // Obtenir une commande par ID
  getOrderById: async (orderId) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },

  // Créer une commande
  createOrder: async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  // Annuler une commande
  cancelOrder: async (orderId) => {
    const response = await apiClient.put(`/orders/${orderId}/cancel`);
    return response.data;
  },

  // Admin: Obtenir toutes les commandes
  getAllOrders: async () => {
    const response = await apiClient.get('/admin/orders');
    return response.data;
  },

  // Admin: Mettre à jour le statut d'une commande
  updateOrderStatus: async (orderId, status) => {
    const response = await apiClient.put(`/admin/orders/${orderId}/status`, { status });
    return response.data;
  },
};

export default ordersService;
