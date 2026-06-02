export type SignalSource = 'google_trends' | 'tiktok_hashtag' | 'tiktok_music' | 'youtube_trending';
export type HookType = 'H01' | 'H02' | 'H03' | 'H04' | 'H05' | 'H06' | 'H07';
export type InsightStatus = 'pending' | 'selected' | 'rejected';
export type ScriptStatus = 'draft' | 'ready' | 'live';
export type Difficulty = 'easy' | 'medium' | 'hard';

export const HOOK_LABELS: Record<HookType, string> = {
  H01: '阿语歌词字幕型',
  H02: 'Duet / 合唱邀请型',
  H03: '在家K歌演示型',
  H04: '情侣/朋友合唱型',
  H05: '明星歌曲封面型',
  H06: '节日借势型',
  H07: '深夜私密独唱型',
};

export interface RadarSignal {
  $id: string;
  source: SignalSource;
  keyword: string;
  heat_score: number;
  content_url?: string;
  content_title?: string;
  published_at?: string;
  crawled_at: string;
}

export interface InsightCandidate {
  $id: string;
  signal_ids?: string;
  title: string;
  category?: string;
  hook_type?: HookType;
  score_total: number;
  score_heat: number;
  score_freshness: number;
  score_relevance: number;
  audience_gender?: string;
  audience_age?: string;
  audience_note?: string;
  status: InsightStatus;
  source?: string;
  content_url?: string;
  $createdAt: string;
}

export interface Script {
  $id: string;
  candidate_id?: string;
  week?: string;
  title: string;
  hook?: string;
  body?: string;
  cta?: string;
  target_audience?: string;
  platform?: string;
  hook_type?: HookType;
  difficulty: Difficulty;
  status: ScriptStatus;
  asset_name?: string;
  ref_videos?: string;
  $createdAt: string;
}
