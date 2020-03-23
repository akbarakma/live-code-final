<template>
  <div class="home">
    <Navbar />
    <h1 class="m-4">Countries List</h1>
    <CountryList />
  </div>
</template>

<script>
import CountryList from '../components/CountryList'
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components: {
    CountryList,
    Navbar
  },
}
</script>
