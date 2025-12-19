import rateLimit from 'express-rate-limit';

/**
 * Rate limiter général
 * 100 requêtes par 15 minutes
 */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite de 100 requêtes par IP
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter strict pour l'authentification
 * 5 tentatives par 15 minutes
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: 'error',
    message: 'Too many login attempts, please try again later.',
  },
  skipSuccessfulRequests: true, // Ne compte que les échecs
});

/**
 * Rate limiter pour les créations (register, create product, etc.)
 * 10 créations par heure
 */
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    status: 'error',
    message: 'Too many creation requests, please try again later.',
  },
});
