<script setup></script>
<template>
  <div class="drawer">
    <h2>Save Note</h2>
    <p>Note: <input type="number" v-model="note" max="10" /></p>
    <button @click="saveNote">Confirm</button>
    <button @click="closeSaveNoteDrawer">Cancel</button>
  </div>
</template>
<script>
import api from '../../../utils/api'

export default {
  props: {
    selectedStudentNote: {
      type: Object
    },
    selectedDiscipline: {
      type: Object
    }
  },
  data() {
    return {
      note: 0
    }
  },
  methods: {
    async saveNote() {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Adicionando zero à esquerda se necessário
      const day = currentDate.getDate().toString().padStart(2, '0') // Adicionando zero à esquerda se necessário

      this.$emit('saveNote')
      const response = await api.createNotes(
        this.selectedDiscipline.id,
        this.selectedStudentNote.id,
        { note: this.note }
      )
      await api.createCards(this.selectedStudentNote.id, response.id, {
        delivery_date: `${year}-${month}-${day}`
      })
    },
    closeSaveNoteDrawer() {
      this.$emit('closeSaveNoteDrawer')
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
