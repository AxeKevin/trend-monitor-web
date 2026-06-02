// Google Trends KSA 关键词热度时序数据
// 数据来源：Google Trends SA，过去 12 个月（2025-06 ～ 2026-05），周粒度
// 数据采集时间：2026-06-02

export interface TrendDataPoint {
  week: string    // YYYY-MM-DD（周起始日）
  aghani: number  // اغاني（歌曲）
  karaoke: number // karaoke（英文）
  ghina: number   // غناء（歌唱）
}

// 完整 52 周数据（اغاني 平均77，karaoke 平均4，غناء 平均3，كاراوكي 全为0忽略）
export const TRENDS_DATA: TrendDataPoint[] = [
  { week: '2025-06-01', aghani: 94, karaoke: 3, ghina: 2 },
  { week: '2025-06-08', aghani: 98, karaoke: 4, ghina: 3 },
  { week: '2025-06-15', aghani: 75, karaoke: 4, ghina: 2 },
  { week: '2025-06-22', aghani: 75, karaoke: 5, ghina: 1 },
  { week: '2025-06-29', aghani: 83, karaoke: 3, ghina: 2 },
  { week: '2025-07-06', aghani: 92, karaoke: 3, ghina: 3 },
  { week: '2025-07-13', aghani: 91, karaoke: 4, ghina: 3 },
  { week: '2025-07-20', aghani: 90, karaoke: 3, ghina: 3 },
  { week: '2025-07-27', aghani: 91, karaoke: 4, ghina: 3 },
  { week: '2025-08-03', aghani: 94, karaoke: 4, ghina: 3 },
  { week: '2025-08-10', aghani: 83, karaoke: 4, ghina: 3 },
  { week: '2025-08-17', aghani: 82, karaoke: 4, ghina: 3 },
  { week: '2025-08-24', aghani: 74, karaoke: 3, ghina: 2 },
  { week: '2025-08-31', aghani: 72, karaoke: 3, ghina: 3 },
  { week: '2025-09-07', aghani: 74, karaoke: 3, ghina: 3 },
  { week: '2025-09-14', aghani: 70, karaoke: 2, ghina: 2 },
  { week: '2025-09-21', aghani: 100, karaoke: 2, ghina: 2 },  // 沙特国庆日峰值
  { week: '2025-09-28', aghani: 75, karaoke: 3, ghina: 3 },
  { week: '2025-10-05', aghani: 78, karaoke: 2, ghina: 4 },
  { week: '2025-10-12', aghani: 74, karaoke: 3, ghina: 3 },
  { week: '2025-10-19', aghani: 72, karaoke: 3, ghina: 3 },
  { week: '2025-10-26', aghani: 71, karaoke: 3, ghina: 3 },
  { week: '2025-11-02', aghani: 75, karaoke: 3, ghina: 3 },
  { week: '2025-11-09', aghani: 78, karaoke: 4, ghina: 3 },
  { week: '2025-11-16', aghani: 83, karaoke: 4, ghina: 3 },
  { week: '2025-11-23', aghani: 88, karaoke: 4, ghina: 2 },
  { week: '2025-11-30', aghani: 76, karaoke: 5, ghina: 3 },
  { week: '2025-12-07', aghani: 75, karaoke: 5, ghina: 3 },
  { week: '2025-12-14', aghani: 71, karaoke: 5, ghina: 3 },
  { week: '2025-12-21', aghani: 73, karaoke: 4, ghina: 4 },
  { week: '2025-12-28', aghani: 73, karaoke: 3, ghina: 3 },
  { week: '2026-01-04', aghani: 75, karaoke: 2, ghina: 3 },
  { week: '2026-01-11', aghani: 81, karaoke: 4, ghina: 3 },
  { week: '2026-01-18', aghani: 71, karaoke: 3, ghina: 3 },
  { week: '2026-01-25', aghani: 68, karaoke: 4, ghina: 2 },
  { week: '2026-02-01', aghani: 73, karaoke: 4, ghina: 2 },
  { week: '2026-02-08', aghani: 69, karaoke: 6, ghina: 2 },   // karaoke 年度峰值
  { week: '2026-02-15', aghani: 51, karaoke: 4, ghina: 2 },
  { week: '2026-02-22', aghani: 39, karaoke: 5, ghina: 2 },
  { week: '2026-03-01', aghani: 38, karaoke: 3, ghina: 2 },   // 斋月前低谷
  { week: '2026-03-08', aghani: 40, karaoke: 2, ghina: 1 },
  { week: '2026-03-15', aghani: 88, karaoke: 4, ghina: 3 },   // 斋月开始急反弹
  { week: '2026-03-22', aghani: 99, karaoke: 3, ghina: 3 },   // 斋月峰值
  { week: '2026-03-29', aghani: 75, karaoke: 4, ghina: 2 },
  { week: '2026-04-05', aghani: 75, karaoke: 4, ghina: 2 },
  { week: '2026-04-12', aghani: 79, karaoke: 3, ghina: 2 },
  { week: '2026-04-19', aghani: 75, karaoke: 4, ghina: 4 },
  { week: '2026-04-26', aghani: 77, karaoke: 4, ghina: 2 },
  { week: '2026-05-03', aghani: 84, karaoke: 4, ghina: 3 },
  { week: '2026-05-10', aghani: 80, karaoke: 3, ghina: 2 },
  { week: '2026-05-17', aghani: 68, karaoke: 3, ghina: 2 },
  { week: '2026-05-24', aghani: 98, karaoke: 4, ghina: 2 },   // 开斋节余热
  { week: '2026-05-31', aghani: 89, karaoke: 2, ghina: 2 },
]

// 重要节点标注
export const TREND_EVENTS = [
  { week: '2025-09-21', label: '沙特国庆', color: 'oklch(0.55 0.14 75)' },
  { week: '2026-02-08', label: 'karaoke年度峰值', color: 'oklch(0.50 0.15 250)' },
  { week: '2026-03-01', label: '斋月前低谷', color: 'oklch(0.55 0.12 0)' },
  { week: '2026-03-22', label: '斋月峰值', color: 'oklch(0.45 0.15 150)' },
  { week: '2026-05-24', label: '开斋节余热', color: 'oklch(0.55 0.14 75)' },
]
