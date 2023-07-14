<script setup>
import GiveNotes from './notes/GiveNotesTeachers.vue'
import DrawerNotes from './notes/NoteDrawer.vue'
import AddStudent from './enroll/AddStudent.vue'
</script>
<template>
  <div class="report-cards">
    <p>Discipline: {{ selectedDiscipline.name }}</p>
    <div>
      <button @click="openNoteDrawer(note)">Note</button>
      <button @click="openStudentDrawer">Add Student</button>
      <button @click="close">Close</button>
    </div>

    <!-- Student Drawer -->
    <div v-if="showStudentDrawer" class="drawer-overlay">
      <AddStudent @closeStudentDrawer="closeStudentDrawer" :selectedDiscipline="discipline" />
    </div>

    <!-- Note Drawer -->
    <div v-if="showNoteDrawer" class="drawer-overlay">
      <GiveNotes
        @openSaveNoteDrawer="openSaveNoteDrawer"
        @closeNoteDrawer="closeNoteDrawer"
        :selectedDiscipline="discipline"
      />
    </div>

    <!-- Save Note Drawer -->
    <div v-if="showSaveNoteDrawer" class="drawer-overlay">
      <DrawerNotes
        @saveNote="saveNote"
        @closeSaveNoteDrawer="closeSaveNoteDrawer"
        :selectedStudentNote="selectedStudentNote"
        :selectedDiscipline="discipline"
      />
    </div>
  </div>
</template>

<script>
import api from '../../utils/api'

export default {
  data() {
    return {
      reportCards: [],
      discipline: null,
      students: [],
      selectedStudent: null,
      selectedStudentNote: null,
      showStudentDrawer: false,
      isAddingStudent: false,
      showNoteDrawer: false,
      showSaveNoteDrawer: false
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
      try {
        const response = await api.listStudents()
        this.students = response
      } catch (error) {
        console.error('Error fetching students:', error)
      }
    },
    close() {
      this.$emit('close-discipline')
    },
    openStudentDrawer() {
      this.showStudentDrawer = true
    },
    closeStudentDrawer() {
      this.showStudentDrawer = false
      this.selectedStudentNote = null
      this.close()
    },
    openNoteDrawer() {
      this.showNoteDrawer = true
    },
    closeNoteDrawer() {
      this.showNoteDrawer = false
    },
    async openSaveNoteDrawer(selectedStudentNote) {
      this.selectedStudentNote = selectedStudentNote
      this.showSaveNoteDrawer = true
    },
    closeSaveNoteDrawer() {
      this.showSaveNoteDrawer = false
    },
    saveNote() {
      this.close()
      this.closeNoteDrawer()
      this.closeSaveNoteDrawer()
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
