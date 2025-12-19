# 🔄 Guide de Basculement entre Modes Local et Production

Ce guide explique comment basculer facilement entre le mode **LOCAL** (développement) et le mode **PRODUCTION** (Google Cloud).

## 🎯 Vue d'Ensemble

L'application PitLane Shop supporte deux modes:

| Mode | Description | Base de données | Persistance | Usage |
|------|-------------|-----------------|-------------|-------|
| **local** | Développement | En mémoire | ❌ Non | Tests, dev |
| **production** | Production | Google Cloud Firestore | ✅ Oui | Production |

## 🔧 Mode LOCAL (par défaut)

### Caractéristiques
- ✅ Aucune configuration Google Cloud requise
- ✅ Démarrage instantané
- ✅ Données de démo préchargées
- ✅ Parfait pour le développement
- ❌ Données perdues au redémarrage
- ❌ Pas de stockage cloud pour les images

### Configuration

Dans `server/.env`:
```env
APP_MODE=local
```

### Démarrage
```bash
npm run dev
```

Vous verrez:
```
╔════════════════════════════════════════════════╗
║        🏎️  PITLANE SHOP CONFIGURATION        ║
╚════════════════════════════════════════════════╝

🔧 MODE: LOCAL (Développement)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Base de données: En mémoire (locale)
✅ Données de démo: Préchargées
✅ Persistance: Non (redémarrage = reset)
ℹ️  Parfait pour le développement et les tests

💡 Pour passer en production:
   Changez APP_MODE=production dans server/.env
```

## 🚀 Mode PRODUCTION

### Prérequis
1. ✅ Projet Google Cloud créé
2. ✅ Firestore Database activé (Native Mode)
3. ✅ Clé de service téléchargée
4. ✅ Clé placée dans `server/src/config/gcloud-key.json`

### Configuration Google Cloud (à faire une seule fois)

#### 1. Créer et configurer Firestore

```bash
# 1. Allez sur Google Cloud Console
https://console.cloud.google.com

# 2. Sélectionnez votre projet: pitlane-481720

# 3. Menu > Firestore Database > Create Database
- Mode: Native Mode (IMPORTANT!)
- Location: europe-west1 (ou votre région)

# 4. Attendez 2-3 minutes que la base soit créée
```

#### 2. Créer la clé de service

```bash
# 1. Menu > IAM & Admin > Service Accounts

# 2. Create Service Account
- Nom: pitlane-shop-sa
- Description: Service account for PitLane Shop

# 3. Grant permissions
- Rôle: Editor (ou Cloud Datastore User + Storage Admin)

# 4. Create Key
- Type: JSON
- Télécharger le fichier

# 5. Placer la clé
Renommez le fichier en: gcloud-key.json
Placez-le dans: server/src/config/gcloud-key.json
```

#### 3. Peupler Firestore

```bash
# Assurez-vous d'être en mode production
cd server
npm run seed
```

### Basculer en mode PRODUCTION

Dans `server/.env`:
```env
APP_MODE=production
GCLOUD_PROJECT_ID=pitlane-481720
GCLOUD_STORAGE_BUCKET=pitlane-buckets
```

### Démarrage
```bash
npm run dev
```

Vous verrez:
```
╔════════════════════════════════════════════════╗
║        🏎️  PITLANE SHOP CONFIGURATION        ║
╚════════════════════════════════════════════════╝

🚀 MODE: PRODUCTION (Google Cloud)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Base de données: Firestore (pitlane-481720)
✅ Stockage: Cloud Storage (pitlane-buckets)
✅ Persistance: Complète
ℹ️  Configuration production active

✅ Firebase Admin initialized successfully
✅ Connected to Google Cloud Firestore
```

## 🔄 Workflow de Développement Recommandé

### Développement quotidien
```env
APP_MODE=local
```
- Développez et testez rapidement
- Pas besoin de Google Cloud
- Redémarrage rapide

### Tests avant production
```env
APP_MODE=production
```
- Testez avec Firestore
- Vérifiez les performances
- Testez les uploads d'images

### Déploiement production
```env
APP_MODE=production
NODE_ENV=production
```
- Utilisez les vraies données
- Backups automatiques
- Monitoring actif

## 📊 Comparaison des Modes

### Performance
- **Local**: ⚡ Ultra-rapide (en mémoire)
- **Production**: 🚀 Rapide (réseau GCloud)

### Données
- **Local**: 🔄 Reset au redémarrage
- **Production**: 💾 Persistantes

### Coût
- **Local**: 💰 Gratuit
- **Production**: 💰 Payant (selon usage)

### Scalabilité
- **Local**: 👤 Un seul serveur
- **Production**: 🌍 Multi-instances

## ⚠️ Erreurs Courantes

### Erreur: "5 NOT_FOUND" en mode production

**Cause**: Firestore n'est pas activé ou n'existe pas

**Solution**:
1. Vérifiez que Firestore est créé (Native Mode)
2. Attendez 2-3 minutes après la création
3. Vérifiez le `GCLOUD_PROJECT_ID`

### Erreur: "gcloud-key.json not found"

**Cause**: Fichier de clé manquant

**Solution**:
1. Téléchargez la clé depuis Google Cloud Console
2. Placez-la dans `server/src/config/gcloud-key.json`
3. Vérifiez les permissions du fichier

### L'application bascule en mode local automatiquement

**Cause**: Erreur de configuration Google Cloud

**Solution**:
1. Consultez les logs du serveur
2. Vérifiez `TROUBLESHOOTING.md`
3. Ou restez en mode local pour le développement

## 🎯 Commandes Rapides

```bash
# Mode local (défaut)
APP_MODE=local npm run dev

# Mode production
APP_MODE=production npm run dev

# Ou modifiez directement server/.env
```

## 📚 Fichiers Importants

- `server/.env` - Configuration principale
- `server/src/config/index.js` - Gestion des modes
- `server/src/config/firebase.js` - Connexion DB
- `server/src/config/gcloud-key.json` - Clé Google Cloud (ne pas commiter!)

## 💡 Conseils

1. **Développement**: Utilisez toujours le mode **local**
2. **Tests**: Basculez en **production** avant de déployer
3. **Production**: Vérifiez 2 fois la configuration
4. **Backup**: Configurez des backups Firestore automatiques
5. **Monitoring**: Activez Cloud Monitoring en production

---

**Besoin d'aide?** Consultez `TROUBLESHOOTING.md`
