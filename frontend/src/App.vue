<!-- frontend/src/App.vue -->

<template>
    <v-app>
      <Header />
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </template>
  
  <script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  
  export default {
    name: 'App',
    components: {
      Header,
      Footer,
    },
  }
  </script>
  
  <style>
  /* Styles globaux si nécessaire */
  </style>
  