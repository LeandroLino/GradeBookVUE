<template>
  <div class="report-cards">
    <h1>My Report Cards</h1>
    <div v-if="reportCards.length > 0">
      <div v-for="reportCard in reportCards" :key="reportCard.id" class="report-card">
        <h2>Report Card ID</h2>
        <p>Delivery Date: {{ reportCard.delivery_date }}</p>
        <div v-for="note in reportCard.notes" :key="note.id" class="note">
          <p>Note: {{ note.note }}</p>
          <p>Discipline: {{ disciplineId.name }}</p>
          <p>Student registration: {{ note.registration }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>You don't have any report cards yet.</p>
    </div>
    <button @click="close">Close</button>
  </div>
</template>

<script>
import api from '../../utils/api'
import moment from 'moment'

export default {
  data() {
    return {
      reportCards: []
    }
  },
  props: {
    disciplineId: {
      type: Number,
      default: null
    }
  },
  mounted() {
    this.fetchReportCards(this.disciplineId.id)
  },
  methods: {
    async fetchReportCards(discipline_id) {
      try {
        const response = await api.list_report_cards(discipline_id, 'student')
        this.reportCards = response.map((reportCard) => {
          const formattedDate = moment(reportCard.delivery_date).format('DD/MM/YYYY')
          return { ...reportCard, delivery_date: formattedDate }
        })
      } catch (error) {
        console.error('Error fetching report cards:', error)
      }
    },
    close() {
      this.$emit('close-discipline')
    }
  }
}
</script>

<style scoped>
.report-cards {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.report-card {
  background-color: #212121;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.report-card h2 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
}

.report-card p {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.note {
  margin-left: 20px;
}

p.note {
  font-weight: bold;
}

p.note::before {
  content: 'Note: ';
}

p.discipline::before {
  content: 'Discipline ID: ';
}

p.registration::before {
  content: 'Registration: ';
}

p.note,
p.discipline,
p.registration {
  margin-left: 10px;
}

p.registration {
  margin-bottom: 10px;
}

p.registration::after {
  content: ',';
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
