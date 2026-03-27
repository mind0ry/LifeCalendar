import React from 'react'
import { CalendarDay } from '../../types'

interface Props {
  day: number
  dayOfWeek: number        // 0=일, 6=토
  dayData?: CalendarDay
  isSelected: boolean
  isToday: boolean
  onClick: () => void
}

function CalendarCell({ day, dayOfWeek, dayData, isSelected, isToday, onClick }: Props) {
  // 수입/지출 합계 계산
  const income = dayData?.transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0) ?? 0

  const expense = dayData?.transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0) ?? 0

  const scheduleCount = dayData?.schedules.length ?? 0

  // 요일별 날짜 색상
  const dateColor = dayOfWeek === 0 ? '#e53e3e' : dayOfWeek === 6 ? '#3182ce' : '#333'

  return (
    <div onClick={onClick} style={{
      height: '110px',
      padding: '6px 8px',
      borderRadius: '8px',
      border: isSelected ? '2px solid #4a90d9' : '1px solid #e8e8e8',
      background: isSelected ? '#ebf4ff' : isToday ? '#fffbea' : '#fff',
      cursor: 'pointer',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: '3px',
      transition: 'background 0.15s',
    }}>

      {/* 날짜 숫자 */}
      <span style={{
        fontSize: '0.875rem',
        fontWeight: isToday ? 700 : 400,
        color: isToday ? '#4a90d9' : dateColor,
      }}>
        {isToday ? (
          <span style={{
            background: '#4a90d9',
            color: '#fff',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
          }}>
            {day}
          </span>
        ) : day}
      </span>

      {/* 일정 뱃지 (최대 2개) */}
      {dayData?.schedules.slice(0, 2).map((s) => (
        <div key={s.id} style={scheduleBadgeStyle}>
          {s.title}
        </div>
      ))}
      {scheduleCount > 2 && (
        <div style={{ fontSize: '0.65rem', color: '#888' }}>+{scheduleCount - 2}개 더</div>
      )}

      {/* 수입/지출 금액 (하단 고정) */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {income > 0 && (
          <div style={{ fontSize: '0.65rem', color: '#2f855a', fontWeight: 600 }}>
            +{income.toLocaleString()}
          </div>
        )}
        {expense > 0 && (
          <div style={{ fontSize: '0.65rem', color: '#c53030', fontWeight: 600 }}>
            -{expense.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  )
}

const scheduleBadgeStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  background: '#4a90d9',
  color: '#fff',
  borderRadius: '3px',
  padding: '1px 5px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}

export default CalendarCell
