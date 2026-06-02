export default function DashboardPage() {
  const stats = [
    { label: 'Active 竞品数', value: '2', sub: 'Starmaker 100+ · Happyvv1 6条', dot: 'warning' },
    { label: 'Week 0 完成度', value: '100%', sub: '探源全量完成', dot: 'active' },
    { label: 'Hook 模板数', value: '7', sub: '真实数据支撑，v0.2', dot: 'active' },
    { label: '日均新增', value: '829', sub: '目标 2700+', dot: 'danger' },
  ]

  const findings = [
    {
      type: 'discovery',
      title: '「阿语歌词字幕特效型」是 KSA K 歌内容王牌（最高 1.2M 赞）',
      detail: 'TikTok 搜索「karaoke arab」最高赞 = 阿语歌词动态字幕特效，无需人物出镜，零隐私风险。Nagham 广告首选 hook 格式已确定。',
      date: '06-01'
    },
    {
      type: 'discovery',
      title: 'Duet/弹幕合唱格式 = Nagham 功能的天然广告形式（578K 赞）',
      detail: 'TikTok 用户已高度熟悉 Duet 分屏合唱格式，与 Nagham 弹幕功能完美映射。这是 Starmaker 和 Happyvv1 都没有的差异化卖点。',
      date: '06-01'
    },
    {
      type: 'discovery',
      title: 'Happyvv1 新竞品：2026-05-27 启动投放，6 条 active，暗示公域 = 红线',
      detail: '「خلي صوتك يوصل للجميع」（让声音传达给所有人）踩沙特隐私红线，与 Starmaker 同类错误。Nagham 差异化"私密录制+弹幕精选"策略更优。',
      date: '06-02'
    },
    {
      type: 'discovery',
      title: '「اغاني」是 KSA 最高热度音乐词，YouTube 阿语 K 歌是蓝海',
      detail: 'Google Trends 「اغاني」热度 70-100，YouTube 搜索「karaoke arabic 2026」新视频播放量普遍低（148-2500），说明 YouTube 是低竞争进入渠道。',
      date: '06-02'
    },
    {
      type: 'fix',
      title: 'KSA 用户不用阿语拼写搜索卡拉OK，YouTube ?gl=SA 会跳转首页',
      detail: '「كاراوكي」Google Trends 数据不足。YouTube trending 参数无效，改用关键词搜索。ASO：英文 karaoke 优先，阿语拼写不做重点。',
      date: '06-02'
    },
    {
      type: 'redline',
      title: '朝觐季（当前进行中）内容占 KSA TikTok 热搜 70%，K 歌借势不可行',
      detail: '6月初朝觐季高峰期，强行与 K 歌连接风险极高。建议等朝觐季结束（约6月底）后娱乐类内容流量回归。开斋节歌曲余热是当前唯一合适借势点。',
      date: '06-01'
    },
  ]

  const typeStyle: Record<string, { label: string; labelCls: string }> = {
    discovery: { label: '发现', labelCls: 'badge-approved' },
    redline:   { label: '红线', labelCls: 'badge-rejected' },
    fix:       { label: '修正', labelCls: 'badge-pending'  },
  }

  const tasks = [
    { name: 'Task 1：数据源可用性', pct: 100, note: 'TikTok UGC ✓ · Creative Center ✓ · Meta Ads ✓ · Google Trends ✓ · X 热搜 ✓ · YouTube（搜索关键词替代 trending 页）✓' },
    { name: 'Task 2：真实竞品名单', pct: 100, note: 'Starmaker 100+ active（TikTok 空白）✓，Happyvv1 6条 2026-05-27 启动 ✓，Smule KSA 零投放 ✓' },
    { name: 'Task 3：Hook 模板归纳', pct: 100, note: '7 种模板（H01-H07），5条真实 TikTok 视频数据支撑，最高赞 1.2M ✓' },
    { name: 'Task 4：关键词词典 v0', pct: 100, note: '4 层关键词体系 ✓，ASO 优先级排序 ✓，YouTube 数据互证补充 ✓' },
    { name: 'Task 5：文化日历 + 红线词', pct: 100, note: '5 个节点验证 ✓（开斋节/朝觐/国庆/冬季/斋月），红线词初始化 ✓，竞品红线案例 2 条 ✓' },
  ]

  const refs = [
    {
      platform: 'TikTok',
      title: '阿语歌词字幕 × 1.2M 赞（H01 王牌格式）',
      note: '搜索 "karaoke arab"，前3条结果',
      url: 'https://www.tiktok.com/search?q=karaoke+arab',
      metric: '1.2M 赞'
    },
    {
      platform: 'TikTok',
      title: 'Duet 分屏合唱邀请 × 578K 赞（H02 弹幕格式）',
      note: '搜索 "كاراوكي"，Top 2 视频',
      url: 'https://www.tiktok.com/search?q=%D9%83%D8%A7%D8%B1%D8%A7%D9%88%D9%83%D9%8A',
      metric: '578K 赞'
    },
    {
      platform: 'TikTok',
      title: 'Elissa 开斋节歌曲粉丝剪辑（H05 明星歌曲型）',
      note: '收藏/分享比高，节日借势参考',
      url: 'https://www.tiktok.com/@fansofelissa/video/7644421911165898005',
      metric: '2.4K 分享'
    },
    {
      platform: 'YouTube',
      title: 'كاريوكي يا ناس أحبه（乌德琴 K 歌 Shorts）',
      note: 'KSA 本土 K 歌格式参考，Shorts 高播放',
      url: 'https://www.youtube.com/shorts/HgagXAM_k_I',
      metric: '400K 播放'
    },
    {
      platform: 'YouTube',
      title: 'صحاك الشوق فضل شاكر كاريوكي（经典阿语K歌最高播放）',
      note: '阿语卡拉OK YouTube 最高播放参考',
      url: 'https://www.youtube.com/watch?v=j-5HUMJnsCA',
      metric: '715K 播放'
    },
    {
      platform: 'YouTube',
      title: 'Elissa - Hobbak Metl Beirut MV（KSA 最流行阿语女歌手）',
      note: '652万订阅，版权价值参考，H05 素材候选',
      url: 'https://www.youtube.com/watch?v=5i40jN0k9S0',
      metric: '6.8M 播放'
    },
    {
      platform: 'Meta',
      title: 'Happyvv1 情感互动型广告（竞品新入局）',
      note: '2026-05-27 启动，"声音传达给所有人" = 红线案例',
      url: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=SA&q=Happyvv1',
      metric: '6条 active'
    },
  ]

  const platformColor: Record<string, string> = {
    TikTok: 'badge-approved',
    YouTube: 'badge-pending',
    Meta: 'badge-rejected',
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="font-mono-display text-[10px] text-muted-foreground tracking-widest uppercase mb-1">INTELLIGENCE DASHBOARD</div>
        <h1 className="text-xl font-semibold text-foreground mb-1">情报台</h1>
        <p className="text-sm text-muted-foreground">Week 0 探源进度 · 关键发现 · 参考视频库</p>
      </div>

      {/* 指标卡 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-lg border border-border card-hover p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <span className={`status-dot ${s.dot}`} />
              <span className="text-[10px] text-muted-foreground font-mono-display tracking-wider uppercase">{s.label}</span>
            </div>
            <div className="text-2xl font-semibold text-foreground font-mono-display mb-1">{s.value}</div>
            <div className="text-[11px] text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Week 0 进度 */}
      <div className="bg-white rounded-lg border border-border p-5">
        <div className="font-mono-display text-xs text-primary uppercase tracking-wider mb-4">WEEK 0 PROGRESS — 100% COMPLETE</div>
        <div className="space-y-4">
          {tasks.map(t => (
            <div key={t.name} className="flex gap-4 items-start">
              <div className="w-44 flex-shrink-0 text-xs text-foreground/80 pt-0.5">{t.name}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${t.pct}%`,
                        background: 'oklch(0.42 0.14 150)',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                  <span className="font-mono-display text-[10px] text-muted-foreground w-7 text-right">{t.pct}%</span>
                </div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">{t.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 关键发现 */}
      <div className="bg-white rounded-lg border border-border p-5">
        <div className="font-mono-display text-xs text-primary uppercase tracking-wider mb-4">KEY FINDINGS · Week 0</div>
        <div className="space-y-3">
          {findings.map((f, i) => {
            const cfg = typeStyle[f.type]
            return (
              <div key={i} className="flex gap-3 p-3 rounded-md bg-muted/30 border border-border/50">
                <div className="flex-shrink-0 pt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${cfg.labelCls}`}>{cfg.label}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground mb-0.5">{f.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{f.detail}</div>
                </div>
                <div className="font-mono-display text-[10px] text-muted-foreground whitespace-nowrap pt-0.5">{f.date}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 参考视频库 */}
      <div className="bg-white rounded-lg border border-border p-5">
        <div className="font-mono-display text-xs text-primary uppercase tracking-wider mb-4">REFERENCE VIDEOS · 实测样本库</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {refs.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 p-3 rounded-md border border-border/50 bg-muted/20 hover:bg-muted/50 hover:border-primary/30 transition-all group"
            >
              <div className="flex-shrink-0 pt-0.5">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${platformColor[r.platform]}`}>{r.platform}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground mb-0.5 group-hover:text-primary transition-colors leading-snug">{r.title}</div>
                <div className="text-[11px] text-muted-foreground">{r.note}</div>
              </div>
              <div className="font-mono-display text-[10px] text-primary/70 whitespace-nowrap pt-0.5 flex-shrink-0">{r.metric}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
