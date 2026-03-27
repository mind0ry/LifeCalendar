import api from './axios'
import { StatsData, TrendData } from '../types'

export const getStats = (year: number, month: number): Promise<StatsData> =>
  api.get('/stats', { params: { year, month } }).then((res) => res.data)

export const getTrend = (year: number, month: number): Promise<TrendData[]> =>
  api.get('/stats/trend', { params: { year, month } }).then((res) => res.data)
