# 🚀 Guide de Démarrage - PitLane Shop

Guide complet pour installer et démarrer l'application PitLane Shop.

## 📋 Prérequis

Assurez-vous d'avoir installé:
- **Node.js** 18+ et npm
- **Compte Google Cloud** avec Firestore et Cloud Storage activés
- **Compte Stripe** (pour les paiements)

## 🔧 Installation

### 1. Cloner le projet

```bash
cd pitlane-shop
```

### 2. Installer toutes les dépendances

```bash
npm run install:all
```

Cette commande installe les dépendances pour:
- Le projet root
- Le frontend (client/)
- Le backend (server/)

## ⚙️ Configuration

### 1. Configuration Google Cloud Firestore

#### a. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Notez le **Project ID**

#### b. Activer Firestore

1. Dans le menu, allez dans **Firestore Database**
2. Cliquez sur **Create Database**
3. Choisissez **Production mode**
4. Sélectionnez votre région (ex: europe-west1)

#### c. Activer Cloud Storage

1. Dans le menu, allez dans **Cloud Storage**
2. Créez un nouveau bucket
3. Notez le nom du bucket

#### d. Créer une clé de service

1. Allez dans **IAM & Admin** > **Service Accounts**
2. Cliquez sur **Create Service Account**
3. Donnez-lui un nom (ex: pitlane-shop-sa)
4. Accordez le rôle **Editor** ou **Owner**
5. Cliquez sur **Create Key**
6. Choisissez **JSON** et téléchargez le fichier

#### e. Placer la clé de service

Déplacez le fichier JSON téléchargé vers:
```
server/src/config/gcloud-key.json
```

⚠️ **IMPORTANT:** Ce fichier ne doit JAMAIS être commité dans Git!

### 2. Configuration des variables d'environnement

#### Frontend (.env)

Créez `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_votre_cle_publique_stripe
```

#### Backend (.env)

Créez `server/.env` à partir de `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# JWT (CHANGEZ CES VALEURS!)
JWT_SECRET=votre_secret_ultra_securise_minimum_32_caracteres
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=votre_refresh_secret_ultra_securise_minimum_32_caracteres
JWT_REFRESH_EXPIRE=30d

# Google Cloud
GCLOUD_PROJECT_ID=votre-project-id
GCLOUD_STORAGE_BUCKET=votre-bucket-name

# Stripe
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_stripe
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret
```

### 3. Configuration Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. En mode Test, récupérez:
   - **Clé publique** (pk_test_...)
   - **Clé secrète** (sk_test_...)
3. Ajoutez-les dans vos fichiers .env

## 🌱 Initialiser la base de données

Peuplez Firestore avec des données de démonstration:

```bash
cd server
npm run seed
```

Cela créera:
- ✅ Un utilisateur admin: `admin@pitlane.com` / `Admin123!`
- ✅ 8 produits de démonstration

## 🏃 Démarrage

### Option 1: Tout démarrer en même temps (Recommandé)

Depuis la racine du projet:
```bash
npm run dev
```

Cela démarre:
- 🌐 Frontend sur http://localhost:5173
- 🔌 Backend sur http://localhost:5000

### Option 2: Démarrage séparé

**Frontend:**
```bash
cd client
npm run dev
```

**Backend:**
```bash
cd server
npm run dev
```

## ✅ Vérification

1. **Backend:** Ouvrez http://localhost:5000/health
   - Vous devriez voir: `{"status":"success","message":"Server is running"}`

2. **Frontend:** Ouvrez http://localhost:5173
   - La page d'accueil devrait s'afficher

3. **Connexion Admin:**
   - Email: `admin@pitlane.com`
   - Mot de passe: `Admin123!`

## 🔒 Sécurité

### Avant de déployer en production:

1. ✅ Changez tous les secrets JWT dans `.env`
2. ✅ Utilisez des clés Stripe en mode Production
3. ✅ Configurez HTTPS obligatoire
4. ✅ Activez les règles de sécurité Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Cart subcollection
      match /cart/{cartId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Products (public read, admin write)
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null &&
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Orders (user's own orders only)
    match /orders/{orderId} {
      allow read: if request.auth != null &&
                    (resource.data.userId == request.auth.uid ||
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
    }
  }
}
```

## 🐛 Résolution de problèmes

### Erreur: "Firebase Admin not initialized"

- Vérifiez que `server/src/config/gcloud-key.json` existe
- Vérifiez que les variables `GCLOUD_PROJECT_ID` et `GCLOUD_STORAGE_BUCKET` sont correctes

### Erreur CORS

- Vérifiez que `CLIENT_URL` dans `server/.env` correspond à l'URL du frontend
- En développement: `http://localhost:5173`

### Port déjà utilisé

- Changez le port dans les fichiers .env
- Frontend: Modifiez `client/vite.config.js`
- Backend: Modifiez `PORT` dans `server/.env`

### Erreur Stripe

- Vérifiez que les clés Stripe sont correctes
- Utilisez les clés de test en développement (pk_test_... et sk_test_...)

## 📚 Ressources utiles

- [Documentation React](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Express.js](https://expressjs.com)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 🎯 Prochaines étapes

1. ✅ Explorez l'application
2. ✅ Testez les fonctionnalités (panier, commandes, etc.)
3. ✅ Personnalisez le design selon vos besoins
4. ✅ Ajoutez vos propres produits via le panel admin
5. ✅ Configurez le déploiement en production

## 🚀 Déploiement

### Frontend (Vercel/Netlify)

```bash
cd client
npm run build
# Déployez le dossier dist/
```

### Backend (Google Cloud Run)

```bash
cd server
gcloud run deploy pitlane-shop-api \
  --source . \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

## 💬 Support

Pour toute question:
- Consultez le README.md principal
- Vérifiez les logs de la console
- Consultez la documentation des technologies utilisées

---

**Bon développement ! 🏎️**
