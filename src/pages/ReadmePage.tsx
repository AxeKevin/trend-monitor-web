export default function ReadmePage() {
  const hookTypes = [
    { id: 'H01', name: '阿语歌词字幕特效型', metric: '1.2M 赞', desc: '热门阿语歌曲 + 动态字幕叠加，无需人物出镜，零隐私风险', level: 'high' },
    { id: 'H02', name: 'Duet/弹幕合唱邀请型', metric: '578K 赞', desc: '分屏合唱邀请，直接映射 Nagham 弹幕功能，TikTok 原生格式', level: 'high' },
    { id: 'H03', name: '在家K歌App演示型', metric: '206K 赞', desc: '人物出镜展示 App 使用流程，高安装引导效率', level: 'mid' },
    { id: 'H04', name: '演唱会/现场跟唱型', metric: '24K 赞', desc: '演唱会现场素材 + 歌词字幕，情感共鸣但制作成本高', level: 'mid' },
    { id: 'H05', name: '明星歌曲K歌字幕型', metric: '待测', desc: '使用知名歌手歌曲（Elissa/Hamaki）制作字幕，需确认版权', level: 'mid' },
    { id: 'H06', name: '极简功能诉求型', metric: '低（竞品主用）', desc: '直接说功能/价格，Starmaker 和 Happyvv1 主用，效果一般', level: 'low' },
    { id: 'H07', name: '深夜私密演唱型', metric: '待测', desc: '主打私密录制场景，Nagham 差异化核心方向，暂无样本', level: 'high' },
  ]

  const levelColor: Record<string, string> = {
    high: 'badge-approved',
    mid: 'badge-pending',
    low: 'badge-rejected',
  }

  const redlines = [
    { type: '公域曝光暗示', example: '「获得点赞」「分享给所有人」「成为明星」', reason: 'Snapchat 渗透率 88%，沙特用户极度隐私敏感' },
    { type: '宗教内容混搭', example: '朝觐/祈祷场景 + K 歌娱乐', reason: '宗教与娱乐强行结合在 KSA 是禁忌' },
    { type: '男女混合社交', example: '明显的混合性别聚会场景', reason: '文化敏感，可能引起投诉' },
    { type: '政治/王室内容', example: '涉及王室或政府', reason: '广告平台政策 + 本地法规双重风险' },
  ]

  const sop = [
    {
      step: '01',
      title: 'TikTok Creative Center（5 分钟）',
      detail: '访问 ads.tiktok.com/business/creativecenter → Region = SA，Industry = Music & Entertainment，Period = 7 days → 记录前 5 条广告的 Hook 类型和文案',
    },
    {
      step: '02',
      title: 'TikTok UGC 话题扫描（5-10 分钟）',
      detail: '访问 tiktok.com/tag/اغاني、tiktok.com/tag/كاراوكي、tiktok.com/tag/السعودية（仅看音乐/娱乐类）→ 记录点赞/分享/收藏量 + 封面画面 + Hook 类型',
    },
    {
      step: '03',
      title: '填写候选卡片（2-5 分钟）',
      detail: '复制 daily/YYYY-MM-DD.md 模板，填写标题/来源/难度/评分/Hook/状态，打标签',
    },
    {
      step: '04',
      title: '每周一次：P2 聚类 + 脚本卡生成',
      detail: '把本周候选卡片喂给 AI（使用 templates/prompt-p2-cluster.md），产出聚类结论，再用 templates/prompt-p3-script-gen.md 生成脚本卡初稿',
    },
  ]

  const glossary = [
    {
      term: 'Hook（钩子）',
      def: '广告视频前 3 秒的内容。决定用户是继续看还是划走，是素材效果差异最大的单一因素（权重约 70%）。包含：视觉（画面）+ 音频（背景音/人声）+ 文字（字幕）。',
    },
    {
      term: '评分 Score（1-10）',
      def: '综合评分。热度真实性（30%）+ Nagham 适配性（40%）+ 红线安全（20%）+ 制作难度（10%）。8-10 分直接进脚本队列，5-7 分进观察池，1-4 分拒绝。',
    },
    {
      term: '难度 Difficulty',
      def: '把热点/格式连接到 Nagham K歌场景的难度，不是制作难度。easy = 天然音乐相关；medium = 需要创意桥梁；hard = 几乎无法连接或触碰红线。',
    },
    {
      term: '状态 Status',
      def: 'pending（待判断）/ approved（确认进生产）/ rejected（拒绝）/ draft（脚本卡草稿）/ ready（可交执行）/ live（已投放）',
    },
    {
      term: '脚本卡 Script Card',
      def: '一条广告素材的完整创意简报，包含 Hook（前3秒）/ Body（4-20秒）/ CTA（结尾）/ 目标受众 / 红线检查。不是完整拍摄脚本，需交给拍摄/设计进一步细化。',
    },
    {
      term: '红线 Red Line',
      def: '导致素材自动拒绝的内容类型。在 KSA 市场，公域曝光暗示（"获得点赞"）是最常见红线。见下方红线表。',
    },
    {
      term: 'Week 0',
      def: '探源周，只做一次。产出：数据源验证 + 竞品分析 + Hook 模板库 + 关键词词典 + 文化日历。是后续所有周的基础资产。',
    },
    {
      term: 'P1 / P2 / P3 提示词',
      def: 'AI 分析的三个阶段。P1：分析单条视频 Hook 结构（JSON 输出）；P2：把多条候选热点聚类提炼成模板；P3：基于模板生成脚本卡初稿。',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <div className="font-mono-display text-[10px] text-muted-foreground tracking-widest uppercase mb-1">README</div>
        <h1 className="text-xl font-semibold text-foreground mb-1">使用指南</h1>
        <p className="text-sm text-muted-foreground">名词解释 · 操作 SOP · Hook 模板 · 红线规则</p>
      </div>

      {/* 系统介绍 */}
      <div className="bg-white rounded-lg border border-border p-5">
        <div className="font-mono-display text-xs text-primary uppercase tracking-wider mb-3">WHAT IS THIS</div>
        <p className="text-sm text-foreground/80 leading-relaxed mb-3">
          这是一个<strong>人工 + AI 协作的广告创意情报系统</strong>，帮助 Nagham 增长团队系统性发现 KSA 热点内容、分析竞品广告、生成脚本卡。
        </p>
        <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
          {['每日扫描热点（15min）', '→', '候选打分/打标', '→', 'AI 周度聚类', '→', '输出脚本卡', '→', '制作/投放广告'].map((item, i) => (
            <span key={i} className={item === '→' ? 'text-primary/40' : 'bg-muted px-2 py-0.5 rounded'}>{item}</span>
          ))}
        </div>
      </div>

      {/* 名词解释 */}
      <div className="bg-white rounded-lg border border-border p-5">
        <div className="font-mono-display text-xs text-primary uppercase tracking-wider mb-4">GLOSSARY · 名词解释</div>
        <div className="space-y-0 divide-y divide-border/50">
          {glossary.map((g, i) => (
            <div key={i} className="py-3 flex gap-4">
              <div className="w-36 flex-shrink-0">
                <span className="text-xs font-semibold text-foreground">{g.term}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{g.def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hook 模板 */}
      <div className="bg-white rounded-lg border border-border p-5">
        <div className="font-mono-display text-xs text-primary uppercase tracking-wider mb-4">HOOK TEMPLATES · H01–H07</div>
        <div className="space-y-2">
          {hookTypes.map(h => (
            <div key={h.id} className="flex gap-3 items-start p-3 rounded-md bg-muted/20 border border-border/40">
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="font-mono-display text-xs font-semibold text-primary/70 w-7">{h.id}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${levelColor[h.level]}`}>
                  {h.level === 'high' ? '推荐' : h.level === 'mid' ? '备选' : '低优'}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-foreground mb-0.5">{h.name}</div>
                <div className="text-[11px] text-muted-foreground">{h.desc}</div>
              </div>
              <div className="font-mono-display text-[10px] text-primary/60 whitespace-nowrap pt-0.5 flex-shrink-0">{h.metric}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 每日 SOP */}
      <div className="bg-white rounded-lg border border-border p-5">
        <div className="font-mono-display text-xs text-primary uppercase tracking-wider mb-4">DAILY SOP · 每日操作流程（15-20 分钟）</div>
        <div className="space-y-3">
          {sop.map(s => (
            <div key={s.step} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-mono-display text-[11px] font-semibold text-primary">{s.step}</span>
              </div>
              <div>
                <div className="text-xs font-medium text-foreground mb-0.5">{s.title}</div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 红线规则 */}
      <div className="bg-white rounded-lg border border-border p-5">
        <div className="font-mono-display text-xs text-primary uppercase tracking-wider mb-4">RED LINES · 自动拒绝规则（KSA 市场）</div>
        <div className="space-y-2">
          {redlines.map((r, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-md bg-red-50/50 border border-red-100">
              <span className="text-[10px] px-1.5 py-0.5 rounded font-medium badge-rejected flex-shrink-0 mt-0.5">红线</span>
              <div className="flex-1">
                <div className="text-xs font-medium text-foreground mb-0.5">{r.type}</div>
                <div className="text-[11px] text-muted-foreground mb-0.5">例：{r.example}</div>
                <div className="text-[11px] text-muted-foreground/70">原因：{r.reason}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 p-3 bg-muted/30 rounded-md">
          <p className="text-[11px] text-muted-foreground">
            <strong className="text-foreground">快速判断方法：</strong>问自己"一个沙特保守家庭看到这个，会不舒服吗？"如果是，就是红线。
          </p>
        </div>
      </div>

      {/* 数据更新 */}
      <div className="bg-white rounded-lg border border-border p-5">
        <div className="font-mono-display text-xs text-primary uppercase tracking-wider mb-3">DATA UPDATE · 更新网站数据</div>
        <p className="text-xs text-muted-foreground mb-3">网站数据在 <code className="bg-muted px-1.5 py-0.5 rounded text-[11px]">trend-monitor-web/src/data/mockData.ts</code> 中手动维护，更新后执行：</p>
        <div className="bg-muted/50 rounded-md p-3 font-mono text-[11px] text-foreground/70">
          cd trend-monitor-web && npm run build && npx -y @codeflicker/frontend-cloud-cli@latest deploy --dir ./dist
        </div>
      </div>
    </div>
  )
}
