<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Cases</th>
          <th scope="col">Deaths</th>
          <th scope="col">Recovered</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries" :key="country.id">
          <td> {{ country.name }} </td>
          <td> {{ country.cases }} </td>
          <td> {{ country.deaths }} </td>
          <td> {{ country.recovered }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: mapState(['countries']),
  created() {
    this.getCountries();
  },
  methods: {
    getCountries() {
      this.$store.dispatch('getCountries');
    }
  }
}
</script>