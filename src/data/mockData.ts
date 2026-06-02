// Week 1 完整版数据（2026-06-01 + 受众画像 + 参考视频链接 + 候选分类）
// 候选分类：热门歌曲 / 歌手·网红 / 标签·话题
// 红线修正：公域曝光暗示 → 仅女性用户需规避，男性用户可接受公域曝光

export type CandidateCategory = '热门歌曲' | '歌手·网红' | '标签·话题'

export interface AudienceProfile {
  gender: '男性为主' | '女性为主' | '男女均衡'
  ageRange: string      // 如 "18-28"
  countries: string[]   // 如 ["沙特", "埃及"]
  occupation?: string   // 如 "在校学生/年轻上班族"
  note?: string         // 额外说明
}

export interface RefVideo {
  title: string
  url: string
  platform: 'TikTok' | 'YouTube' | 'Meta'
  metric: string        // 如 "1.2M 赞"
  thumbnail?: string    // 缩略图 URL（YouTube 用 img.youtube.com，TikTok 用搜索页截图）
  isSearchPage?: boolean // true = 链接是搜索页，需提示手动切到「视频」Tab
  publishedAt?: string   // 发布时间（如 "2025-07"），用于时效性降权
}

export interface DailyCandidate {
  date: string
  category: CandidateCategory
  title: string
  source: string
  difficulty: 'easy' | 'medium' | 'hard'
  score: number
  tags: string[]
  hook: string
  status: 'pending' | 'approved' | 'rejected'
  audience: AudienceProfile
  refVideos: RefVideo[]
  note?: string
}

export interface WeeklyScript {
  week: string
  title: string
  hook: string
  body: string
  cta: string
  targetAudience: string
  platform: string
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'draft' | 'ready' | 'live'
}

export interface DailyReport {
  date: string
  candidates: DailyCandidate[]
  summary?: string
}

export interface WeeklyReport {
  week: string
  scripts: WeeklyScript[]
  summary?: string
}

