<template>
  <div class="container">
    <h1>Login Your Account</h1>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="username">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    loginUser() {
      const obj = { username: this.username, password: this.password };
      this.$store.dispatch('loginUser', obj);
    }
  }
}
</script>

<style>

</style>