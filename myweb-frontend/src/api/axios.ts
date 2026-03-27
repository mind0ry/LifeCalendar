import axios from 'axios'

// vite.config.ts의 proxy 설정으로 /api 요청이 자동으로 localhost:8080/api 로 전달됨
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
