# 🔒 Sécurité - PitLane Shop

Ce document détaille toutes les mesures de sécurité implémentées dans l'application.

## 🛡️ Mesures de sécurité implémentées

### 1. Authentification et Autorisation

#### JWT (JSON Web Tokens)
- ✅ Tokens signés avec HS256
- ✅ Expiration configurée (7 jours par défaut)
- ✅ Refresh tokens pour prolonger les sessions
- ✅ Tokens stockés côté client dans localStorage (avec HttpOnly cookies recommandé en production)

#### Mots de passe
- ✅ Hachage avec bcrypt (12 salt rounds)
- ✅ Validation minimale: 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
- ✅ Jamais stockés en clair
- ✅ Jamais renvoyés dans les réponses API

#### Contrôle d'accès par rôle (RBAC)
- ✅ Middleware `restrictTo()` pour limiter l'accès par rôle
- ✅ Rôles: `user`, `admin`
- ✅ Routes admin protégées

### 2. Protection contre les attaques

#### XSS (Cross-Site Scripting)
- ✅ Sanitization de toutes les entrées utilisateur
- ✅ Helmet.js pour sécuriser les headers HTTP
- ✅ Content Security Policy (CSP) configurée
- ✅ Escape automatique dans React

#### CSRF (Cross-Site Request Forgery)
- ✅ CORS configuré strictement
- ✅ Origin vérifiée sur chaque requête
- ✅ Tokens JWT dans headers Authorization

#### SQL/NoSQL Injection
- ✅ Validation de toutes les entrées avec express-validator
- ✅ Utilisation de requêtes paramétrées Firestore
- ✅ Pas d'exécution directe de requêtes utilisateur

#### Rate Limiting
- ✅ Limitation générale: 100 requêtes/15min
- ✅ Limitation auth: 5 tentatives/15min
- ✅ Limitation création: 10 créations/heure
- ✅ Protection contre les attaques par force brute

### 3. Sécurité des données

#### Base de données (Firestore)
- ✅ Règles de sécurité Firestore configurées
- ✅ Accès restreint par authentification
- ✅ Validation côté serveur et base de données

#### Données sensibles
- ✅ Variables d'environnement pour les secrets (.env)
- ✅ Fichiers sensibles dans .gitignore
- ✅ Clés Google Cloud jamais commitées

#### Transmission
- ✅ HTTPS obligatoire en production
- ✅ Headers sécurisés avec Helmet
- ✅ Cookies sécurisés (secure, httpOnly, sameSite)

### 4. Validation des données

#### Côté serveur
- ✅ Express-validator pour toutes les routes
- ✅ Validation des types de données
- ✅ Validation des formats (email, etc.)
- ✅ Validation des longueurs

#### Côté client
- ✅ React Hook Form pour les formulaires
- ✅ Yup pour les schémas de validation
- ✅ Feedback immédiat à l'utilisateur

### 5. Logging et monitoring

#### Logs
- ✅ Morgan pour le logging HTTP
- ✅ Logs différenciés dev/production
- ✅ Erreurs loggées avec stack traces en dev

#### Erreurs
- ✅ Gestionnaire d'erreurs centralisé
- ✅ Messages d'erreur génériques en production
- ✅ Pas d'exposition de détails sensibles

### 6. Upload de fichiers

- ✅ Multer avec validation de type MIME
- ✅ Limitation de taille (10MB max)
- ✅ Noms de fichiers sécurisés (UUID)
- ✅ Stockage sur Google Cloud Storage

### 7. Paiements (Stripe)

- ✅ Stripe.js pour sécuriser les infos de carte
- ✅ Pas de stockage des données de carte
- ✅ Webhooks sécurisés avec signature
- ✅ Mode test en développement

## ⚠️ Checklist avant production

### Backend
- [ ] Générer de nouveaux secrets JWT forts
- [ ] Configurer HTTPS obligatoire
- [ ] Activer les clés Stripe en mode Production
- [ ] Configurer les règles Firestore strictes
- [ ] Activer le logging en production
- [ ] Configurer les CORS pour le domaine de production uniquement
- [ ] Augmenter les timeouts si nécessaire
- [ ] Activer la compression
- [ ] Configurer les variables d'environnement de production

### Frontend
- [ ] Supprimer tous les console.log
- [ ] Minifier le code (automatique avec Vite)
- [ ] Configurer la CSP
- [ ] Activer le HTTPS
- [ ] Vérifier les clés API publiques
- [ ] Tester sur différents navigateurs

### Infrastructure
- [ ] Configurer les backups Firestore automatiques
- [ ] Mettre en place un système de monitoring
- [ ] Configurer les alertes d'erreur
- [ ] Tester le disaster recovery
- [ ] Documenter les procédures d'urgence

## 🚨 En cas de compromission

### Si une clé API est exposée:
1. Révoquer immédiatement la clé
2. Générer une nouvelle clé
3. Mettre à jour toutes les instances
4. Vérifier les logs pour détecter une utilisation abusive
5. Notifier les utilisateurs si nécessaire

### Si la base de données est compromise:
1. Isoler la base de données
2. Analyser les logs d'accès
3. Restaurer depuis un backup si nécessaire
4. Forcer la réinitialisation des mots de passe utilisateurs
5. Audit complet de sécurité

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Stripe Security](https://stripe.com/docs/security)

## 🔄 Mises à jour

- Vérifier régulièrement les dépendances avec `npm audit`
- Mettre à jour les packages de sécurité rapidement
- Suivre les CVE des technologies utilisées
- Tester les mises à jour en staging avant production

---

**La sécurité est un processus continu, pas un état final.**
