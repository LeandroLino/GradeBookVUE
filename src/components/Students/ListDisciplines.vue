<script setup>
import DisciplineContainer from '../../components/Students/DisciplineContainer.vue'
</script>
<template>
  <div class="discipline-list">
    <span>
      <div v-if="disciplines.length === 0" class="empty-message">No discipline yet!</div>
      <div class="discipline-cards">
        <div
          v-for="discipline in disciplines"
          :key="discipline.id"
          class="discipline-card"
          @click="openDiscipline(discipline)"
        >
          <h3>{{ discipline.name }}</h3>
          <p>Students: {{ discipline.students.length }}</p>
          <p>Teacher: {{ discipline.teacher ? discipline.teacher.name : 'Sem professor! ' }}</p>
        </div>
      </div>
      <div v-if="selectedDiscipline" class="discipline-overlay">
        <div class="discipline-modal">
          <DisciplineContainer
            :disciplineId="selectedDiscipline"
            @close-discipline="closeDiscipline"
          />
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import api from '../../utils/api'

export default {
  props: ['setActiveTab'],
  data() {
    return {
      disciplines: [],
      selectedDiscipline: null
    }
  },
  watch: {
    async setActiveTab() {
      const response = await api.list('student')
      this.disciplines = response
    }
  },
  async mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
    const response = await api.list('student')
    this.disciplines = response
  },
  methods: {
    openDiscipline(discipline) {
      this.selectedDiscipline = discipline
    },
    closeDiscipline() {
      this.selectedDiscipline = null
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

.discipline-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.discipline-card {
  flex: 1 1 300px;
  padding: 20px;
  background-color: #212121;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;
}

@media (min-width: 1024px) {
  .discipline-card {
    flex: none;
  }
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

.empty-message {
  text-align: center;
  color: #fff;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
