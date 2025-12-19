# 🔧 Résolution de Problèmes

## Erreur: `5 NOT_FOUND` Firestore

### Cause
Cette erreur signifie que la base de données Firestore n'existe pas ou n'est pas correctement configurée.

### Solution étape par étape

#### 1. Vérifier que Firestore est activé

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Sélectionnez votre projet
3. Dans le menu de gauche, cherchez **Firestore Database**
4. Si vous voyez "Create Database", cliquez dessus:
   - Mode: **Native Mode** (pas Datastore Mode!)
   - Location: Choisissez une région proche (ex: `europe-west1` pour l'Europe)
   - Cliquez sur **Create Database**
5. Attendez quelques minutes que la base soit créée

#### 2. Vérifier le fichier gcloud-key.json

Le fichier doit contenir ces champs:
```json
{
  "type": "service_account",
  "project_id": "votre-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...@....iam.gserviceaccount.com"
}
```

**IMPORTANT:** Le `project_id` dans le fichier JSON doit correspondre au projet où Firestore est activé!

#### 3. Vérifier les variables d'environnement

Dans `server/.env`:
```env
GCLOUD_PROJECT_ID=le-meme-project-id-que-dans-le-json
```

#### 4. Vérifier les permissions du compte de service

Le compte de service doit avoir les rôles:
- **Cloud Datastore User** OU
- **Editor** (plus simple pour commencer)

Pour vérifier:
1. Google Cloud Console > **IAM & Admin** > **IAM**
2. Trouvez votre compte de service (email finissant par `@....iam.gserviceaccount.com`)
3. Vérifiez qu'il a au moins le rôle **Editor**

#### 5. Re-télécharger la clé de service

Parfois la clé est corrompue. Re-téléchargez-la:
1. Google Cloud Console > **IAM & Admin** > **Service Accounts**
2. Trouvez votre compte de service
3. Cliquez sur les 3 points > **Manage keys**
4. **Add Key** > **Create new key** > **JSON**
5. Remplacez `server/src/config/gcloud-key.json` par la nouvelle clé

#### 6. Attendre la propagation

Après avoir créé Firestore, attendez 2-3 minutes avant de réessayer.
