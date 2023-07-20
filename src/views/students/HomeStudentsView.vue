<script setup>
import RegisternLogin from '../../components/Students/RegisternLogin.vue'
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
