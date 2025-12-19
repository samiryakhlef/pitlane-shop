import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { localDb } from './localDb.js';
import config from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db = null;
let bucket = null;
let usingLocalDb = false;

// MODE LOCAL: Base de données en mémoire
if (config.isLocal) {

  db = localDb;
  usingLocalDb = true;

  // Initialiser avec des données de démo
  const { initLocalDb: initDb } = await import('./mockData.js');
  initDb(db);

// MODE PRODUCTION: Google Cloud Firestore
} else {
  try {
    // Charger la clé de service Google Cloud
    const serviceAccountPath = join(__dirname, 'gcloud-key.json');

    if (!existsSync(serviceAccountPath)) {
      throw new Error('gcloud-key.json not found');
    }

    const serviceAccountFile = readFileSync(serviceAccountPath, 'utf8');
    const serviceAccount = JSON.parse(serviceAccountFile);

    // Initialiser Firebase Admin
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.GCLOUD_STORAGE_BUCKET,
      });

      console.log('✅ Firebase Admin initialized successfully');
    }

    // Firestore Database
    db = admin.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });

    // Cloud Storage
    bucket = admin.storage().bucket();

  } catch (error) {
    console.error('\n❌ ERREUR: Impossible d\'initialiser Google Cloud Firestore');
    console.error('   Message:', error.message);
    console.log('\n💡 Solutions:');
    console.log('   1. Vérifiez que Firestore est activé dans votre projet Google Cloud');
    console.log('   2. Vérifiez que gcloud-key.json existe et est valide');
    console.log('   3. Consultez TROUBLESHOOTING.md pour plus de détails');
    console.log('\n🔧 Pour utiliser le mode local à la place:');
    console.log('   Changez APP_MODE=local dans server/.env\n');

    db = localDb;
    usingLocalDb = true;

    // Initialiser avec des données de démo
    const { initLocalDb: initDb } = await import('./mockData.js');
    initDb(db);
  }
}

export { db, bucket, admin, usingLocalDb };
export default db;
