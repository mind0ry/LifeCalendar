import React, { useState } from 'react'
import { createSchedule, updateSchedule } from '../../api/scheduleApi'
import { Schedule, ScheduleRequest } from '../../types'

interface Props {
  selectedDate: string
  onSaved: () => void
  onCancel: () => void
  initialData?: Schedule   // 수정 모드일 때 기존 데이터
}

function ScheduleForm({ selectedDate, onSaved, onCancel, initialData }: Props) {
  const isEdit = !!initialData

  const [form, setForm] = useState<ScheduleRequest>({
    title: initialData?.title ?? '',
    date: initialData?.date ?? selectedDate,
    description: initialData?.description ?? '',
    // 백엔드에서 "14:00:00" 형태로 오므로 앞 5자리(HH:mm)만 사용
    startTime: initialData?.startTime?.slice(0, 5) ?? '',
    endTime: initialData?.endTime?.slice(0, 5) ?? '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return

    setLoading(true)
    try {
      const payload = {
        ...form,
        startTime: form.startTime || undefined,
        endTime: form.endTime || undefined,
        description: form.description || undefined,
      }
      if (isEdit) {
        await updateSchedule(initialData!.id, payload)
      } else {
        await createSchedule(payload)
      }
      onSaved()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <Field label="제목 *">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="일정 제목"
          required
          style={inputStyle}
        />
      </Field>

      <Field label="날짜">
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          style={inputStyle}
        />
      </Field>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Field label="시작 시간" style={{ flex: 1 }}>
          <input
            name="startTime"
            type="time"
            value={form.startTime}
            onChange={handleChange}
            style={inputStyle}
          />
        </Field>
        <Field label="종료 시간" style={{ flex: 1 }}>
          <input
            name="endTime"
            type="time"
            value={form.endTime}
            onChange={handleChange}
            style={inputStyle}
          />
        </Field>
      </div>

      <Field label="메모">
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="메모 (선택)"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </Field>

      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
        <button type="button" onClick={onCancel} style={cancelBtnStyle}>취소</button>
        <button type="submit" disabled={loading} style={submitBtnStyle('#4a90d9')}>
          {loading ? '처리 중...' : isEdit ? '수정' : '저장'}
        </button>
      </div>
    </form>
  )
}

function Field({
  label, children, style,
}: {
  label: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', ...style }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  fontWeight: 600,
  color: '#555',
}

export const inputStyle: React.CSSProperties = {
  padding: '9px 12px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '0.9rem',
  outline: 'none',
  width: '100%',
  background: '#fff',
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

const submitBtnStyle = (bg: string): React.CSSProperties => ({
  flex: 2,
  padding: '10px',
  border: 'none',
  borderRadius: '8px',
  background: bg,
  color: '#fff',
  fontSize: '0.9rem',
  fontWeight: 700,
})

export default ScheduleForm