// ─────────────────────────────────────────────
// 2026-06-01 全量数据
// ─────────────────────────────────────────────
export const MOCK_DAILY_REPORTS: DailyReport[] = [
  {
    date: '2026-06-01',
    summary: '【Day 1 全量探源】TikTok UGC 实测：朝觐（Hajj）内容当前主导 KSA 热搜（70% 占比），音乐热门：埃及歌手 Hamaki/Elissa/Ramy Sabry，分享量最高的音乐视频达 6,013（歌词字幕型）。K歌内容王牌格式确认：阿语歌词字幕特效型（1.2M赞）+ Duet 合唱邀请型（578K赞）。',
    candidates: [
      // ══════════════════════════════════════════
      // 分类：热门歌曲
      // ══════════════════════════════════════════
      {
        date: '2026-06-01',
        category: '热门歌曲',
        title: '「karaoke arab」TikTok 最高赞：阿语歌词字幕特效（1.2M 赞）',
        source: 'TikTok UGC · 搜索 karaoke arab',
        difficulty: 'easy',
        score: 9.5,
        tags: ['TikTok UGC', 'H01字幕型', '1.2M赞', '无需出镜', '阿语歌词', '最高赞'],
        hook: '热门阿语歌「حاجة تحبيها」+ 动态字幕叠加特效（Lyric Overlay），深色背景歌词逐字点亮，无人物出镜，印尼创作者做阿语内容爆款',
        status: 'approved',
        audience: {
          gender: '男女均衡',
          ageRange: '18-35',
          countries: ['沙特', 'UAE', '埃及', 'GCC全区'],
          occupation: '在校学生 / 年轻上班族',
          note: '阿语歌曲覆盖全 GCC 受众，印尼创作者发布说明内容质量 > 创作者国籍'
        },
        refVideos: [
          { title: 'karaoke arab 最高赞：阿语歌词字幕（1.2M赞，王牌样本）', url: 'https://www.tiktok.com/search?q=karaoke+arab', platform: 'TikTok', metric: '1.2M 赞', isSearchPage: true, publishedAt: '2025-06' },
          { title: 'كاريوكي يا ناس أحبه（乌德琴 K 歌 Shorts）', url: 'https://www.youtube.com/shorts/HgagXAM_k_I', platform: 'YouTube', metric: '400K 播放', thumbnail: 'https://img.youtube.com/vi/HgagXAM_k_I/mqdefault.jpg', publishedAt: '2025-03' },
          { title: 'صحاك الشوق فضل شاكر كاريوكي（阿语K歌 YouTube 最高播放）', url: 'https://www.youtube.com/watch?v=j-5HUMJnsCA', platform: 'YouTube', metric: '715K 播放', thumbnail: 'https://img.youtube.com/vi/j-5HUMJnsCA/mqdefault.jpg', publishedAt: '2024-09' },
          { title: 'Ed Sheeran Perfect 歌词字幕 K 歌（英文歌 KSA 高互动）', url: 'https://www.tiktok.com/search?q=%D9%83%D8%A7%D8%B1%D8%A7%D9%88%D9%83%D9%8A', platform: 'TikTok', metric: '406K 赞', isSearchPage: true, publishedAt: '2025-05' },
          { title: '#الاماكن كاريوكي عود 2026（海湾风乌德琴K歌）', url: 'https://www.youtube.com/watch?v=iMtYI-R_4ZQ', platform: 'YouTube', metric: '205K 播放', thumbnail: 'https://img.youtube.com/vi/iMtYI-R_4ZQ/mqdefault.jpg', publishedAt: '2025-01' },
        ],
        note: '✅ 直接指导：Nagham 广告 hook = 热门阿语歌曲 + 歌词字幕动效，零隐私风险，无需用户露脸。KSA K歌内容王牌格式已确认。'
      },
      {
        date: '2026-06-01',
        category: '热门歌曲',
        title: '「اغاني العيد 2026」开斋节歌曲 Google Trends 热度 99（借势黄金窗口）',
        source: 'Google Trends KSA',
        difficulty: 'easy',
        score: 9.0,
        tags: ['Google Trends', '开斋节', 'اغاني', '热度99', '借势黄金窗口', '6月中截止'],
        hook: '开斋节歌曲（اغاني العيد 2026）搜索热度 99/100（5月24日峰值），节后余热持续至今（6月初仍高位）。借势窗口约剩 1-2 周。',
        status: 'approved',
        audience: {
          gender: '男女均衡',
          ageRange: '20-45',
          countries: ['沙特', 'UAE', 'Kuwait', '全 GCC'],
          occupation: '各阶层均覆盖，节日属性无职业壁垒',
          note: '开斋节是全民节日，受众最广，男女均接受公域节日内容'
        },
        refVideos: [
          { title: 'Elissa 开斋节歌曲粉丝剪辑（收藏/分享比高）', url: 'https://www.tiktok.com/@fansofelissa/video/7644421911165898005', platform: 'TikTok', metric: '2.4K 分享', publishedAt: '2026-05' },
          { title: 'Elissa - Hobbak Metl Beirut MV（652万订阅KSA女歌手标杆）', url: 'https://www.youtube.com/watch?v=5i40jN0k9S0', platform: 'YouTube', metric: '6.8M 播放', thumbnail: 'https://img.youtube.com/vi/5i40jN0k9S0/mqdefault.jpg', publishedAt: '2024-04' },
          { title: 'Elissa - 斋月广告主题曲（18M播放，节日主题最高参考）', url: 'https://www.youtube.com/watch?v=90reCPg9LzI', platform: 'YouTube', metric: '18M 播放', thumbnail: 'https://img.youtube.com/vi/90reCPg9LzI/mqdefault.jpg', publishedAt: '2024-03' },
          { title: 'Google Trends KSA اغاني العيد 实时数据', url: 'https://trends.google.com/trends/explore?geo=SA&q=اغاني+العيد', platform: 'YouTube', metric: '热度 99' },
        ],
        note: '✅ 现在（6月初）是「开斋节借势」的最后窗口，再过 1-2 周热度将回落。脚本卡 #1 应本周内完成并投放测试。'
      },
      {
        date: '2026-06-01',
        category: '热门歌曲',
        title: 'Hamaki 歌词字幕设计（17.8K赞 / 6.0K分享 — 高病毒传播属性）',
        source: 'TikTok UGC · #اغاني · @kanaryaa_5',
        difficulty: 'easy',
        score: 8.0,
        tags: ['TikTok UGC', 'H01字幕型', 'Hamaki', '歌词设计', '高分享', '病毒属性'],
        hook: '埃及歌手 Hamaki 情歌歌词字幕设计，32秒，分享量6013（远高于点赞评论比），WhatsApp 状态类素材格式',
        status: 'approved',
        audience: {
          gender: '女性为主',
          ageRange: '18-30',
          countries: ['沙特', '埃及', 'UAE'],
          occupation: '在校女大学生 / 年轻女性上班族',
          note: '情歌字幕类内容女性分享率显著高于男性，常用于 WhatsApp/IG Story 状态'
        },
        refVideos: [
          { title: 'Hamaki 歌词字幕（17.8K赞/6K分享，高病毒传播）', url: 'https://www.tiktok.com/@kanaryaa_5/video/7645048495879081234', platform: 'TikTok', metric: '6K 分享', publishedAt: '2026-05' },
          { title: 'كاريوكي لا تسامحني（Shorts，287K播放）', url: 'https://www.youtube.com/shorts/4DbQ5t9tQkg', platform: 'YouTube', metric: '287K 播放', thumbnail: 'https://img.youtube.com/vi/4DbQ5t9tQkg/mqdefault.jpg', publishedAt: '2025-06' },
          { title: 'TikTok #اغاني_مسرعه 加速歌曲话题（6.5M作品）', url: 'https://www.tiktok.com/tag/%D8%A7%D8%BA%D8%A7%D9%86%D9%8A', platform: 'TikTok', metric: '6.5M 作品' },
        ],
        note: '关键洞察：歌词字幕型分享量/点赞比值异常高（6K分享 vs 17K赞），被用作"转发给朋友"素材，高病毒传播属性。'
      },
      // ══════════════════════════════════════════
      // 分类：歌手·网红
      // ══════════════════════════════════════════
      {
        date: '2026-06-01',
        category: '歌手·网红',
        title: 'Elissa 开斋节歌曲（21.4K赞 / 2.4K分享 / 5天前）',
        source: 'TikTok UGC · #اغاني · @fansofelissa',
        difficulty: 'easy',
        score: 7.8,
        tags: ['TikTok UGC', 'H05明星歌曲型', 'Elissa', '开斋节', '粉丝内容', '版权需确认'],
        hook: '开斋节主题「اغمرني هالليلة عيدي」，黎巴嫩天后 Elissa 歌曲，21秒短视频，节日情感共鸣，收藏/分享比高',
        status: 'approved',
        audience: {
          gender: '女性为主',
          ageRange: '18-35',
          countries: ['沙特', '黎巴嫩', 'UAE', '埃及'],
          occupation: '年轻女性，Elissa 粉丝群体，中产阶级',
          note: 'Elissa 核心粉丝以 20-35 阿拉伯女性为主，沙特渗透率高（YouTube 652万订阅）'
        },
        refVideos: [
          { title: 'Elissa 开斋节歌曲粉丝剪辑（2.4K分享，节日情感共鸣）', url: 'https://www.tiktok.com/@fansofelissa/video/7644421911165898005', platform: 'TikTok', metric: '2.4K 分享', publishedAt: '2026-05' },
          { title: 'Elissa - Hobbak Metl Beirut（YouTube 6.8M播放）', url: 'https://www.youtube.com/watch?v=5i40jN0k9S0', platform: 'YouTube', metric: '6.8M 播放', thumbnail: 'https://img.youtube.com/vi/5i40jN0k9S0/mqdefault.jpg', publishedAt: '2024-04' },
          { title: 'Elissa - 斋月广告主题曲（18M播放，最高参考）', url: 'https://www.youtube.com/watch?v=90reCPg9LzI', platform: 'YouTube', metric: '18M 播放', thumbnail: 'https://img.youtube.com/vi/90reCPg9LzI/mqdefault.jpg', publishedAt: '2024-03' },
          { title: 'Elissa YouTube 频道（@ElissaKh，652万订阅）', url: 'https://www.youtube.com/@ElissaKh', platform: 'YouTube', metric: '652万订阅' },
        ],
        note: 'Elissa 是 KSA 最流行阿语女歌手，开斋节余热持续。H05 脚本卡候选，需确认版权使用权限。'
      },
      {
        date: '2026-06-01',
        category: '歌手·网红',
        title: 'The Voice Kids 选手 jowairiahamdy（4.5M粉 / 最新视频 1.8M播放）',
        source: 'TikTok UGC · @jowairiahamdy',
        difficulty: 'medium',
        score: 6.5,
        tags: ['TikTok UGC', '网红', 'The Voice Kids', '多语言', '高粉丝基础'],
        hook: '2016 The Voice Kids 埃及区决赛选手，4.5M粉，最新视频 1.8M播放（中埃外交活动），真实声音展示型 hook 极强',
        status: 'pending',
        audience: {
          gender: '男女均衡',
          ageRange: '16-30',
          countries: ['埃及', 'Saudi Arabia', '全阿语区'],
          occupation: '在校学生 / 音乐爱好者',
          note: '粉丝以阿语区年轻人为主，跨国受众广，与 K 歌连接需要创意桥梁'
        },
        refVideos: [
          { title: 'jowairiahamdy 最新视频（1.8M播放/140.8K赞，中埃外交）', url: 'https://www.tiktok.com/@jowairiahamdy', platform: 'TikTok', metric: '1.8M 播放' },
          { title: 'The Voice Kids 阿语区翻唱精选（参考格式）', url: 'https://www.youtube.com/results?search_query=the+voice+kids+arabic+karaoke', platform: 'YouTube', metric: '参考' },
          { title: 'TikTok 翻唱展示合集 #تجربة_الغناء', url: 'https://www.tiktok.com/tag/%D8%AA%D8%AC%D8%B1%D8%A8%D8%A9_%D8%A7%D9%84%D8%BA%D9%86%D8%A7%D8%A1', platform: 'TikTok', metric: '参考' },
        ],
        note: '与 Nagham 连接方向：邀请网红在 Nagham 上录制弹幕合唱，展示真实 App 体验。但需要 KOL 合作资源。'
      },
      {
        date: '2026-06-01',
        category: '歌手·网红',
        title: 'jamil_alhasan（朝觐纪录片风格创作者，314K赞 / 36.9K分享）',
        source: 'TikTok UGC · #السعودية · @jamil_alhasan',
        difficulty: 'hard',
        score: 2.5,
        tags: ['TikTok UGC', '朝觐季', '热门话题', '纪录片风格', '当前最热'],
        hook: '麦加朝觐安保系统内景探秘，600项运营计划，314.8K赞/36.9K分享，当前 KSA TikTok 最高互动创作者类型',
        status: 'rejected',
        audience: {
          gender: '男女均衡',
          ageRange: '25-50',
          countries: ['全阿语区', '全球穆斯林受众'],
          occupation: '宗教信仰者 / 朝觐相关从业者',
          note: '朝觐内容受众是宗教属性强的群体，与 K 歌娱乐受众几乎不重叠'
        },
        refVideos: [
          { title: 'jamil_alhasan 朝觐安保视频（36.9K分享，当前最高互动）', url: 'https://www.tiktok.com/@jamil_alhasan/video/7645395716998745352', platform: 'TikTok', metric: '36.9K 分享' },
        ],
        note: '❌ K歌借势不可行：宗教（朝觐）内容与K歌强行结合风险极高。6月底朝觐季结束后娱乐内容流量才会回归。'
      },
      // ══════════════════════════════════════════
      // 分类：标签·话题
      // ══════════════════════════════════════════
      {
        date: '2026-06-01',
        category: '标签·话题',
        title: '「كاراوكي」Duet 合唱邀请型话题（578K 赞，全样本次高赞）',
        source: 'TikTok UGC · 搜索 كاراوكي · #singwithme',
        difficulty: 'easy',
        score: 9.2,
        tags: ['TikTok UGC', 'H02Duet型', '578K赞', '弹幕合唱', 'Nagham差异化', '#singwithme'],
        hook: '分屏 Duet 格式：左侧原视频伴奏 + 右侧手写歌词字幕，邀请用户跟唱「Love is Gone」，前 3 秒即出现"跟我唱"字幕',
        status: 'approved',
        audience: {
          gender: '男女均衡',
          ageRange: '18-28',
          countries: ['沙特', 'UAE', 'GCC', '全球阿语区'],
          occupation: '在校大学生 / 年轻白领，重度 TikTok 用户',
          note: '已内化 Duet 互动为日常行为的年轻 TikTok 用户，男女均参与，男性用户可公开分享合唱内容'
        },
        refVideos: [
          { title: 'TikTok Duet 邀请跟唱合唱（578K赞，最高Duet样本）', url: 'https://www.tiktok.com/search?q=%D9%83%D8%A7%D8%B1%D8%A7%D9%88%D9%83%D9%8A', platform: 'TikTok', metric: '578K 赞', isSearchPage: true, publishedAt: '2025-05' },
          { title: 'Ed Sheeran Perfect 歌词字幕（singduet格式，406K赞）', url: 'https://www.tiktok.com/search?q=%D9%83%D8%A7%D8%B1%D8%A7%D9%88%D9%83%D9%8A', platform: 'TikTok', metric: '406K 赞', isSearchPage: true, publishedAt: '2025-05' },
          { title: 'أغاني خليجية كاريوكي 播放列表（海湾卡拉OK合集）', url: 'https://www.youtube.com/watch?v=LquXLdGpWQ0&list=PLU6UpvegH8j-5zTcgxxZRkQ0rNyjOlJa7', platform: 'YouTube', metric: '播放列表', thumbnail: 'https://img.youtube.com/vi/LquXLdGpWQ0/mqdefault.jpg', publishedAt: '2024-01' },
          { title: 'كاريوكي قلبي مرتاح – آدم（Arabic Karaoke 2026参考）', url: 'https://www.youtube.com/watch?v=Q4aJBKuJKts', platform: 'YouTube', metric: '723 播放', thumbnail: 'https://img.youtube.com/vi/Q4aJBKuJKts/mqdefault.jpg', publishedAt: '2026-01' },
          { title: 'في عينيا امانه（Hamaki歌词字幕，高分享）', url: 'https://www.tiktok.com/@kanaryaa_5/video/7645048495879081234', platform: 'TikTok', metric: '6K 分享', publishedAt: '2026-05' },
        ],
        note: '✅✅ 完美映射 Nagham 弹幕/合唱功能。男性用户公开合唱无红线风险，女性用户参与弹幕但不需要公开个人信息。'
      },
      {
        date: '2026-06-01',
        category: '标签·话题',
        title: '「karaoke」英文词 KSA 搜索热度：冬季+2月峰值规律',
        source: 'Google Trends KSA',
        difficulty: 'medium',
        score: 6.5,
        tags: ['Google Trends', 'karaoke英文', '季节性', 'ASO洞察', '全年规律'],
        hook: '「karaoke」英文词：2月8日=100（全年峰值），11-12月=89（第二高峰）。阿语「كاراوكي」无数据！说明用户用英文搜索 K 歌。',
        status: 'approved',
        audience: {
          gender: '男性为主',
          ageRange: '20-35',
          countries: ['沙特', 'UAE', 'Kuwait'],
          occupation: '在沙特工作的外籍劳工 / 使用英文的本地年轻男性',
          note: '英文 karaoke 搜索者有更高比例为在 KSA 的外籍男性（印巴/亚洲系）和沙特英文系年轻男性，对公域曝光无顾虑'
        },
        refVideos: [
          { title: 'Google Trends KSA karaoke 关键词实时热度', url: 'https://trends.google.com/trends/explore?geo=SA&q=karaoke', platform: 'YouTube', metric: '季节性曲线' },
          { title: 'كاريوكي عود 2026（KSA本土K歌，高热度样本）', url: 'https://www.youtube.com/watch?v=iMtYI-R_4ZQ', platform: 'YouTube', metric: '205K 播放' },
          { title: 'كاريوكي لا تسامحني（Shorts K歌格式）', url: 'https://www.youtube.com/shorts/4DbQ5t9tQkg', platform: 'YouTube', metric: '287K 播放' },
        ],
        note: 'ASO 核心结论：英文 karaoke 列 P1 优先词，阿语「كاراوكي」降级为 P3。下次投放时间窗口：11-12月冬季高峰。'
      },
      {
        date: '2026-06-01',
        category: '标签·话题',
        title: '「#السعودية × 科技/城市建设」话题：利雅得降温项目（高转发率）',
        source: 'TikTok UGC · @faisalaleid05',
        difficulty: 'hard',
        score: 3.5,
        tags: ['TikTok UGC', '科技话题', '沙特爱国', '高转发', '非音乐场景'],
        hook: '「مشروع تبريد الرياض」利雅得降温项目话题，科技感强，Vision 2030 框架下高传播，但与 K 歌连接困难',
        status: 'rejected',
        audience: {
          gender: '男性为主',
          ageRange: '25-45',
          countries: ['沙特'],
          occupation: '沙特本地男性 / 关注 Vision 2030 的中产阶层',
          note: '男性为主，爱国科技内容受众，与 K 歌受众几乎不重叠，但可学习其传播格式（信息密集+纪录片感）'
        },
        refVideos: [
          { title: 'TikTok #السعودية 话题页（39.9M作品，热门话题参考）', url: 'https://www.tiktok.com/tag/%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9', platform: 'TikTok', metric: '39.9M 作品' },
        ],
        note: '❌ 内容借势不可行，但格式学习价值高：信息密集+纪录片感的内容格式在 KSA 高传播，可用于 Nagham App 功能介绍素材。'
      },
      {
        date: '2026-06-01',
        category: '标签·话题',
        title: 'Starmaker KSA TikTok Creative Center 零存在 → 渠道空白',
        source: 'TikTok Creative Center KSA',
        difficulty: 'easy',
        score: 7.5,
        tags: ['竞品分析', 'Starmaker', 'TikTok空白', '渠道窗口', '战略洞察'],
        hook: 'TikTok Creative Center 搜索 Starmaker/karaoke = 零结果，KSA K歌类 App 在 TikTok 广告上几乎空白',
        status: 'approved',
        audience: {
          gender: '男女均衡',
          ageRange: '18-35',
          countries: ['沙特', 'UAE', 'GCC'],
          occupation: 'TikTok 活跃用户 / 音乐/娱乐兴趣标签',
          note: '这是针对 TikTok 投放的整体受众判断，男性用户可用公域型素材，女性用户用私密/字幕型素材差异化投放'
        },
        refVideos: [
          { title: 'TikTok Creative Center KSA 音乐广告（当前空白，需持续监测）', url: 'https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en?region=SA&industry=23&period=7', platform: 'TikTok', metric: '空白' },
          { title: 'Starmaker Meta Ads Library KSA（100+ active，对比）', url: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=SA&q=Starmaker', platform: 'Meta', metric: '100+ active' },
          { title: 'Happyvv1 Meta Ads Library KSA（6条，新竞品）', url: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=SA&q=Happyvv1', platform: 'Meta', metric: '6条 active' },
        ],
        note: '✅ 战略窗口：Starmaker 把预算全押 Meta，TikTok 是空白地。Nagham 以 TikTok 原生感素材（H01/H02格式）直接占领 KSA K歌 TikTok 心智，无直接竞争。'
      },
    ]
  }
]

export const MOCK_WEEKLY_REPORTS: WeeklyReport[] = [
  {
    week: '2026-W24（Week 1）',
    summary: 'Week 1 正式启动。基于 Week 0 探源，确定脚本优先级：H01 阿语歌词字幕型 × 开斋节借势（黄金窗口，6月初余热）+ H02 Duet合唱型 × Nagham 弹幕功能差异化展示。本周目标：产出 5 张脚本卡，优先前 2 张本周投放测试。',
    scripts: [
      {
        week: '2026-W24',
        title: '脚本卡 #1 — 阿语歌词字幕 × 开斋节余热',
        hook: '黑色渐变背景，「اغاني العيد 2026」金色歌词字幕逐字点亮，配 Elissa 风格开斋节情歌前奏（3秒）。无人物出镜。零隐私风险。',
        body: 'Nagham App 界面：搜索歌曲 → 点击录制 → 歌词字幕实时跳动。文字：「ابحث عن أي أغنية واغنِّها الآن」（搜索任何歌曲，现在就唱）。强调：无广告 · 免费 · 曲库丰富。',
        cta: '「حمّل Nagham مجاناً」（免费下载 Nagham）→ Google Play / App Store',
        targetAudience: '沙特本地 18-35，爱听阿语流行歌曲，男女均衡',
        platform: 'TikTok + Meta（阿语版）',
        difficulty: 'easy',
        status: 'draft'
      },
      {
        week: '2026-W24',
        title: '脚本卡 #2 — Duet 合唱 × Nagham 弹幕差异化（男性受众版）',
        hook: '分屏格式（模拟 TikTok Duet）：左侧男性用户演唱一段阿语副歌，右侧出现 Nagham 弹幕字幕滚动（多用户声音片段标注）。文字：「🎤 انضم إليه الآن」（现在加入他）。',
        body: '展示弹幕合唱流程：原唱 → 弹幕轨道出现 → 作者 Pick → 合唱成品。旁白：「ميزة غير موجودة في أي تطبيق آخر」（其他 App 没有的功能）。男性用户分享合唱成品，无隐私顾虑。',
        cta: '「جرّب الغناء المشترك على Nagham」（试试 Nagham 合唱）',
        targetAudience: '沙特/GCC 男性 18-28，TikTok 重度用户，喜欢 Duet 互动',
        platform: 'TikTok（原生感最强）',
        difficulty: 'easy',
        status: 'draft'
      },
      {
        week: '2026-W24',
        title: '脚本卡 #3 — 在家 K 歌 App 演示型（H03·出镜演示）',
        hook: '镜头对准手机屏幕特写：在 Nagham 里搜索「حاجة تحبيها」→ 歌词加载 → 用户开口唱前两句（3秒）。沙发/卧室场景，私密感强，全程不必出现脸部。',
        body: '流程演示：搜索歌曲（展示曲库规模「+500,000 أغنية」）→ 点击麦克风开录 → 实时歌词跳动 → 完成后分享到 Snap 私密故事。文字：「خصوصيتك أهم شيء」（你的隐私最重要）。',
        cta: '「حمّل Nagham مجاناً – بدون إعلانات」（免费下载 Nagham，无广告）',
        targetAudience: '沙特女性 18-30，Snap 重度用户，隐私敏感，不愿公开露脸',
        platform: 'TikTok + Meta（Reels）',
        difficulty: 'easy',
        status: 'draft'
      },
      {
        week: '2026-W24',
        title: '脚本卡 #4 — 深夜私密独唱型（H07·情绪共鸣）',
        hook: '黑屏 + 凌晨时间字幕「2:34 AM」→ 耳机插入声音 → Nagham 界面亮起，点选一首慢歌。旁白（字幕）：「بس أنا وصوتي」（只有我和我的声音）。',
        body: '沉浸感展示：歌词逐字显示 → 用户小声跟唱（声音真实，不精修）→ 录音完成后保存到 Nagham 私密档案，不公开。字幕：「مش لازم أحد يسمع」（不需要任何人听到）。',
        cta: '「ابدأ رحلتك الصوتية الليلة」（今晚开始你的声音旅程）',
        targetAudience: '沙特/GCC 女性 16-25，夜猫子，情绪型内容消费者，隐私意识极强',
        platform: 'TikTok（深夜流量高峰 10PM-2AM）',
        difficulty: 'easy',
        status: 'draft'
      },
      {
        week: '2026-W24',
        title: '脚本卡 #5 — 明星歌曲 × UGC 邀请型（H05·Elissa 版）',
        hook: '开场 0.5 秒：Elissa 最新歌曲前奏（「اغمرني هالليلة عيدي」）+ 字幕「هل تعرف هذه الأغنية؟」（你认识这首歌吗？）→ 立即切入 Nagham 搜索界面，展示 Elissa 全曲库。',
        body: '演示搜索 → 选歌 → 一键 K 歌流程（15秒）。结尾放出「最多唱了多少次？」互动提问，引评论。注意：⚠️ Elissa 版权费需提前确认，若版权费用高，可改用 Hamaki 替代（同等热度，中东男性歌手版权更宽松）。',
        cta: '「غنِّ مع إليسا على Nagham」（在 Nagham 和 Elissa 一起唱）',
        targetAudience: '沙特/黎巴嫩/埃及 女性 20-35，Elissa 铁杆粉丝，高收藏/高分享意愿',
        platform: 'TikTok + YouTube Shorts',
        difficulty: 'medium',
        status: 'draft'
      }
    ]
  }
]

// 工具函数
export function getScoreColor(score: number): string {
  if (score >= 7) return 'score-high'
  if (score >= 4) return 'score-mid'
  return 'score-low'
}

export function getDifficultyClass(difficulty: 'easy' | 'medium' | 'hard'): string {
  const map = { easy: 'tag-easy', medium: 'tag-medium', hard: 'tag-hard' }
  return map[difficulty]
}

export function getDifficultyLabel(difficulty: 'easy' | 'medium' | 'hard'): string {
  const map = { easy: '易连接', medium: '中等', hard: '难/红线' }
  return map[difficulty]
}

export function getCategoryColor(cat: CandidateCategory): string {
  const map: Record<CandidateCategory, string> = {
    '热门歌曲': 'text-amber-700 bg-amber-50 border-amber-200',
    '歌手·网红': 'text-purple-700 bg-purple-50 border-purple-200',
    '标签·话题': 'text-blue-700 bg-blue-50 border-blue-200',
  }
  return map[cat]
}
