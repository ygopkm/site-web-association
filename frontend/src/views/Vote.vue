<!-- frontend/src/views/Vote.vue -->

<template>
  <v-container>
    <h1>Vote sur les propositions</h1>
    <v-row>
      <v-col cols="12" md="6" v-for="proposal in proposals" :key="proposal.id">
        <v-card class="pa-4">
          <v-card-title>{{ proposal.title }}</v-card-title>
          <v-card-text>{{ proposal.description }}</v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="vote(proposal.id, 'yes')">Oui</v-btn>
            <v-btn color="error" @click="vote(proposal.id, 'no')">Non</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <h2 class="mt-8">Résultats</h2>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      size="64"
      class="my-8"
    ></v-progress-circular>
    <v-table v-else>
      <thead>
        <tr>
          <th>Proposition</th>
          <th>Oui</th>
          <th>Non</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.proposalId">
          <td>{{ result.title }}</td>
          <td>{{ result.yes }}</td>
          <td>{{ result.no }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-alert v-if="error" type="error" class="mt-4">
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Vote',
  data() {
    return {
      proposals: [
        { id: 1, title: 'Proposition 1', description: 'Description de la proposition 1' },
        { id: 2, title: 'Proposition 2', description: 'Description de la proposition 2' },
        // Ajoutez d'autres propositions si nécessaire
      ],
      results: [],
      loading: false,
      error: null,
    }
  },
  mounted() {
    this.fetchResults()
  },
  methods: {
    async vote(proposalId, option) {
      try {
        await axios.post(
          '/api/votes',
          {
            vote_option: option, // Correction ici
            proposalId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        this.fetchResults()
      } catch (err) {
        this.error = 'Erreur lors du vote. Veuillez réessayer.'
        console.error(err)
      }
    },
    async fetchResults() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/api/votes/summary')
        this.results = response.data
      } catch (err) {
        this.error = 'Erreur lors du chargement des résultats.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
h1, h2 {
  margin-bottom: 20px;
}
</style>
