import axios from 'axios';
import toast from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête pour ajouter le token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Token expiré ou invalide
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        toast.error('Session expirée. Veuillez vous reconnecter.');
      }

      // Erreur serveur
      if (status >= 500) {
        toast.error('Erreur serveur. Veuillez réessayer plus tard.');
      }

      // Retourner le message d'erreur
      const errorMessage = data?.message || data?.error || 'Une erreur est survenue';
      return Promise.reject(new Error(errorMessage));
    }

    // Erreur réseau
    if (error.request) {
      toast.error('Erreur de connexion. Vérifiez votre connexion internet.');
      return Promise.reject(new Error('Erreur de connexion'));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
