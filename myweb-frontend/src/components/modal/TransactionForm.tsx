import React, { useState } from 'react'
import { createTransaction, updateTransaction } from '../../api/transactionApi'
import { Transaction, TransactionRequest, TransactionType } from '../../types'
import { inputStyle } from './ScheduleForm'

interface Props {
  selectedDate: string
  onSaved: () => void
  onCancel: () => void
  initialData?: Transaction  // 수정 모드일 때 기존 데이터
}

const EXPENSE_CATEGORIES = ['식비', '교통', '쇼핑', '의료', '문화', '공과금', '기타']
const INCOME_CATEGORIES = ['급여', '용돈', '부수입', '기타']

function TransactionForm({ selectedDate, onSaved, onCancel, initialData }: Props) {
  const isEdit = !!initialData

  const [form, setForm] = useState<TransactionRequest>({
    amount: initialData?.amount ?? 0,
    type: initialData?.type ?? 'EXPENSE',
    category: initialData?.category ?? '식비',
    date: initialData?.date ?? selectedDate,
    description: initialData?.description ?? '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }))
  }

  const handleTypeChange = (type: TransactionType) => {
    setForm((prev) => ({
      ...prev,
      type,
      category: type === 'EXPENSE' ? '식비' : '급여',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.amount <= 0) return

    setLoading(true)
    try {
      const payload = {
        ...form,
        description: form.description || undefined,
      }
      if (isEdit) {
        await updateTransaction(initialData!.id, payload)
      } else {
        await createTransaction(payload)
      }
      onSaved()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isExpense = form.type === 'EXPENSE'
  const categories = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES
  const accentColor = isExpense ? '#c53030' : '#2f855a'

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* 수입 / 지출 토글 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={labelStyle}>구분</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['EXPENSE', 'INCOME'] as TransactionType[]).map((t) => {
            const active = form.type === t
            const color = t === 'EXPENSE' ? '#c53030' : '#2f855a'
            return (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeChange(t)}
                style={{
                  flex: 1,
                  padding: '9px',
                  border: `2px solid ${active ? color : '#ddd'}`,
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  background: active ? (t === 'EXPENSE' ? '#fff5f5' : '#f0fff4') : '#fff',
                  color: active ? color : '#bbb',
                  transition: 'all 0.15s',
                }}
              >
                {t === 'EXPENSE' ? '지출' : '수입'}
              </button>
            )
          })}
        </div>
      </div>

      {/* 금액 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={labelStyle}>금액 *</label>
        <input
          name="amount"
          type="number"
          value={form.amount || ''}
          onChange={handleChange}
          placeholder="0"
          min={1}
          required
          style={inputStyle}
        />
      </div>

      {/* 카테고리 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={labelStyle}>카테고리</label>
        <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 날짜 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={labelStyle}>날짜</label>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* 메모 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={labelStyle}>메모</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="메모 (선택)"
          rows={2}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {/* 버튼 */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
        <button type="button" onClick={onCancel} style={cancelBtnStyle}>취소</button>
        <button
          type="submit"
          disabled={loading}
          style={{
            flex: 2,
            padding: '10px',
            border: 'none',
            borderRadius: '8px',
            background: accentColor,
            color: '#fff',
            fontSize: '0.9rem',
            fontWeight: 700,
          }}
        >
          {loading ? '처리 중...' : isEdit ? '수정' : '저장'}
        </button>
      </div>
    </form>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  fontWeight: 600,
  color: '#555',
}

const cancelBtnStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  background: '#fff',
  fontSize: '0.9rem',
  color: '#555',
}

export default TransactionForm
