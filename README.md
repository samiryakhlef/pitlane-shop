# 🏎️ PitLane Shop - Boutique E-commerce Formula 1

Application e-commerce moderne et sécurisée développée avec React.js, Node.js et Google Cloud.

## 🚀 Fonctionnalités

### Frontend
- ✅ Interface moderne et responsive avec React + Vite
- ✅ Gestion d'état avec Redux Toolkit
- ✅ Routing avec React Router v6
- ✅ Panier d'achat complet
- ✅ Authentification utilisateur
- ✅ Recherche et filtres de produits
- ✅ Paiement sécurisé avec Stripe
- ✅ SEO optimisé avec React Helmet
- ✅ Animations fluides
- ✅ Mode responsive

### Backend
- ✅ API RESTful avec Express.js
- ✅ Authentification JWT sécurisée
- ✅ Validation des données
- ✅ Rate limiting
- ✅ Gestion des erreurs centralisée
- ✅ Upload d'images sécurisé
- ✅ Middleware de sécurité (Helmet, CORS)

### Base de données
- ✅ Google Cloud Firestore (NoSQL)
- ✅ Google Cloud Storage (Images)
- ✅ Collections: Users, Products, Orders, Cart

### Sécurité
- 🔒 HTTPS obligatoire en production
- 🔒 JWT avec refresh tokens
- 🔒 Bcrypt pour les mots de passe
- 🔒 Validation et sanitization des inputs
- 🔒 Protection CSRF
- 🔒 Rate limiting
- 🔒 Headers HTTP sécurisés
- 🔒 CORS configuré strictement

## 📦 Installation

### Prérequis
- Node.js 18+ et npm
- Compte Google Cloud avec Firestore activé
- Compte Stripe (pour les paiements)

### Installation complète
```bash
# Cloner le repository
git clone <votre-repo>
cd pitlane-shop

# Installer toutes les dépendances
npm run install:all
```

### Configuration

#### 1. Google Cloud
1. Créer un projet sur Google Cloud Console
2. Activer Firestore et Cloud Storage
3. Créer un compte de service et télécharger la clé JSON
4. Placer la clé dans `server/config/gcloud-key.json`

#### 2. Variables d'environnement

**Server (.env)**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# JWT
JWT_SECRET=votre_secret_jwt_ultra_securise
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=votre_refresh_secret_ultra_securise
JWT_REFRESH_EXPIRE=30d

# Google Cloud
GCLOUD_PROJECT_ID=votre-project-id
GCLOUD_STORAGE_BUCKET=votre-bucket-name

# Stripe
STRIPE_SECRET_KEY=sk_test_votre_cle
STRIPE_WEBHOOK_SECRET=whsec_votre_secret

# Email (optionnel)
EMAIL_SERVICE=gmail
EMAIL_USER=votre@email.com
EMAIL_PASSWORD=votre_mot_de_passe
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_votre_cle
```

## 🏃 Démarrage

### Développement
```bash
# Démarrer frontend et backend simultanément
npm run dev

# Ou séparément
npm run client  # Frontend sur http://localhost:5173
npm run server  # Backend sur http://localhost:5000
```

### Production
```bash
# Build du frontend
npm run build

# Démarrer le serveur
npm start
```

## 📁 Structure du projet

```
pitlane-shop/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── features/      # Redux slices
│   │   ├── services/      # API calls
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utilitaires
│   │   ├── assets/        # Images, fonts, etc.
│   │   └── App.jsx        # Composant principal
│   └── package.json
│
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── controllers/  # Logique métier
│   │   ├── models/       # Modèles Firestore
│   │   ├── routes/       # Routes API
│   │   ├── middleware/   # Middleware personnalisés
│   │   ├── config/       # Configuration
│   │   └── utils/        # Utilitaires
│   └── package.json
│
└── package.json          # Scripts globaux
```

## 🔐 API Endpoints

### Authentification
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `POST /api/auth/refresh` - Rafraîchir le token
- `GET /api/auth/me` - Profil utilisateur
- `PUT /api/auth/update` - Modifier le profil

### Produits
- `GET /api/products` - Liste des produits (avec filtres)
- `GET /api/products/:id` - Détails d'un produit
- `GET /api/products/category/:category` - Produits par catégorie
- `GET /api/products/search?q=` - Recherche

### Panier
- `GET /api/cart` - Voir le panier
- `POST /api/cart/add` - Ajouter au panier
- `PUT /api/cart/update/:id` - Modifier quantité
- `DELETE /api/cart/remove/:id` - Retirer du panier

### Commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders` - Mes commandes
- `GET /api/orders/:id` - Détails d'une commande

### Paiement
- `POST /api/payment/create-intent` - Créer intention de paiement
- `POST /api/payment/webhook` - Webhook Stripe

### Admin (protégé)
- `POST /api/admin/products` - Créer un produit
- `PUT /api/admin/products/:id` - Modifier un produit
- `DELETE /api/admin/products/:id` - Supprimer un produit
- `GET /api/admin/orders` - Toutes les commandes

## 🎨 Technologies utilisées

### Frontend
- React 18
- Vite
- Redux Toolkit
- React Router 6
- Axios
- React Helmet (SEO)
- React Hook Form
- Yup (validation)
- Stripe React
- Framer Motion
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- JWT
- Bcrypt
- Multer
- Express Validator
- Helmet
- CORS
- Rate Limiter
- Stripe

## 📊 Base de données Firestore

### Collections

**users**
- id, email, password (hashed), firstName, lastName, role, createdAt

**products**
- id, name, description, price, oldPrice, category, images[], stock, rating, reviews, badge, createdAt

**orders**
- id, userId, items[], totalAmount, status, paymentStatus, shippingAddress, createdAt

**cart** (sous-collection de users)
- productId, quantity, addedAt

## 🛡️ Sécurité

- Tous les mots de passe sont hashés avec bcrypt (salt rounds: 12)
- JWT avec expiration et refresh tokens
- Rate limiting: 100 requêtes/15min par IP
- Validation stricte de toutes les entrées
- Sanitization contre XSS
- Headers HTTP sécurisés avec Helmet
- CORS configuré pour le domaine frontend uniquement
- Protection contre les injections NoSQL
- Upload de fichiers sécurisé avec validation de type et taille

## 📈 SEO

- Meta tags dynamiques avec React Helmet
- Open Graph pour réseaux sociaux
- Schema.org markup pour les produits
- Sitemap.xml généré
- URLs sémantiques
- Images optimisées avec lazy loading

## 🚀 Déploiement

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Déployer le dossier `client/dist`

### Backend (Google Cloud Run/Heroku)
1. Configurer les variables d'environnement
2. Déployer avec `gcloud run deploy` ou Heroku CLI

## 📝 Licence

MIT

## 👨‍💻 Auteur

Développé avec ❤️ pour les passionnés de Formula 1
