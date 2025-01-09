<!-- frontend/src/views/NotFound.vue -->

<template>
    <v-container class="text-center">
      <h1>404 - Page Non Trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <v-btn color="primary" @click="$router.push('/')">Retour à l'accueil</v-btn>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  }
  </script>
  
  <style scoped>
  h1 {
    margin-top: 50px;
    font-size: 3rem;
  }
  </style>
  