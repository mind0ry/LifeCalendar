import React from 'react'

interface Props {
  year: number
  month: number
  onPrev: () => void
  onNext: () => void
}

function CalendarHeader({ year, month, onPrev, onNext }: Props) {
  return (
    <div style={containerStyle}>
      <button onClick={onPrev} style={btnStyle}>{'‹'}</button>
      <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700 }}>
        {year}년 {month}월 cicd
      </h2>
      <button onClick={onNext} style={btnStyle}>{'›'}</button>
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '20px',
}

const btnStyle: React.CSSProperties = {
  padding: '4px 14px',
  fontSize: '1.4rem',
  border: '1px solid #ddd',
  borderRadius: '6px',
  background: '#fff',
  lineHeight: 1.4,
}

export default CalendarHeader
