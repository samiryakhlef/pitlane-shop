import jwt from 'jsonwebtoken';
import { AppError, asyncHandler } from './errorHandler.js';
import { db } from '../config/firebase.js';

/**
 * Middleware de protection des routes
 * Vérifie la présence et la validité du token JWT
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Récupérer le token depuis le header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Not authorized to access this route', 401);
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérer l'utilisateur depuis Firestore
    const userDoc = await db.collection('users').doc(decoded.id).get();

    if (!userDoc.exists) {
      throw new AppError('User no longer exists', 401);
    }

    // Ajouter l'utilisateur à la requête
    req.user = {
      id: userDoc.id,
      ...userDoc.data(),
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid token', 401);
    }
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Token expired', 401);
    }
    throw error;
  }
});

/**
 * Middleware de restriction par rôle
 * @param  {...string} roles - Rôles autorisés
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('You do not have permission to perform this action', 403);
    }
    next();
  };
};

/**
 * Générer un token JWT
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Générer un refresh token
 */
export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
  });
};
