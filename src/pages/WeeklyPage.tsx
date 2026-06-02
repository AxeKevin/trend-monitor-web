import {
  MOCK_WEEKLY_REPORTS,
  getDifficultyClass,
  getDifficultyLabel,
  type WeeklyScript
} from '@/data/mockData'

function ScriptCard({ script }: { script: WeeklyScript }) {
  const statusMap: Record<string, { cls: string; label: string }> = {
    live:  { cls: 'badge-live',  label: '投放中' },
    ready: { cls: 'badge-ready', label: '就绪' },
    draft: { cls: 'badge-draft', label: '草稿' },
  }
  const status = statusMap[script.status] || { cls: 'badge-draft', label: script.status }

  return (
    <div className="bg-white rounded-lg border border-border card-hover p-5 space-y-4">
      {/* 卡头 */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold text-sm text-foreground mb-1">{script.title}</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono-display ${getDifficultyClass(script.difficulty)}`}>
              {getDifficultyLabel(script.difficulty)}
            </span>
            <span className="text-[11px] text-muted-foreground">{script.platform} · {script.targetAudience}</span>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${status.cls}`}>
          {status.label}
        </span>
      </div>

      <div className="divider-sand" />

      {/* Hook */}
      <div>
        <div className="text-[10px] text-primary font-mono-display uppercase tracking-wider mb-2">HOOK · 前 3 秒</div>
        <div className="text-sm text-foreground/85 leading-relaxed border-l-2 border-primary/40 pl-3">
          {script.hook}
        </div>
      </div>

      {/* Body */}
      <div>
        <div className="text-[10px] text-muted-foreground font-mono-display uppercase tracking-wider mb-2">BODY</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{script.body}</div>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 pt-1 border-t border-border/50">
        <span className="text-[10px] text-muted-foreground font-mono-display uppercase tracking-wider">CTA</span>
        <span className="text-sm font-medium text-foreground">{script.cta}</span>
      </div>
    </div>
  )
}

export default function WeeklyPage() {
  const reports = MOCK_WEEKLY_REPORTS

  return (
    <div>
      <div className="mb-6">
        <div className="font-mono-display text-[10px] text-muted-foreground tracking-widest uppercase mb-1">WEEKLY SCRIPTS</div>
        <h1 className="text-xl font-semibold text-foreground mb-1">周报脚本卡</h1>
        <p className="text-sm text-muted-foreground">每周 2 小时产出 5 张脚本卡，LLM 评分+生成，人工审核后投放。</p>
      </div>

      {reports.map(report => (
        <div key={report.week}>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono-display text-xs text-primary font-medium">{report.week}</span>
            <div className="divider-sand flex-1" />
            <span className="text-[10px] text-muted-foreground">{report.scripts.length} 张脚本卡</span>
          </div>

          {report.summary && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-muted/60 border border-border text-xs text-muted-foreground leading-relaxed">
              {report.summary}
            </div>
          )}

          {report.scripts.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-border rounded-lg">
              <div className="text-3xl mb-3 text-primary/30">◇</div>
              <div className="text-sm text-muted-foreground">Week 0 探源中</div>
              <div className="text-xs text-muted-foreground/70 mt-1">Hook 模板池建立后将产出脚本卡</div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {report.scripts.map((s, i) => <ScriptCard key={i} script={s} />)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
