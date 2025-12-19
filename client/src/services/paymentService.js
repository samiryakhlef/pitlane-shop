import apiClient from './apiClient';

const paymentService = {
  // Créer une intention de paiement Stripe
  createPaymentIntent: async (amount) => {
    const response = await apiClient.post('/payment/create-intent', { amount });
    return response.data;
  },

  // Confirmer le paiement
  confirmPayment: async (paymentIntentId) => {
    const response = await apiClient.post('/payment/confirm', { paymentIntentId });
    return response.data;
  },

  // Obtenir l'historique des paiements
  getPaymentHistory: async () => {
    const response = await apiClient.get('/payment/history');
    return response.data;
  },
};

export default paymentService;
