<script setup></script>
<template>
  <div class="drawer">
    <h2>Note</h2>
    <select v-model="selectedStudent">
      <option value="">Select a student</option>
      <option v-for="student in students" :key="student.id" :value="student">
        {{ student.name }}
      </option>
    </select>
    <button @click="openSaveNoteDrawer">Give Note</button>
    <button @click="closeNoteDrawer">Close</button>
  </div>
</template>
<script>
import api from '../../../utils/api'
import { ref } from 'vue'
const selectedStudent = ref(null)

export default {
  data() {
    return {
      students: [],
      selectedStudent: null
    }
  },
  props: {
    selectedDiscipline: {
      type: Object,
      default: null
    }
  },
  async beforeMount() {
    const response = await api.listStudentsDiscipline(this.selectedDiscipline.id)
    this.students = response.students
  },
  methods: {
    openSaveNoteDrawer() {
      this.$emit('openSaveNoteDrawer', this.selectedStudent)
    },
    closeNoteDrawer() {
      this.$emit('closeNoteDrawer')
    }
  }
}
</script>
<style>
.drawer-overlay {
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

.drawer {
  background-color: #333;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #45a049;
}

input,
select {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4caf50;
}
</style>
