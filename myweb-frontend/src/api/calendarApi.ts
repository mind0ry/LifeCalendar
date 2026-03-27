import api from './axios'
import { CalendarData } from '../types'

// GET /api/calendar?year=2025&month=3
export const getCalendar = (year: number, month: number): Promise<CalendarData> =>
  api.get('/calendar', { params: { year, month } }).then((res) => res.data)
