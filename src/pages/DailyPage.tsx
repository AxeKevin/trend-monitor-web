import { useState } from 'react'
import { MOCK_DAILY_REPORTS, getScoreColor, getDifficultyClass, getDifficultyLabel, getCategoryColor } from '@/data/mockData'
import type { DailyCandidate, CandidateCategory } from '@/data/mockData'
import TrendChart from '@/components/TrendChart'
import { useFeedbackStore } from '@/hooks/useFeedbackStore'

const PLATFORM_COLOR: Record<string, string> = {
  TikTok: 'text-pink-700 bg-pink-50 border border-pink-200',
  YouTube: 'text-red-700 bg-red-50 border border-red-200',
  Meta: 'text-blue-700 bg-blue-50 border border-blue-200',
}

const STATUS_CFG = {
  approved: { label: '通过', cls: 'badge-approved' },
  pending:  { label: '待定', cls: 'badge-pending'  },
  rejected: { label: '拒绝', cls: 'badge-rejected'  },
}

const GENDER_COLOR: Record<string, string> = {
  '男性为主': 'text-blue-700 bg-blue-50',
  '女性为主': 'text-pink-700 bg-pink-50',
  '男女均衡': 'text-emerald-700 bg-emerald-50',
}

const CATEGORIES: CandidateCategory[] = ['热门歌曲', '歌手·网红', '标签·话题']

// 时效性判断：距今超过 12 个月降权，超过 6 个月轻度标注
function getStaleness(publishedAt?: string): { label: string; cls: string } | null {
  if (!publishedAt) return null
  const [y, m] = publishedAt.split('-').map(Number)
  const pub = new Date(y, m - 1)
  const now = new Date(2026, 5, 2) // 2026-06-02
  const months = (now.getFullYear() - pub.getFullYear()) * 12 + (now.getMonth() - pub.getMonth())
  if (months >= 12) return { label: `${months}个月前 · 降权`, cls: 'text-red-600 bg-red-50 border border-red-200' }
  if (months >= 6)  return { label: `${months}个月前`, cls: 'text-amber-600 bg-amber-50 border border-amber-200' }
  return null
}

