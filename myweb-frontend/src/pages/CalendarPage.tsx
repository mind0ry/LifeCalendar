import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { getCalendar } from '../api/calendarApi'
import { getStats, getTrend } from '../api/statsApi'
import { CalendarData, Schedule, StatsData, Transaction, TrendData } from '../types'
import CalendarHeader from '../components/calendar/CalendarHeader'
import Calendar from '../components/calendar/Calendar'
import DayDetail from '../components/calendar/DayDetail'
import EventModal from '../components/modal/EventModal'
import MonthlyStats from '../components/stats/MonthlyStats'

dayjs.locale('ko')

function CalendarPage() {
  const today = dayjs()

  const [year, setYear] = useState(today.year())
  const [month, setMonth] = useState(today.month() + 1)
  const [calendarData, setCalendarData] = useState<CalendarData>({})
  const [stats, setStats] = useState<StatsData | null>(null)
  const [trend, setTrend] = useState<TrendData[]>([])
  const [selectedDate, setSelectedDate] = useState<string>(today.format('YYYY-MM-DD'))

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState<'schedule' | 'transaction'>('schedule')
  const [editingSchedule, setEditingSchedule] = useState<Schedule | undefined>()
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>()

  const fetchAll = () => {
    getCalendar(year, month).then(setCalendarData).catch(console.error)
    getStats(year, month).then(setStats).catch(console.error)
    getTrend(year, month).then(setTrend).catch(console.error)
  }

  useEffect(() => {
    fetchAll()
  }, [year, month])

  const handlePrevMonth = () => {
    const prev = dayjs(`${year}-${month}-01`).subtract(1, 'month')
    setYear(prev.year())
    setMonth(prev.month() + 1)
  }

  const handleNextMonth = () => {
    const next = dayjs(`${year}-${month}-01`).add(1, 'month')
    setYear(next.year())
    setMonth(next.month() + 1)
  }

  const openAddModal = (tab: 'schedule' | 'transaction') => {
    setEditingSchedule(undefined)
    setEditingTransaction(undefined)
    setModalTab(tab)
    setIsModalOpen(true)
  }

  const openEditSchedule = (s: Schedule) => {
    setEditingSchedule(s)
    setEditingTransaction(undefined)
    setModalTab('schedule')
    setIsModalOpen(true)
  }

  const openEditTransaction = (t: Transaction) => {
    setEditingTransaction(t)
    setEditingSchedule(undefined)
    setModalTab('transaction')
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditingSchedule(undefined)
    setEditingTransaction(undefined)
  }

  const handleSaved = () => {
    handleClose()
    fetchAll()
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 20px' }}>
      <CalendarHeader
        year={year}
        month={month}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />

      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <Calendar
          year={year}
          month={month}
          calendarData={calendarData}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <DayDetail
          selectedDate={selectedDate}
          dayData={calendarData[selectedDate]}
          onAddSchedule={() => openAddModal('schedule')}
          onAddTransaction={() => openAddModal('transaction')}
          onEditSchedule={openEditSchedule}
          onEditTransaction={openEditTransaction}
          onDeleted={fetchAll}
        />
      </div>

      {stats && trend.length > 0 && (
        <MonthlyStats stats={stats} trend={trend} year={year} month={month} />
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={handleClose}
        selectedDate={selectedDate}
        defaultTab={modalTab}
        onSaved={handleSaved}
        editingSchedule={editingSchedule}
        editingTransaction={editingTransaction}
      />
    </div>
  )
}

export default CalendarPage
