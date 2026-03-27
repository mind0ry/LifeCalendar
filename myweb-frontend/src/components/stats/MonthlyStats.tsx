import React from 'react'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { StatsData, TrendData } from '../../types'

interface Props {
  stats: StatsData
  trend: TrendData[]
  year: number
  month: number
}

const PIE_COLORS = ['#4a90d9', '#e53e3e', '#38a169', '#d69e2e', '#805ad5', '#dd6b20', '#319795']

function MonthlyStats({ stats, trend, year, month }: Props) {
  const pieData = stats.categoryExpenses.map((c) => ({
    name: c.category,
    value: c.amount,
  }))

  // 최근 6개월 추이 차트 데이터
  const trendData = trend.map((t) => ({
    label: `${t.month}월`,
    수입: t.income,
    지출: t.expense,
  }))

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700, color: '#222' }}>
        {year}년 {month}월 통계
      </h3>

      {/* 요약 카드 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        <SummaryCard label="수입" amount={stats.totalIncome} color="#2f855a" bg="#f0fff4" />
        <SummaryCard label="지출" amount={stats.totalExpense} color="#c53030" bg="#fff5f5" />
        <SummaryCard
          label="순수익"
          amount={stats.net}
          color={stats.net >= 0 ? '#2f855a' : '#c53030'}
          bg={stats.net >= 0 ? '#f0fff4' : '#fff5f5'}
        />
      </div>

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>

        {/* 최근 6개월 추이 바 차트 — 넓게 */}
        <div style={{ flex: 3, minWidth: '400px' }}>
          <h4 style={sectionTitleStyle}>최근 6개월 추이</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trendData} barSize={22} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(v) => `${Math.round(v / 10000)}만`}
                tick={{ fontSize: 11 }}
                width={44}
              />
              <Tooltip formatter={(v: number) => `${v.toLocaleString()}원`} />
              <Legend />
              <Bar dataKey="수입" fill="#38a169" radius={[4, 4, 0, 0]} />
              <Bar dataKey="지출" fill="#e53e3e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 카테고리별 지출 파이 차트 — 범례를 차트 밖 아래로 분리 */}
        <div style={{ flex: 2, minWidth: '300px' }}>
          <h4 style={sectionTitleStyle}>카테고리별 지출</h4>
          {pieData.length === 0 ? (
            <p style={{ color: '#bbb', fontSize: '0.875rem', paddingTop: '12px' }}>
              이번 달 지출 내역이 없습니다
            </p>
          ) : (
            <>
              {/* 파이 차트 — 범례 없이 파이만 */}
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v.toLocaleString()}원`} />
                </PieChart>
              </ResponsiveContainer>

              {/* 범례를 차트 아래에 별도 렌더링 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', marginTop: '8px' }}>
                {pieData.map((entry, i) => (
                  <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: PIE_COLORS[i % PIE_COLORS.length],
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '0.75rem', color: '#555' }}>
                      {entry.name} {entry.value.toLocaleString()}원
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, amount, color, bg }: {
  label: string; amount: number; color: string; bg: string
}) {
  return (
    <div style={{ flex: 1, background: bg, borderRadius: '10px', padding: '12px 14px', border: `1px solid ${color}33` }}>
      <div style={{ fontSize: '0.72rem', color: '#888', marginBottom: '5px' }}>{label}</div>
      <div style={{ fontSize: '1rem', fontWeight: 700, color }}>
        {amount < 0 ? '-' : ''}{Math.abs(amount).toLocaleString()}
        <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>원</span>
      </div>
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '14px',
  border: '1px solid #e2e8f0',
  padding: '22px 24px',
  boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
  marginTop: '16px',
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '10px',
}

export default MonthlyStats
