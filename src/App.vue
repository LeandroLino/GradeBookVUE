<template>
  <header>
    <div class="wrapper">
      <nav>
        <template v-if="isLoggedIn">
          <RouterLink to="/" @click="logout">Logout</RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/">Login with Student!</RouterLink>
          <RouterLink to="/teacher">Login with Teacher!</RouterLink>
        </template>
      </nav>
    </div>
  </header>

  <RouterView @setLogin="setLogin" />
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    this.checkLoginStatus()
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('token')
      this.isLoggedIn = !!token
    },
    setLogin(bool) {
      this.isLoggedIn = bool
      console.log(bool)
    },
    async logout() {
      this.setLogin(false)
      localStorage.removeItem('token')
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-width: 100vw;
  height: 10vh;
  background-color: black;

  display: flex;
  text-align: end;
  justify-content: center;
}

nav {
  width: 100%;
  height: 100%;
  font-size: 15px;

  display: flex;
  align-items: center;
  justify-content: end;
}

nav a.router-link-exact-active {
  color: var(--color-text);

  border: 1px solid var(--color-text);
  border-radius: 5px;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  margin-right: 1rem;
}

header .wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
}
</style>
