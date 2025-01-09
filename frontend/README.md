# Frontend - MasterIM Project

Ce frontend a été développé avec Vue.js et Vuetify pour offrir une interface claire et esthétique permettant d'accéder aux fonctionnalités principales de l'association MasterIM.

---

## **Technologies utilisées**

- **Vue.js** : Framework JavaScript pour construire l'interface utilisateur.
- **Vuetify** : Framework de composants basé sur Material Design.
- **Axios** : Pour les appels API.

---

## **Installation**

### **1. Cloner le dépôt :**

```bash
git clone <lien-du-repo>
cd frontend
```

### **2. Installer les dépendances :**

```bash
npm install
```

### **3. Lancer l'application :**

```bash
npm run serve
```

Par défaut, l'application est disponible sur `http://localhost:8080`.

---

## **Structure des dossiers**

```
frontend/
├── public/             # Fichiers statiques publics
│   └── index.html      # Fichier HTML principal
├── src/                # Code source de l'application
│   ├── assets/         # Fichiers statiques (images, icônes, etc.)
│   ├── components/     # Composants réutilisables (Header, Footer, etc.)
│   ├── views/          # Pages principales de l'application
│   ├── router/         # Configuration des routes (navigation)
│   ├── plugins/        # Configuration de Vuetify
│   ├── App.vue         # Composant principal de l'application
│   └── main.js         # Point d'entrée de l'application
├── package.json        # Dépendances et scripts
└── README.md           # Documentation
```

---

## **Pages incluses**

### **1. Page d’accueil (`/`)**

- Présente l'association.
- Affiche les actualités dans un carousel.
- Intègre un système de commentaires sous chaque actualité.

### **2. Page de connexion (`/login`)**

- Permet aux utilisateurs de se connecter pour accéder aux fonctionnalités.

### **3. Page d’administration (`/admin`)**

- Accessible uniquement par les administrateurs.
- Permet de gérer les utilisateurs et les actualités.

### **4. Page de vote (`/vote`)**

- Permet aux membres connectés de participer aux votes et de consulter les résultats.

---

## **Gestion des sessions**

- Les utilisateurs doivent être connectés pour accéder à certaines pages (vote, admin).
- Redirection automatique vers la page de connexion si l'utilisateur n'est pas autorisé.

---

## **Instructions supplémentaires**

- Assurez-vous que le backend est opérationnel et disponible à l'adresse configurée dans Axios (par défaut : `http://localhost:3000`).
- Le fichier `.env` n'est pas nécessaire pour la frontend, car toutes les configurations sont gérées via le backend.

---

## **Contributeurs**

- **Admin Web** : Ajoutez vos coordonnées ici.
- **Association MasterIM** : Projet réalisé pour l'association étudiante.

---

## **Améliorations futures**

- Possibilité d'ajouter un design plus interactif ou des animations.
- Optimisation de l'interface pour des écrans plus petits (facultatif).

---

## **Crédits**

- Ce projet a été réalisé à l'aide de [Vue.js](https://vuejs.org/) et [Vuetify](https://vuetifyjs.com/).
