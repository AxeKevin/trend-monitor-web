import { useState } from 'react'
import { TRENDS_DATA, TREND_EVENTS } from '@/data/trendsData'

// 简化版折线图：纯 SVG，不依赖外部库
const W = 800
const H = 220
const PAD = { top: 20, right: 20, bottom: 40, left: 36 }
const INNER_W = W - PAD.left - PAD.right
const INNER_H = H - PAD.top - PAD.bottom

const SERIES = [
  { key: 'aghani' as const, label: 'اغاني（歌曲）', color: 'oklch(0.55 0.14 75)', stroke: '#c57c1a' },
  { key: 'karaoke' as const, label: 'karaoke（英文）', color: 'oklch(0.50 0.15 250)', stroke: '#4a6cf7' },
  { key: 'ghina' as const, label: 'غناء（歌唱）', color: 'oklch(0.50 0.15 150)', stroke: '#22a06b' },
]

function toX(i: number, total: number) {
  return PAD.left + (i / (total - 1)) * INNER_W
}
function toY(val: number) {
  return PAD.top + INNER_H - (val / 100) * INNER_H
}

function makePath(data: { week: string; aghani: number; karaoke: number; ghina: number }[], key: 'aghani' | 'karaoke' | 'ghina') {
  return data.map((d, i) => {
    const x = toX(i, data.length)
    const y = toY(d[key])
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

interface TooltipState {
  x: number
  y: number
  week: string
  aghani: number
  karaoke: number
  ghina: number
}

// 每月取1条（每4周取1）用于 X 轴标签
const TICK_INDICES = TRENDS_DATA.reduce<number[]>((acc, _, i) => {
  if (i % 4 === 0) acc.push(i)
  return acc
}, [])

export default function TrendChart() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set())

  const data = TRENDS_DATA

  const toggleSeries = (key: string) => {
    setHiddenSeries(prev => {
      const s = new Set(prev)
      s.has(key) ? s.delete(key) : s.add(key)
      return s
    })
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const svgX = (e.clientX - rect.left) * (W / rect.width)
    const relX = svgX - PAD.left
    const idx = Math.max(0, Math.min(data.length - 1, Math.round((relX / INNER_W) * (data.length - 1))))
    const d = data[idx]
    setTooltip({
      x: toX(idx, data.length),
      y: PAD.top + 10,
      week: d.week,
      aghani: d.aghani,
      karaoke: d.karaoke,
      ghina: d.ghina,
    })
  }

  return (
    <div className="bg-white rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-mono-display text-xs text-primary uppercase tracking-wider">GOOGLE TRENDS KSA · 关键词热度</div>
          <p className="text-[11px] text-muted-foreground mt-0.5">过去 12 个月 · 周粒度 · 数据来源：Google Trends SA（2025-06 ～ 2026-05）</p>
        </div>
        <a
          href="https://trends.google.com/trends/explore?date=today%2012-m&geo=SA&q=%D8%A7%D8%BA%D8%A7%D9%86%D9%8A,karaoke,%D8%BA%D9%86%D8%A7%D8%A1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-mono-display text-primary/60 hover:text-primary transition-colors"
        >
          查看原始数据 ↗
        </a>
      </div>

      {/* 图例 */}
      <div className="flex items-center gap-4 mb-3">
        {SERIES.map(s => (
          <button
            key={s.key}
            onClick={() => toggleSeries(s.key)}
            className={`flex items-center gap-1.5 text-[11px] transition-opacity ${hiddenSeries.has(s.key) ? 'opacity-30' : ''}`}
          >
            <span className="w-4 h-0.5 rounded-full inline-block" style={{ background: s.stroke }} />
            <span className="text-muted-foreground">{s.label}</span>
          </button>
        ))}
      </div>

      {/* SVG 折线图 */}
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ minWidth: 400 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
        >
          {/* 网格线 */}
          {[0, 25, 50, 75, 100].map(v => (
            <g key={v}>
              <line
                x1={PAD.left} y1={toY(v)}
                x2={W - PAD.right} y2={toY(v)}
                stroke="oklch(0.90 0.015 75)" strokeWidth="0.5"
              />
              <text x={PAD.left - 4} y={toY(v) + 4} textAnchor="end" fontSize="9" fill="oklch(0.60 0.01 240)">
                {v}
              </text>
            </g>
          ))}

          {/* 重大事件标注线 */}
          {TREND_EVENTS.map(ev => {
            const idx = data.findIndex(d => d.week === ev.week)
            if (idx < 0) return null
            const x = toX(idx, data.length)
            return (
              <g key={ev.week}>
                <line x1={x} y1={PAD.top} x2={x} y2={PAD.top + INNER_H} stroke={ev.color} strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
                <text x={x + 3} y={PAD.top + 12} fontSize="8" fill={ev.color} fontFamily="monospace">{ev.label}</text>
              </g>
            )
          })}

          {/* 折线 */}
          {SERIES.map(s => (
            !hiddenSeries.has(s.key) && (
              <path
                key={s.key}
                d={makePath(data, s.key)}
                fill="none"
                stroke={s.stroke}
                strokeWidth={s.key === 'aghani' ? 2 : 1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={s.key === 'aghani' ? 1 : 0.85}
              />
            )
          ))}

          {/* X 轴标签（每月1个） */}
          {TICK_INDICES.map(i => {
            const x = toX(i, data.length)
            const label = data[i].week.slice(0, 7) // YYYY-MM
            return (
              <text key={i} x={x} y={H - 8} textAnchor="middle" fontSize="8" fill="oklch(0.60 0.01 240)" fontFamily="monospace">
                {label}
              </text>
            )
          })}

          {/* Tooltip 竖线 */}
          {tooltip && (
            <line
              x1={tooltip.x} y1={PAD.top}
              x2={tooltip.x} y2={PAD.top + INNER_H}
              stroke="oklch(0.55 0.14 75)" strokeWidth="1" strokeDasharray="2 2"
            />
          )}
        </svg>

        {/* Tooltip 浮层 */}
        {tooltip && (
          <div
            className="absolute top-2 bg-white border border-border rounded-md shadow-md px-3 py-2 text-[11px] pointer-events-none z-10"
            style={{ left: Math.min(tooltip.x / W * 100 + 2, 70) + '%' }}
          >
            <div className="font-mono-display text-[10px] text-muted-foreground mb-1">{tooltip.week}</div>
            {SERIES.map(s => (
              !hiddenSeries.has(s.key) && (
                <div key={s.key} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full inline-block flex-shrink-0" style={{ background: s.stroke }} />
                  <span className="text-muted-foreground">{s.label.split('（')[0]}</span>
                  <span className="font-semibold text-foreground ml-auto pl-3">{(tooltip as Record<string, unknown>)[s.key] as number}</span>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* 关键洞察 */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
        {[
          { label: '9月23日 国庆节', val: '100', sub: 'اغاني 全年最高峰', color: '#c57c1a' },
          { label: '3月22日 斋月峰值', val: '99', sub: 'اغاني 斋月急速反弹', color: '#22a06b' },
          { label: '2月8日 karaoke峰值', val: '6', sub: 'karaoke 年度最高值', color: '#4a6cf7' },
        ].map(item => (
          <div key={item.label} className="bg-muted/30 rounded-md px-3 py-2 flex items-center gap-2">
            <span className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <div>
              <div className="font-mono-display text-lg font-bold" style={{ color: item.color }}>{item.val}</div>
              <div className="text-[10px] text-foreground/80">{item.label}</div>
              <div className="text-[10px] text-muted-foreground">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
