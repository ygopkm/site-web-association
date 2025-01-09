<!-- frontend/src/components/Comments.vue -->

<template>
  <div class="mt-4">
    <h3>Commentaires</h3>
    <v-card class="pa-4">
      <v-form @submit.prevent="addComment">
        <v-textarea
          v-model="newComment"
          label="Ajouter un commentaire"
          :rules="[v => !!v || 'Commentaire requis']"
          required
          outlined
          autocomplete="off"
        ></v-textarea>
        <v-btn type="submit" color="primary" :loading="loading">Envoyer</v-btn>
      </v-form>
      <v-alert v-if="message" :type="messageType" class="mt-4">
        {{ message }}
      </v-alert>
      <v-list v-if="comments.length">
        <v-list-item v-for="comment in comments" :key="comment.id">
          <v-list-item-content>
            <v-list-item-title>{{ comment.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ formatDate(comment.created_at) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-alert v-else-if="!loading" type="info">Aucun commentaire pour le moment.</v-alert>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Comments',
  props: {
    newsId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      newComment: '',
      message: '',
      messageType: 'success',
      loading: false,
    }
  },
  mounted() {
    this.fetchComments()
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get(`/api/comments/${this.newsId}`)
        this.comments = response.data
      } catch (err) {
        console.error('Erreur lors du chargement des commentaires :', err)
      }
    },
    async addComment() {
      if (!this.newComment.trim()) return
      this.loading = true
      try {
        await axios.post(
          '/api/comments',
          {
            content: this.newComment,
            newsId: this.newsId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        this.message = 'Commentaire ajouté avec succès.'
        this.messageType = 'success'
        this.newComment = ''
        this.fetchComments()
      } catch (err) {
        this.message = 'Erreur lors de l\'ajout du commentaire.'
        this.messageType = 'error'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleString()
    },
  },
}
</script>

<style scoped>
h3 {
  margin-bottom: 16px;
}
</style>
