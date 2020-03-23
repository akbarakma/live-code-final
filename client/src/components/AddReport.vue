<template>
<div class="container">
    <h1>Add a case</h1>
    <form @submit.prevent="addCase" class="m-4">
      <div class="form-group">
        <label>Select Country</label><br>
        <select v-model="CountryId">
          <option v-for="country in countries" :key="country.id" :value="country.id">
            {{ country.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Cases</label>
        <input type="number" class="form-control" v-model="cases">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      cases: '',
      CountryId: null,
    }
  },
  created() {
    this.$store.dispatch('getCountries');
  },
  computed: mapState(['countries']),
  methods: {
    addCase() {
      const obj = {
        cases: this.cases,
        CountryId: this.CountryId,
      };
      this.$store.dispatch('addReport', obj);
    }
  }
}
</script>