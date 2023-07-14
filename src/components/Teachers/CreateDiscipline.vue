<template>
  <div class="report-cards">
    <div>
      <h2>Create Disciplina</h2>
      <div class="input-column">
        <input v-model="disciplineData.name" placeholder="Name" />
        <input v-model="disciplineData.workload" placeholder="Workload" />
      </div>
      <button @click="createDiscipline">Create</button>
    </div>
    <button @click="closeCreateDrawer">Close</button>
  </div>
</template>

<script>
import api from '../../utils/api'

export default {
  data() {
    return {
      reportCards: [],
      disciplineData: {
        name: '',
        workload: ''
      }
    }
  },
  methods: {
    async createDiscipline() {
      this.closeCreateDrawer()
      await api.createDiscipline(this.disciplineData, 'discipline')
      this.disciplineData.name = ''
      this.disciplineData.workload = ''
    },
    closeCreateDrawer() {
      this.$emit('close-create-discipline')
    },
    handleCreateClick() {
      this.closeCreateDrawer()
    }
  }
}
</script>

<style scoped>
.report-cards {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  width: 300px;
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

  margin: 7px;
}

button:hover {
  background-color: #45a049;
}

.input-column {
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  outline: none;
  border-color: #4caf50;
}
</style>
