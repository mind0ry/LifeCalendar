import api from './axios'
import { Schedule, ScheduleRequest } from '../types'

export const createSchedule = (data: ScheduleRequest): Promise<Schedule> =>
  api.post('/schedules', data).then((res) => res.data)

export const getSchedule = (id: number): Promise<Schedule> =>
  api.get(`/schedules/${id}`).then((res) => res.data)

export const updateSchedule = (id: number, data: ScheduleRequest): Promise<Schedule> =>
  api.put(`/schedules/${id}`, data).then((res) => res.data)

export const deleteSchedule = (id: number): Promise<void> =>
  api.delete(`/schedules/${id}`).then((res) => res.data)
