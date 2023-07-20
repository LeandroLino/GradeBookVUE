<template>
  <h1>Students zone</h1>
  <div class="form">
    <h2>{{ isRegistering ? 'Registro' : 'Login' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          class="input-form"
          v-model="apiData.email"
          type="email"
          id="email"
          :placeholder="isRegistering ? 'Digite seu email' : 'Email'"
          required
        />
      </div>
      <div v-if="isRegistering" class="form-group">
        <label for="name">Nome:</label>
        <input
          class="input-form"
          v-model="apiData.name"
          type="text"
          id="name"
          placeholder="Digite seu nome"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          class="input-form"
          v-model="apiData.password"
          type="password"
          id="password"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button v-if="isRegistering" type="submit">Registrar</button>
      <button v-else type="submit">Entrar</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
    <div class="switch-mode">
      <p>
        {{ isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?' }}
        <span class="toggle-link" @click="toggleMode">{{
          isRegistering ? 'Fazer login' : 'Registre-se'
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import api from '../../utils/api'
import { setItem } from '../../utils/helpers'

export default {
  data() {
    return {
      apiData: {
        name: '',
        email: '',
        password: ''
      },
      isRegistering: false,
      errorMessage: ''
    }
  },
  props: {
    setLogin: {
      type: Function,
      required: true
    }
  },
  methods: {
    async submitForm() {
      if (!this.isRegistering) {
        const response = await api.login(this.apiData.email, this.apiData.password, 'student')
        if (response && response.access_token) {
          await this.setToken(response.access_token)
        } else {
          this.showError('Credenciais inválidas')
        }
      } else {
        const response = await api.register(
          this.apiData.name,
          this.apiData.email,
          this.apiData.password,
          'student'
        )
        if (response && response.access_token) {
          await this.setToken(response.access_token)
        } else {
          this.showError('Erro ao registrar')
        }
      }
    },
    async setToken(token) {
      setItem('token', token)
      this.$emit('setLogin', true)
      this.$router.replace('/student/disciplines')
    },
    toggleMode() {
      this.isRegistering = !this.isRegistering
      this.clearError()
    },
    showError(message) {
      this.errorMessage = message
      const elements = document.getElementsByClassName('input-form')
      for (const element of elements) {
        element.style.setProperty('border', '1px solid red')
      }
    },
    clearError() {
      this.errorMessage = ''
    }
  }
}
</script>
<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 30px;
  font-weight: bold;
  margin: 25px;
  color: white;
  letter-spacing: 2px;
}

.form {
  max-width: 400px;
  margin: 5% auto;
  padding: 20px;
  background-color: #1e2021;
  color: #fff;
  border-radius: 5px;
}

.form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form .form-group {
  margin-bottom: 15px;
}

.form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form input[type='email'],
.form input[type='password'],
.form input[type='text'] {
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.form button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.form button:hover {
  background-color: #45a049;
}

.form .switch-mode {
  text-align: center;
  margin-top: 10px;
  color: #888;
}

.form .switch-mode .toggle-link {
  color: #4caf50;
  cursor: pointer;
  text-decoration: underline;
}

.form .switch-mode .toggle-link:hover {
  color: #45a049;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
