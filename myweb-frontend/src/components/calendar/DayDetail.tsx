import React from 'react'
import dayjs from 'dayjs'
import { CalendarDay, Schedule, Transaction } from '../../types'
import { deleteSchedule } from '../../api/scheduleApi'
import { deleteTransaction } from '../../api/transactionApi'

interface Props {
  selectedDate: string | null
  dayData?: CalendarDay
  onAddSchedule: () => void
  onAddTransaction: () => void
  onEditSchedule: (s: Schedule) => void
  onEditTransaction: (t: Transaction) => void
  onDeleted: () => void
}

function DayDetail({
  selectedDate, dayData,
  onAddSchedule, onAddTransaction,
  onEditSchedule, onEditTransaction,
  onDeleted,
}: Props) {
  if (!selectedDate) {
    return (
      <div style={panelStyle}>
        <p style={{ color: '#bbb', fontSize: '0.875rem' }}>날짜를 선택하세요</p>
      </div>
    )
  }

  const handleDeleteSchedule = async (id: number) => {
    if (!window.confirm('일정을 삭제할까요?')) return
    await deleteSchedule(id)
    onDeleted()
  }

  const handleDeleteTransaction = async (id: number) => {
    if (!window.confirm('내역을 삭제할까요?')) return
    await deleteTransaction(id)
    onDeleted()
  }

  const income = dayData?.transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0) ?? 0

  const expense = dayData?.transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0) ?? 0

  return (
    <div style={panelStyle}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '18px', color: '#222' }}>
        {dayjs(selectedDate).format('M월 D일 (ddd)')}
      </h3>

      {/* 일정 섹션 */}
      <section style={{ marginBottom: '22px' }}>
        <div style={sectionHeaderStyle}>
          <h4 style={sectionTitleStyle}>일정 ({dayData?.schedules.length ?? 0})</h4>
          <button onClick={onAddSchedule} style={addBtnStyle}>+ 추가</button>
        </div>

        {!dayData?.schedules.length
          ? <p style={emptyStyle}>일정이 없습니다</p>
          : dayData.schedules.map((s) => (
            <div key={s.id} style={itemStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#222' }}>{s.title}</div>
                <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                  <button onClick={() => onEditSchedule(s)} style={iconBtnStyle} title="수정">✎</button>
                  <button onClick={() => handleDeleteSchedule(s.id)} style={{ ...iconBtnStyle, color: '#e53e3e' }} title="삭제">✕</button>
                </div>
              </div>
              {s.startTime && (
                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '3px' }}>
                  {s.startTime.slice(0, 5)}{s.endTime ? ` ~ ${s.endTime.slice(0, 5)}` : ''}
                </div>
              )}
              {s.description && (
                <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '2px' }}>{s.description}</div>
              )}
            </div>
          ))
        }
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', marginBottom: '18px' }} />

      {/* 수입/지출 섹션 */}
      <section>
        <div style={sectionHeaderStyle}>
          <h4 style={sectionTitleStyle}>수입 / 지출</h4>
          <button onClick={onAddTransaction} style={addBtnStyle}>+ 추가</button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.78rem', color: '#2f855a', fontWeight: 700, background: '#f0fff4', padding: '3px 8px', borderRadius: '20px' }}>
            +{income.toLocaleString()}원
          </span>
          <span style={{ fontSize: '0.78rem', color: '#c53030', fontWeight: 700, background: '#fff5f5', padding: '3px 8px', borderRadius: '20px' }}>
            -{expense.toLocaleString()}원
          </span>
        </div>

        {!dayData?.transactions.length
          ? <p style={emptyStyle}>내역이 없습니다</p>
          : dayData.transactions.map((t) => (
            <div key={t.id} style={itemStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#555' }}>{t.category}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: t.type === 'INCOME' ? '#2f855a' : '#c53030' }}>
                    {t.type === 'INCOME' ? '+' : '-'}{t.amount.toLocaleString()}원
                  </span>
                  <button onClick={() => onEditTransaction(t)} style={iconBtnStyle} title="수정">✎</button>
                  <button onClick={() => handleDeleteTransaction(t.id)} style={{ ...iconBtnStyle, color: '#e53e3e' }} title="삭제">✕</button>
                </div>
              </div>
              {t.description && (
                <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '2px' }}>{t.description}</div>
              )}
            </div>
          ))
        }
      </section>
    </div>
  )
}

const panelStyle: React.CSSProperties = {
  width: '272px',
  flexShrink: 0,
  background: '#f7f8fa',
  border: '1px solid #e2e8f0',
  borderRadius: '14px',
  padding: '20px',
  boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
}

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}

const addBtnStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#4a90d9',
  background: 'none',
  border: '1px solid #4a90d9',
  borderRadius: '12px',
  padding: '2px 10px',
  fontWeight: 600,
}

const iconBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#aaa',
  fontSize: '0.8rem',
  padding: '2px 3px',
  lineHeight: 1,
  cursor: 'pointer',
}

const itemStyle: React.CSSProperties = {
  padding: '8px 10px',
  background: '#fff',
  borderRadius: '8px',
  marginBottom: '6px',
  border: '1px solid #eee',
}

const emptyStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#c0c0c0',
}

export default DayDetail
