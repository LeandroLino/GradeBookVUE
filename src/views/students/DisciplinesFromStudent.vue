<template>
  <div class="discipline-list">
    <div class="nav-list">
      <h1
        @click="setActiveTab('disciplines')"
        :class="{ active: activeTab === 'disciplines' }"
        id="disciplinesTab"
        class="nav-select"
      >
        My Disciplines
      </h1>
      <h1
        @click="setActiveTab('reportCards')"
        :class="{ active: activeTab === 'reportCards' }"
        id="reportCardsTab"
        class="nav-select"
      >
        My Report Cards
      </h1>
    </div>
    <component :setActiveTab="setActiveTab" :is="currentTabComponent"></component>
  </div>
</template>

<script>
import ListDisciplines from '../../components/Students/ListDisciplines.vue'
import ListReports from '../../components/Students/ListReports.vue'

export default {
  data() {
    return {
      selectedDiscipline: null,
      activeTab: 'disciplines'
    }
  },
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
  },
  computed: {
    currentTabComponent() {
      if (this.activeTab === 'disciplines') {
        return ListDisciplines
      } else if (this.activeTab === 'reportCards') {
        return ListReports
      }
      return null
    }
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
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

h1.clickable {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  padding: 0 10px;
  border-radius: 5px;
  background-color: #212121;
  transition: background-color 0.3s ease-in-out;
}

h1.clickable:hover {
  background-color: #303030;
}

div > h1 {
  display: inline-block;
  margin-right: 20px;
}

.active {
  background-color: #303030;
}

.nav-select {
  cursor: pointer;
  width: 200px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-list {
  display: flex;
  align-items: center;
}
</style>
