import axios from 'axios'
import jwt_decode from 'jwt-decode'
const API_BASE_URL = 'http://127.0.0.1:8000'
let DECODEDTOKEN = ''
let TOKEN = ''
if(localStorage.getItem('token')){
  TOKEN = localStorage.getItem('token')
  DECODEDTOKEN = jwt_decode(TOKEN)
}

async function makeRequest(method, endpoint, data, token) {
  try {
    const url = API_BASE_URL + endpoint
    console.log(url)
    const headers = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Erro na requisição:', error)
  }
}

const API_ENDPOINTS = {
  student: {
    login: '/api/student/login/',
    register: '/api/student/register/',
    list_disciplines: '/api/student/list-disciplines/',
    list_report_cards: '/api/student/list/student/%/discipline/%/',
    list_students: '/api/student/list/'
  },
  teacher: {
    login: '/api/teacher/login/',
    register: '/api/teacher/register/',
    list_disciplines: '/api/teacher/list-disciplines/'
  },
  discipline: {
    create_discipline: '/api/disciplines/create/',
    list_disciplines: '/api/disciplines/list/discipline/',
    enroll_student: '/api/student/enroll/discipline/%/student/%/'
  },
  notes: {
    create_note: '/api/report-notes/create/discipline/%/student/%/'
  },
  card: {
    create_card: '/api/report-cards/create/student/%/note/%/'
  }
}

const api = {
  createDiscipline: async (data, type) => {
    return makeRequest(
      'post',
      API_ENDPOINTS[type].create_discipline,
      data,
      TOKEN
    )
  },

  login: async (email, password, type) => {
    const data = {
      email,
      password
    }
    return makeRequest('post', API_ENDPOINTS[type].login, data)
  },
  enrollStudent: async (discipline_id,student_id,) => {
    const route = API_ENDPOINTS.discipline.enroll_student
      .replace('%', discipline_id)
      .replace('%', student_id)
    return makeRequest('put', route, {})
  },
  list: async (type) => {
    return makeRequest(
      'get',
      API_ENDPOINTS[type].list_disciplines + `${DECODEDTOKEN.id}/`,
      {},
      TOKEN
    )
  },

  list_report_cards: async (discipline_id, type) => {

    const route = API_ENDPOINTS[type].list_report_cards
      .replace('%', DECODEDTOKEN.id)
      .replace('%', discipline_id)

    return makeRequest('get', route, {}, TOKEN)
  },
  listStudents: async () => {
    return makeRequest('get', API_ENDPOINTS.student.list_students, {}, TOKEN)

  },
  listStudentsDiscipline: async (discipline_id) => {
    return makeRequest('get', API_ENDPOINTS.discipline.list_disciplines+ `${discipline_id}/`, {}, TOKEN)

  },
  createNotes: async(discipline_id, student_id, data) => {
    console.log(discipline_id, student_id)
    const route = API_ENDPOINTS.notes.create_note
    .replace('%', student_id)
    .replace('%', discipline_id)
    return makeRequest('post', route, data, TOKEN)
  },
  createCards: async(student_id, note_id, data) => {
    console.log(student_id, note_id)
    const route = API_ENDPOINTS.card.create_card
    .replace('%', student_id)
    .replace('%', note_id)
    return makeRequest('post', route, data, TOKEN)
  },
  register: async (name, email, password, type) => {
    const data = {
      name,
      email,
      password
    }
    return makeRequest('post', API_ENDPOINTS[type].register, data)
  }
}

export default api
