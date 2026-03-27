import React, { useState, useEffect } from 'react'
import { Schedule, Transaction } from '../../types'
import ScheduleForm from './ScheduleForm'
import TransactionForm from './TransactionForm'

interface Props {
  isOpen: boolean
  onClose: () => void
  selectedDate: string
  defaultTab: 'schedule' | 'transaction'
  onSaved: () => void
  editingSchedule?: Schedule       // 일정 수정 시
  editingTransaction?: Transaction  // 수입/지출 수정 시
}

function EventModal({
  isOpen, onClose, selectedDate, defaultTab, onSaved,
  editingSchedule, editingTransaction,
}: Props) {
  const [tab, setTab] = useState<'schedule' | 'transaction'>(defaultTab)

  useEffect(() => {
    setTab(defaultTab)
  }, [defaultTab, isOpen])

  if (!isOpen) return null

  const isEdit = !!editingSchedule || !!editingTransaction
  const title = `${selectedDate} ${isEdit ? '수정' : '추가'}`

  return (
    <>
      <div onClick={onClose} style={overlayStyle} />
      <div style={modalStyle}>

        {/* 헤더 */}
        <div style={headerStyle}>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#222' }}>{title}</span>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>

        {/* 탭 — 수정 모드일 때는 탭 전환 불필요하므로 숨김 */}
        {!isEdit && (
          <div style={tabRowStyle}>
            <button
              onClick={() => setTab('schedule')}
              style={tabBtnStyle(tab === 'schedule', '#4a90d9')}
            >
              일정
            </button>
            <button
              onClick={() => setTab('transaction')}
              style={tabBtnStyle(tab === 'transaction', '#805ad5')}
            >
              수입 / 지출
            </button>
          </div>
        )}

        {/* 폼 */}
        <div style={{ padding: '20px' }}>
          {tab === 'schedule' ? (
            <ScheduleForm
              selectedDate={selectedDate}
              onSaved={onSaved}
              onCancel={onClose}
              initialData={editingSchedule}
            />
          ) : (
            <TransactionForm
              selectedDate={selectedDate}
              onSaved={onSaved}
              onCancel={onClose}
              initialData={editingTransaction}
            />
          )}
        </div>
      </div>
    </>
  )
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.4)',
  zIndex: 100,
}

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '420px',
  maxHeight: '90vh',
  overflowY: 'auto',
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
  zIndex: 101,
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px 0',
}

const closeBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '1rem',
  color: '#aaa',
  padding: '4px 6px',
  lineHeight: 1,
}

const tabRowStyle: React.CSSProperties = {
  display: 'flex',
  margin: '12px 20px 0',
  borderBottom: '1px solid #f0f0f0',
}

const tabBtnStyle = (active: boolean, color: string): React.CSSProperties => ({
  flex: 1,
  padding: '10px',
  border: 'none',
  background: 'none',
  fontSize: '0.9rem',
  fontWeight: active ? 700 : 400,
  color: active ? color : '#aaa',
  borderBottom: `2px solid ${active ? color : 'transparent'}`,
  transition: 'all 0.15s',
})

export default EventModal
