# 🚀 Démarrage Rapide - Mode Local

**Testez l'application IMMÉDIATEMENT sans configurer Google Cloud !**

## ✅ Démarrage en 3 étapes

### 1. Installer les dépendances

```bash
npm run install:all
```

### 2. Le fichier .env est déjà configuré

Le fichier `server/.env` est déjà configuré en **mode local** par défaut:
```env
USE_LOCAL_DB=true
```

Cela signifie que l'application utilisera une base de données en mémoire au lieu de Google Cloud.

### 3. Démarrer l'application

```bash
npm run dev
```

## 🎉 C'est tout !

L'application démarre avec:
- ✅ Base de données locale en mémoire
- ✅ 8 produits de démonstration
- ✅ Compte admin: `admin@pitlane.com` / `Admin123!`

### Accéder à l'application

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Health check:** http://localhost:5000/health

## 📝 Données de Démonstration

### Utilisateur Admin
- **Email:** admin@pitlane.com
- **Mot de passe:** Admin123!

### Produits
- 8 produits Formula 1 prêts à l'emploi
- Casquettes, vêtements, accessoires, etc.

## ⚠️ Limitations du Mode Local

Le mode local est parfait pour tester, mais a quelques limitations:

1. ❌ **Données non persistantes** - Les données sont perdues au redémarrage
2. ❌ **Pas de stockage cloud** - Les uploads d'images ne fonctionnent pas
3. ❌ **Mono-instance** - Ne fonctionne que sur un seul serveur

## 🚀 Passer à Google Cloud (Production)

Quand vous êtes prêt pour la production:

### 1. Configurer Google Cloud

1. Créez un projet sur [Google Cloud Console](https://console.cloud.google.com)
2. Activez **Firestore Database** (Native Mode)
3. Créez une **clé de service** (fichier JSON)
4. Placez-la dans `server/src/config/gcloud-key.json`

📖 **Guide détaillé:** Consultez `GETTING_STARTED.md`

### 2. Modifier server/.env

```env
USE_LOCAL_DB=false
GCLOUD_PROJECT_ID=votre-project-id
GCLOUD_STORAGE_BUCKET=votre-bucket-name
```

### 3. Peupler Firestore

```bash
cd server
npm run seed
```

### 4. Redémarrer

```bash
npm run dev
```

## 🔧 Dépannage

### Le serveur ne démarre pas

Vérifiez que le port 5000 n'est pas utilisé:
```bash
# Windows
netstat -ano | findstr :5000

# Linux/Mac
lsof -i :5000
```

### Erreur "Cannot find module"

Réinstallez les dépendances:
```bash
cd server
npm install
cd ../client
npm install
```

### Autres problèmes

Consultez `TROUBLESHOOTING.md` pour plus d'aide.

## 📚 Documentation Complète

- **README.md** - Documentation complète
- **GETTING_STARTED.md** - Installation avec Google Cloud
- **SECURITY.md** - Guide de sécurité
- **TROUBLESHOOTING.md** - Résolution de problèmes

## 💡 Prochaines Étapes

1. ✅ Explorez l'interface sur http://localhost:5173
2. ✅ Connectez-vous en tant qu'admin
3. ✅ Testez le panier et les commandes
4. ✅ Personnalisez le design
5. ✅ Configurez Google Cloud pour la production

---

**Bon développement ! 🏎️**
