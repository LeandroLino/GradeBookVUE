<template>
  <div class="discipline-list">
    <h1>My Disciplines</h1>
    <div class="discipline-cards">
      <div class="discipline-card empty-card" @click="CreateDisciplineForm">
        <h3>Create a discipline</h3>
        <i class="icon">+</i>
      </div>
      <div
        v-for="discipline in disciplines"
        :key="discipline.id"
        class="discipline-card"
        @click="openDiscipline(discipline)"
      >
        <h3>{{ discipline.name }}</h3>
        <p>Students: {{ discipline.students.length }}</p>
        <p>Teacher: {{ discipline.teachers ? discipline.teachers[0].name : 'Sem professor!' }}</p>
      </div>
    </div>
    <div v-if="selectedDiscipline" class="discipline-overlay">
      <div class="discipline-modal">
        <DisciplineContainer
          :selectedDiscipline="selectedDiscipline"
          @close-discipline="closeDiscipline"
        />
      </div>
    </div>
    <div v-if="showCreateForm" class="discipline-overlay">
      <div class="discipline-modal">
        <CreateDiscipline @close-create-discipline="CreateDisciplineForm" />
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../utils/api'
import DisciplineContainer from '../../components/Teachers/DisciplineContainer.vue'
import CreateDiscipline from '../../components/Teachers/CreateDiscipline.vue'

export default {
  components: {
    DisciplineContainer,
    CreateDiscipline
  },
  data() {
    return {
      disciplines: [],
      selectedDiscipline: null,
      showCreateForm: false
    }
  },
  async afterMounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
    await this.fetchDisciplines()
  },
  methods: {
    async fetchDisciplines() {
      try {
        const response = await api.list('teacher')
        this.disciplines = response
      } catch (error) {
        console.error('Error fetching disciplines:', error)
      }
    },
    openDiscipline(discipline) {
      this.selectedDiscipline = discipline
    },
    closeDiscipline() {
      this.selectedDiscipline = null
    },
    async CreateDisciplineForm() {
      this.showCreateForm = !this.showCreateForm
      await this.fetchDisciplines()
    }
  }
}
</script>

<style scoped>
.discipline-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
}

.discipline-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.discipline-card {
  flex: 1 1 300px;
  padding: 20px;
  background-color: #212121;
  height: 125px;
  width: 125px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;
}

.empty-card {
  background-color: #212121;
  height: 125px;
  width: 125px;
}

@media (min-width: 1024px) {
  .discipline-card {
    flex: none;
    height: 200px;
    width: 200px;
  }
}

.icon {
  font-size: 48px;
  margin-top: 20px;
}

.discipline-card:hover {
  background-color: #303030;
}

.discipline-card h3 {
  font-size: 18px;
  text-align: center;
  color: #fff;
  margin-bottom: 10px;
}

.discipline-card p {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.discipline-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.discipline-modal {
  background-color: #333;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>
