<!-- frontend/src/components/Header.vue -->

<template>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>MasterIM</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/" aria-label="Accueil">Accueil</v-btn>
      <v-btn text to="/vote" v-if="isLoggedIn" aria-label="Vote">Vote</v-btn>
      <v-btn text to="/admin" v-if="isAdmin" aria-label="Admin">Admin</v-btn>
      <v-btn text to="/login" v-if="!isLoggedIn" aria-label="Login">Login</v-btn>
      <v-btn text @click="logout" v-if="isLoggedIn" aria-label="Logout">Logout</v-btn>
      <v-switch
        v-model="isDarkTheme"
        @change="toggleTheme"
        label="Thème Sombre"
        class="ml-4"
        hide-details
        inset
        aria-label="Basculer le thème sombre"
      ></v-switch>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'Header',
    data() {
      return {
        isDarkTheme: false,
      }
    },
    computed: {
      isLoggedIn() {
        return !!localStorage.getItem('token')
      },
      isAdmin() {
        return localStorage.getItem('role') === 'admin'
      },
    },
    mounted() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.isDarkTheme = savedTheme === 'dark'
        this.$vuetify.theme.dark = this.isDarkTheme
      }
    },
    methods: {
      toggleTheme() {
        this.$vuetify.theme.dark = this.isDarkTheme
        localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light')
      },
      logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('userId')
        this.$router.push('/login')
      },
    },
  }
  </script>
  
  <style scoped>
  .ml-4 {
    margin-left: 16px;
  }
  </style>
  