// ────────────────────────────────────────
// 일정 타입
// ────────────────────────────────────────
export interface Schedule {
  id: number
  title: string
  description: string | null
  date: string           // "2025-03-15"
  startTime: string | null  // "14:00:00"
  endTime: string | null
  createdAt: string
}

export interface ScheduleRequest {
  title: string
  description?: string
  date: string
  startTime?: string
  endTime?: string
}

// ────────────────────────────────────────
// 수입/지출 타입
// ────────────────────────────────────────
export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Transaction {
  id: number
  amount: number
  type: TransactionType
  category: string
  description: string | null
  date: string
  createdAt: string
}

export interface TransactionRequest {
  amount: number
  type: TransactionType
  category: string
  description?: string
  date: string
}

// ────────────────────────────────────────
// 통계 타입
// ────────────────────────────────────────
export interface CategoryExpense {
  category: string
  amount: number
}

export interface StatsData {
  totalIncome: number
  totalExpense: number
  net: number
  categoryExpenses: CategoryExpense[]
}

export interface TrendData {
  year: number
  month: number
  income: number
  expense: number
}

// ────────────────────────────────────────
// 달력 통합 조회 타입
// ────────────────────────────────────────

// 하루치 데이터 (일정 + 수입/지출 묶음)
export interface CalendarDay {
  schedules: Schedule[]
  transactions: Transaction[]
}

// GET /api/calendar 응답 전체
// key: "2025-03-15" 형태의 날짜 문자열
export type CalendarData = Record<string, CalendarDay>
