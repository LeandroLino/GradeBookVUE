<script setup>
import DisciplineContainer from '../../components/Students/DisciplineContainer.vue'
</script>
<template>
  <div class="discipline-list">
    <span>
      <div v-if="reportCards.length === 0" class="empty-message">No report cards yet!</div>
      <div class="discipline-cards">
        <div
          v-for="report in reportCards"
          :key="report.id"
          class="discipline-card"
          @click="openDiscipline(report)"
        >
          <h3>{{ report.name }}</h3>
          <p>Students: {{ report.delivery_date }}</p>
          <p>delivery date: {{ report.delivery_date }}</p>
          <p>discipline: {{ report.discipline }}</p>
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
  data() {
    return {
      reportCards: [],
      selectedDiscipline: null
    }
  },
  async mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
    const response = await api.listStudentsReportCards(localStorage.getItem('token'))
    this.reportCards = response
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
