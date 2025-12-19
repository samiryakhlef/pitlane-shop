import bcrypt from 'bcryptjs';
import { db } from '../config/firebase.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { generateToken, generateRefreshToken } from '../middleware/auth.js';

/**
 * @desc    Inscription d'un nouvel utilisateur
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const existingUsers = await db.collection('users').where('email', '==', email).get();
  if (!existingUsers.empty) {
    throw new AppError('User already exists with this email', 400);
  }

  // Hasher le mot de passe
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Créer l'utilisateur
  const userData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const userRef = await db.collection('users').add(userData);
  const userId = userRef.id;

  // Générer les tokens
  const token = generateToken(userId);
  const refreshToken = generateRefreshToken(userId);

  // Retourner la réponse (sans le mot de passe)
  const { password: _, ...userWithoutPassword } = userData;

  res.status(201).json({
    status: 'success',
    data: {
      user: {
        id: userId,
        ...userWithoutPassword,
      },
      token,
      refreshToken,
    },
  });
});

/**
 * @desc    Connexion utilisateur
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Trouver l'utilisateur
  const usersSnapshot = await db.collection('users').where('email', '==', email).get();

  if (usersSnapshot.empty) {
    throw new AppError('Invalid credentials', 401);
  }

  const userDoc = usersSnapshot.docs[0];
  const user = userDoc.data();

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  // Générer les tokens
  const token = generateToken(userDoc.id);
  const refreshToken = generateRefreshToken(userDoc.id);

  // Retourner la réponse
  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: userDoc.id,
        ...userWithoutPassword,
      },
      token,
      refreshToken,
    },
  });
});

/**
 * @desc    Obtenir le profil utilisateur
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const { password, ...userWithoutPassword } = req.user;

  res.status(200).json({
    status: 'success',
    data: userWithoutPassword,
  });
});

/**
 * @desc    Mettre à jour le profil
 * @route   PUT /api/auth/update
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, address } = req.body;

  const updateData = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(phone && { phone }),
    ...(address && { address }),
    updatedAt: new Date().toISOString(),
  };

  await db.collection('users').doc(req.user.id).update(updateData);

  const updatedUser = await db.collection('users').doc(req.user.id).get();
  const { password, ...userWithoutPassword } = updatedUser.data();

  res.status(200).json({
    status: 'success',
    data: {
      id: req.user.id,
      ...userWithoutPassword,
    },
  });
});

/**
 * @desc    Changer le mot de passe
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Vérifier le mot de passe actuel
  const isPasswordValid = await bcrypt.compare(currentPassword, req.user.password);

  if (!isPasswordValid) {
    throw new AppError('Current password is incorrect', 401);
  }

  // Hasher le nouveau mot de passe
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Mettre à jour le mot de passe
  await db.collection('users').doc(req.user.id).update({
    password: hashedPassword,
    updatedAt: new Date().toISOString(),
  });

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully',
  });
});
