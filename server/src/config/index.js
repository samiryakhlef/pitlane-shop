/**
 * Configuration centralisée de l'application
 * Gère le switch entre mode LOCAL et PRODUCTION
 */

import dotenv from 'dotenv';

dotenv.config();

// Modes disponibles: 'local' ou 'production'
const APP_MODE = process.env.APP_MODE || 'local';

const config = {
  // Mode de l'application
  mode: APP_MODE,
  isLocal: APP_MODE === 'local',
  isProduction: APP_MODE === 'production',

  // Serveur
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || '30d',
  },

  // Google Cloud (uniquement en mode production)
  gcloud: {
    projectId: process.env.GCLOUD_PROJECT_ID,
    storageBucket: process.env.GCLOUD_STORAGE_BUCKET,
    keyPath: 'server/src/config/gcloud-key.json',
  },

  // Stripe
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },

  // Email (optionnel)
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
};

// Validation de la configuration
export const validateConfig = () => {
  const errors = [];

  // JWT secrets obligatoires
  if (!config.jwt.secret) {
    errors.push('JWT_SECRET is required');
  }
  if (!config.jwt.refreshSecret) {
    errors.push('JWT_REFRESH_SECRET is required');
  }

  // En mode production, vérifier Google Cloud
  if (config.isProduction) {
    if (!config.gcloud.projectId) {
      errors.push('GCLOUD_PROJECT_ID is required in production mode');
    }
    if (!config.gcloud.storageBucket) {
      errors.push('GCLOUD_STORAGE_BUCKET is required in production mode');
    }
  }

  return errors;
};

// Afficher la configuration au démarrage
export const displayConfig = () => {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║        🏎️  PITLANE SHOP CONFIGURATION        ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  if (config.isLocal) {
    console.log('🔧 MODE: LOCAL (Développement)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Base de données: En mémoire (locale)');
    console.log('✅ Données de démo: Préchargées');
    console.log('✅ Persistance: Non (redémarrage = reset)');
    console.log('ℹ️  Parfait pour le développement et les tests');
    console.log('\n💡 Pour passer en production:');
    console.log('   Changez APP_MODE=production dans server/.env\n');
  } else {
    console.log('🚀 MODE: PRODUCTION (Google Cloud)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Base de données: Firestore (${config.gcloud.projectId})`);
    console.log(`✅ Stockage: Cloud Storage (${config.gcloud.storageBucket})`);
    console.log('✅ Persistance: Complète');
    console.log('ℹ️  Configuration production active\n');
  }

  console.log('📍 Configuration serveur:');
  console.log(`   Port: ${config.server.port}`);
  console.log(`   Client URL: ${config.server.clientUrl}`);
  console.log(`   Node ENV: ${config.server.nodeEnv}\n`);
};

export default config;