function CandidateCard({
  c, expanded, onToggle, feedback, onVote
}: {
  c: DailyCandidate
  expanded: boolean
  onToggle: () => void
  feedback: 'up' | 'down' | undefined
  onVote: (type: 'up' | 'down') => void
}) {
  const st = STATUS_CFG[c.status]
  const scoreCls = getScoreColor(c.score)
  const diffCls  = getDifficultyClass(c.difficulty)
  const catColor = getCategoryColor(c.category)

  return (
    <div className={`bg-white rounded-lg border card-hover overflow-hidden ${c.status === 'rejected' ? 'opacity-75' : ''} ${expanded ? 'border-primary/30' : 'border-border'}`}>
      {/* 头部 */}
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start gap-3">
          <div className={`font-mono-display text-2xl font-bold w-10 flex-shrink-0 text-right leading-none pt-0.5 ${scoreCls}`}>
            {c.score.toFixed(1)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap mb-1">
              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium flex-shrink-0 ${catColor}`}>{c.category}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${diffCls}`}>{getDifficultyLabel(c.difficulty)}</span>
              <h3 className="text-sm font-semibold text-foreground leading-snug">{c.title}</h3>
            </div>
            <div className="text-[11px] text-muted-foreground font-mono-display">
              {c.source} · {c.date}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* 人工反馈按钮 */}
            <button
              onClick={e => { e.stopPropagation(); onVote('up') }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all border ${feedback === 'up' ? 'bg-emerald-50 border-emerald-300 text-emerald-600' : 'border-border text-muted-foreground hover:border-emerald-300 hover:text-emerald-600'}`}
              title="有价值"
            >
              ↑
            </button>
            <button
              onClick={e => { e.stopPropagation(); onVote('down') }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all border ${feedback === 'down' ? 'bg-red-50 border-red-300 text-red-500' : 'border-border text-muted-foreground hover:border-red-300 hover:text-red-500'}`}
              title="无价值"
            >
              ↓
            </button>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${st.cls}`}>{st.label}</span>
            <span className="text-muted-foreground text-xs">{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
      </div>

      {/* 展开内容 */}
      {expanded && (
        <div className="border-t border-border/50 px-4 pb-4 pt-3 space-y-3">
          {/* Hook */}
          <div>
            <div className="font-mono-display text-[10px] text-muted-foreground tracking-wider uppercase mb-1">HOOK</div>
            <p className="text-sm text-foreground/80 leading-relaxed bg-muted/30 rounded-md px-3 py-2">{c.hook}</p>
          </div>

          {/* 受众画像 */}
          <div>
            <div className="font-mono-display text-[10px] text-muted-foreground tracking-wider uppercase mb-2">受众画像</div>
            <div className="flex items-start gap-3 bg-muted/20 rounded-md px-3 py-2">
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium flex-shrink-0 ${GENDER_COLOR[c.audience.gender]}`}>
                {c.audience.gender}
              </span>
              <div className="flex-1 text-xs text-foreground/70 space-y-0.5">
                <div>年龄：{c.audience.ageRange} 岁 · 地区：{c.audience.countries.join(' / ')}</div>
                {c.audience.occupation && <div>职业：{c.audience.occupation}</div>}
                {c.audience.note && <div className="text-muted-foreground">{c.audience.note}</div>}
              </div>
            </div>
          </div>

          {/* 参考视频（含缩略图） */}
          {c.refVideos.length > 0 && (
            <div>
              <div className="font-mono-display text-[10px] text-muted-foreground tracking-wider uppercase mb-2">
                参考视频（{c.refVideos.length} 条）
              </div>
              <div className="space-y-2">
                {c.refVideos.map((v, i) => {
                  const stale = getStaleness(v.publishedAt)
                  return (
                    <a
                      key={i}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2 rounded-md bg-muted/20 border border-border/40 hover:bg-muted/50 hover:border-primary/30 transition-all group"
                    >
                      {/* 缩略图 */}
                      {v.thumbnail ? (
                        <div className="w-16 h-9 rounded overflow-hidden flex-shrink-0 bg-muted">
                          <img
                            src={v.thumbnail}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-9 rounded flex-shrink-0 bg-muted/50 flex items-center justify-center">
                          <span className="text-[10px] text-muted-foreground">
                            {v.platform === 'TikTok' ? '🎵' : v.platform === 'YouTube' ? '▶' : '📢'}
                          </span>
                        </div>
                      )}
                      {/* 信息 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${PLATFORM_COLOR[v.platform]}`}>
                            {v.platform}
                          </span>
                          {v.isSearchPage && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 flex-shrink-0">
                              搜索页 · 切换「视频」Tab
                            </span>
                          )}
                          {stale && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${stale.cls}`}>
                              {stale.label}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-foreground/80 group-hover:text-primary transition-colors leading-snug block truncate">
                          {v.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="font-mono-display text-[10px] text-primary/60">{v.metric}</span>
                        <span className="text-muted-foreground text-[10px]">↗</span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* 标签 */}
          <div className="flex flex-wrap gap-1.5">
            {c.tags.map(t => (
              <span key={t} className="font-mono-display text-[10px] px-2 py-0.5 bg-muted rounded text-muted-foreground">#{t}</span>
            ))}
          </div>

          {/* 备注 */}
          {c.note && (
            <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3">{c.note}</p>
          )}

          {/* 反馈记录 */}
          {feedback && (
            <div className={`text-[11px] px-3 py-1.5 rounded-md flex items-center gap-2 ${feedback === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
              <span>{feedback === 'up' ? '↑' : '↓'}</span>
              <span>{feedback === 'up' ? '已标记：有价值，后续优先考虑该类内容（已同步到云端）' : '已标记：无价值，后续降低该类内容权重（已同步到云端）'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function DailyPage() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<CandidateCategory | 'all'>('all')
  const { feedbackMap, vote } = useFeedbackStore()

  const toggle = (id: string) => {
    setExpandedIds(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="font-mono-display text-[10px] text-muted-foreground tracking-widest uppercase mb-1">DAILY CANDIDATES</div>
        <h1 className="text-xl font-semibold text-foreground mb-1">日报候选热点</h1>
        <p className="text-sm text-muted-foreground">每日 15 分钟扫描，打标后 git push 自动更新网页。</p>
      </div>

      {/* Google Trends 折线图 */}
      <TrendChart />

      {MOCK_DAILY_REPORTS.map(report => {
        const filtered = activeCategory === 'all'
          ? report.candidates
          : report.candidates.filter(c => c.category === activeCategory)

        const counts = CATEGORIES.reduce((acc, cat) => {
          acc[cat] = report.candidates.filter(c => c.category === cat).length
          return acc
        }, {} as Record<CandidateCategory, number>)

        return (
          <div key={report.date}>
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono-display text-sm font-semibold text-primary">{report.date}</div>
              <div className="text-xs text-muted-foreground">{report.candidates.length} 条候选</div>
            </div>

            {/* 分类 Tab */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <button
                onClick={() => setActiveCategory('all')}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${activeCategory === 'all' ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-foreground/30'}`}
              >
                全部 {report.candidates.length}
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${activeCategory === cat ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-foreground/30'}`}
                >
                  {cat} {counts[cat]}
                </button>
              ))}
            </div>

            {report.summary && (
              <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-4 py-3 mb-4 leading-relaxed border border-border/50">
                今日摘要 {report.summary}
              </div>
            )}

            <div className="space-y-3">
              {filtered
                .sort((a, b) => b.score - a.score)
                .map(c => {
                  const id = `${c.date}-${c.title}`
                  return (
                    <CandidateCard
                      key={id}
                      c={c}
                      expanded={expandedIds.has(id)}
                      onToggle={() => toggle(id)}
                      feedback={feedbackMap[id]}
                      onVote={(type) => vote(id, c.title, type)}
                    />
                  )
                })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
