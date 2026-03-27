import React from 'react'
import dayjs from 'dayjs'
import { CalendarData } from '../../types'
import CalendarCell from './CalendarCell'

interface Props {
  year: number
  month: number
  calendarData: CalendarData
  selectedDate: string | null
  onSelectDate: (date: string) => void
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토']

function Calendar({ year, month, calendarData, selectedDate, onSelectDate }: Props) {
  const firstDay = dayjs(`${year}-${String(month).padStart(2, '0')}-01`)
  const startDayOfWeek = firstDay.day()
  const daysInMonth = firstDay.daysInMonth()

  const cells: (number | null)[] = [
    ...Array(startDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div style={cardStyle}>
      {/* 요일 헤더 — 배경색으로 달력 셀과 구분 */}
      <div style={weekHeaderStyle}>
        {WEEK_DAYS.map((day, i) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              padding: '10px 0',
              fontWeight: 700,
              fontSize: '0.82rem',
              color: i === 0 ? '#e53e3e' : i === 6 ? '#3182ce' : '#444',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 그리드 */}
      <div style={gridStyle}>
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} style={emptyCellStyle} />
          }
          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const dayOfWeek = idx % 7

          return (
            <CalendarCell
              key={dateStr}
              day={day}
              dayOfWeek={dayOfWeek}
              dayData={calendarData[dateStr]}
              isSelected={selectedDate === dateStr}
              isToday={dateStr === dayjs().format('YYYY-MM-DD')}
              onClick={() => onSelectDate(dateStr)}
            />
          )
        })}
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  flex: 1,
  background: '#fff',
  borderRadius: '14px',
  border: '1px solid #e2e8f0',
  overflow: 'hidden',
  boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
}

// 요일 헤더: 연한 회색 배경 + 하단 구분선
const weekHeaderStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  background: '#f7f8fa',
  borderBottom: '2px solid #e2e8f0',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '6px',
  padding: '12px',
}

const emptyCellStyle: React.CSSProperties = {
  height: '110px',
  background: '#fafafa',
  borderRadius: '8px',
}

export default Calendar
