import axios from 'axios'

// 개발: vite.config.ts의 proxy가 /api → localhost:8080 으로 전달
// 프로덕션(Docker): 백엔드 직접 호출
const baseURL = import.meta.env.PROD
  ? 'http://localhost:8080/api'
  : '/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
