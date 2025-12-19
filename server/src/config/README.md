# Configuration Google Cloud

## ⚠️ IMPORTANT

Le fichier `gcloud-key.json` doit être placé dans ce répertoire.

**NE JAMAIS** commiter ce fichier dans Git!

## Comment obtenir la clé de service:

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Sélectionnez votre projet
3. Allez dans **IAM & Admin** > **Service Accounts**
4. Créez un nouveau compte de service ou utilisez-en un existant
5. Cliquez sur **Keys** > **Add Key** > **Create new key**
6. Choisissez **JSON**
7. Téléchargez et renommez le fichier en `gcloud-key.json`
8. Placez-le dans ce répertoire: `server/src/config/gcloud-key.json`

## Structure attendue du fichier JSON:

```json
{
  "type": "service_account",
  "project_id": "votre-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...@...iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

## Permissions requises:

Le compte de service doit avoir les rôles:
- **Cloud Datastore User** (pour Firestore)
- **Storage Object Admin** (pour Cloud Storage)

Ou simplement le rôle **Editor** pour le projet.
