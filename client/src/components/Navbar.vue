<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <button class="btn btn-success m-1" @click.prevent="countries">Countries</button>
          <button class="btn btn-primary m-1" @click.prevent="profile">Profile</button>
          <button class="btn btn-danger m-1" @click.prevent="logout">Logout</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    countries() {
      this.$router.push('/');
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    profile() {
      this.$router.push('/profile');
    }
  }
}
</script>