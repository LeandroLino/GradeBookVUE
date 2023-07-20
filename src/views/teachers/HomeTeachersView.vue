<script setup>
import RegisternLogin from '../../components/Teachers/RegisternLogin.vue'
</script>

<template>
  <main>
    <RegisternLogin @setLogin="setLogin" />
  </main>
</template>
<script>
export default {
  methods: {
    setLogin() {
      this.$emit('setLogin', true)
    }
  }
}
</script>
