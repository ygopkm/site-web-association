<!-- frontend/src/views/Home.vue -->

<template>
  <v-container>
    <h1>Bienvenue à l'association MasterIM</h1>
    <p>
      Nous sommes une association dynamique dédiée à soutenir les étudiants des
      masters Informatique et Mathématiques & Data Science.
    </p>

    <h2>Actualités</h2>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      size="64"
      class="my-8"
    ></v-progress-circular>
    <v-row v-else>
      <v-col cols="12" sm="6" md="4" v-for="news in newsItems" :key="news.id">
        <v-card>
          <v-img :src="news.image_url" height="200px"></v-img>
          <v-card-title>{{ news.title }}</v-card-title>
          <v-card-text>{{ truncateContent(news.content) }}</v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="viewNews(news.id)">Lire la suite</v-btn>
          </v-card-actions>
          <Comments :newsId="news.id" />
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-if="error" type="error" class="mt-4">
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script>
import axios from 'axios'
import Comments from '../components/Comments.vue'

export default {
  name: 'Home',
  components: {
    Comments,
  },
  data() {
    return {
      newsItems: [],
      loading: false,
      error: null,
    }
  },
  mounted() {
    this.fetchNews()
  },
  methods: {
    async fetchNews() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/api/news')
        this.newsItems = response.data
      } catch (err) {
        this.error = 'Erreur lors du chargement des actualités.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    truncateContent(content) {
      const maxLength = 150
      return content.length > maxLength
        ? content.substring(0, maxLength) + '...'
        : content
    },
    viewNews(newsId) {
      // Rediriger vers une page détaillée si disponible
      // Sinon, peut-être ouvrir un dialog avec les détails
      // Pour l'instant, simplement alerter l'ID
      this.$router.push(`/news/${newsId}`)
    },
  },
}
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>
