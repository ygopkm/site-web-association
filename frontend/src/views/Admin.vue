<!-- frontend/src/views/Admin.vue -->

<template>
    <v-container>
      <h1>Administration</h1>
  
      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab>Gestion des Utilisateurs</v-tab>
        <v-tab>Ajouter une Actualité</v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="tab">
        <!-- Gestion des Utilisateurs -->
        <v-tab-item>
          <v-card class="pa-4">
            <v-btn color="primary" @click="fetchUsers">Charger les utilisateurs</v-btn>
            <v-data-table
              :headers="userHeaders"
              :items="users"
              :items-per-page="5"
              class="elevation-1 mt-4"
            >
              <template #item.actions="{ item }">
                <v-btn color="error" text @click="confirmDelete(item)">Supprimer</v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
  
        <!-- Ajouter une Actualité -->
        <v-tab-item>
          <v-card class="pa-4">
            <v-form ref="newsForm" @submit.prevent="addNews">
              <v-text-field
                v-model="newsTitle"
                label="Titre"
                :rules="[v => !!v || 'Titre requis']"
                required
              ></v-text-field>
              <v-textarea
                v-model="newsContent"
                label="Contenu"
                :rules="[v => !!v || 'Contenu requis']"
                required
              ></v-textarea>
              <v-text-field
                v-model="newsImage"
                label="URL de l'image"
                :rules="[v => !!v || 'URL de l\'image requise', v => validURL(v) || 'URL invalide']"
                required
              ></v-text-field>
              <v-btn type="submit" color="success" :loading="loading">Ajouter</v-btn>
            </v-form>
            <v-alert v-if="newsMessage" :type="newsError ? 'error' : 'success'" class="mt-4">
              {{ newsMessage }}
            </v-alert>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
  
      <!-- Dialog de confirmation -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Confirmer la Suppression</v-card-title>
          <v-card-text>Êtes-vous sûr de vouloir supprimer l'utilisateur "{{ selectedUser?.username }}" ?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Annuler</v-btn>
            <v-btn color="red darken-1" text @click="deleteUser">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Admin',
    data() {
      return {
        tab: null,
        users: [],
        userHeaders: [
          { text: 'ID', value: 'id' },
          { text: 'Nom d\'utilisateur', value: 'username' },
          { text: 'Rôle', value: 'role' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        selectedUser: null,
        dialog: false,
        newsTitle: '',
        newsContent: '',
        newsImage: '',
        newsMessage: '',
        newsError: false,
        loading: false,
      }
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('/api/users', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          this.users = response.data
        } catch (err) {
          console.error('Erreur lors du chargement des utilisateurs :', err)
        }
      },
      confirmDelete(user) {
        this.selectedUser = user
        this.dialog = true
      },
      async deleteUser() {
        try {
          await axios.delete(`/api/users/${this.selectedUser.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          this.newsMessage = 'Utilisateur supprimé avec succès.'
          this.newsError = false
          this.fetchUsers()
        } catch (err) {
          this.newsMessage = 'Erreur lors de la suppression de l\'utilisateur.'
          this.newsError = true
        } finally {
          this.dialog = false
        }
      },
      validURL(str) {
        const pattern = new RegExp(
          '^(https?:\\/\\/)?' + // protocole
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domaine name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
          'i'
        )
        return !!pattern.test(str)
      },
      async addNews() {
        this.newsMessage = ''
        this.newsError = false
        this.loading = true
        try {
          await axios.post(
            '/api/news',
            {
              title: this.newsTitle,
              content: this.newsContent,
              image_url: this.newsImage,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          this.newsMessage = 'Actualité ajoutée avec succès.'
          this.newsError = false
          // Réinitialiser le formulaire
          this.newsTitle = ''
          this.newsContent = ''
          this.newsImage = ''
        } catch (err) {
          this.newsMessage = 'Erreur lors de l\'ajout de l\'actualité.'
          this.newsError = true
        } finally {
          this.loading = false
        }
      },
    },
  }
  </script>
  
  <style scoped>
  .headline {
    font-weight: bold;
  }
  </style>
  