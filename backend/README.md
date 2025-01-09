# Backend - MasterIM Project

Ce backend est conçu pour gérer les fonctionnalités principales du site web de l'association MasterIM, notamment la gestion des utilisateurs, des actualités, des commentaires et des votes.

---

## **Technologies utilisées**

- Node.js
- Express.js
- MySQL
- dotenv (gestion des variables d'environnement)
- bcrypt (hachage des mots de passe)
- UUID (génération de tokens uniques)
- JSON Web Tokens (gestion des tokens)
- Body-parser (parsing des requêtes HTTP)

---

## **Installation**

### **1. Cloner le dépôt :**

```bash
git clone <lien-du-repo>
cd backend
```

### **2. Installer les dépendances :**

```bash
npm install
```

### **3. Configurer la base de données :**

- Assurez-vous que MySQL est installé et configuré.
- Créez la base de données avec le fichier `structure.sql` fourni.
- Ajoutez vos identifiants MySQL dans un fichier `.env` :

```
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=masterim_project
```

### **4. Lancer le serveur :**

```bash
npm run dev
```

Par défaut, le serveur est disponible sur `http://localhost:3000`.

---

## **Endpoints**

### **1. Utilisateurs**

| Méthode | Endpoint              | Fonctionnalité                  |
| ------- | --------------------- | ------------------------------- |
| GET     | `/api/users`          | Récupérer tous les utilisateurs |
| POST    | `/api/users/register` | Créer un utilisateur (admin)    |
| POST    | `/api/users/login`    | Se connecter                    |

---

### **2. Actualités**

| Méthode | Endpoint    | Fonctionnalité            |
| ------- | ----------- | ------------------------- |
| GET     | `/api/news` | Récupérer toutes les news |
| POST    | `/api/news` | Ajouter une news (admin)  |

---

### **3. Commentaires**

| Méthode | Endpoint                | Fonctionnalité                        |
| ------- | ----------------------- | ------------------------------------- |
| GET     | `/api/comments/:newsId` | Récupérer les commentaires d'une news |
| POST    | `/api/comments`         | Ajouter un commentaire                |

---

### **4. Votes**

| Méthode | Endpoint     | Fonctionnalité   |
| ------- | ------------ | ---------------- |
| GET     | `/api/votes` | Résumé des votes |
| POST    | `/api/votes` | Ajouter un vote  |

---

## **Structure des dossiers**

```
backend/
├── controllers/       # Logique métier
├── models/            # Modèles de base de données
├── routes/            # Routes RESTful
├── middlewares/       # Middlewares personnalisés
├── config/            # Configuration de la base de données
├── app.js             # Point d'entrée principal
├── package.json       # Dépendances
└── .env               # Variables d'environnement
```

---

## **Contributeurs**

- **Admin Web** : Ajoutez vos détails ici.
- **Association MasterIM** : Projet réalisé pour l'association étudiante.

---

## **Améliorations futures**

- Intégration d'un système de mail pour l'envoi des identifiants.
- Optimisation des performances des requêtes SQL.
- Ajout d'une validation supplémentaire pour sécuriser les entrées utilisateur.
