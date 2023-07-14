<script setup>
</script>
<template>
    <div class="drawer-overlay">
      <div class="drawer">
        <h2>Add Student</h2>
        <select v-model="selectedStudent">
          <option value="">Select a student</option>
          <option v-for="student in students" :key="student.id" :value="student">{{ student.name }}</option>
        </select>
        <button @click="addStudent">Add</button>
        <button @click="closeStudentDrawer">Close</button>
      </div>
    </div>
</template>

<script>
import api from '../../../utils/api'
import { ref } from 'vue'
const selectedStudent = ref(null)

export default {
  data() {
    return {
        discipline: {},
        students: {},
        selectedStudent: null
    }
  },
  props: {
    selectedDiscipline: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.discipline = this.selectedDiscipline
    this.fetchStudents()
  },
  methods: {
    async fetchStudents() {
        const response = await api.listStudents()
        this.students = response
    },
    closeStudentDrawer() {
      this.showStudentDrawer = false
    },
    async addStudent() {
        console.log(this.discipline.id, this.selectedStudent.id)
        await api.enrollStudent(this.discipline.id, this.selectedStudent.id)
        this.$emit('closeStudentDrawer')
        this.closeStudentDrawer()
    },
  }
}
</script>

<style scoped>
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
</style>
