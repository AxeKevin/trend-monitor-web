import { Client, Databases, ID, Query } from 'node-appwrite';

const DATABASE_ID = 'naghamdb';
const MUSIC_KW = ['song','music','sing','vocal','album','أغنية','موسيقى','غناء'];
const SEASONAL_KW = ['ramadan','eid','رمضان','عيد','holiday','love','حب'];
const CELEB_KW = ['محمد عبده','رابح صقر','فيروز','star','نجم'];

function classifyHookType(keyword, title) {
  const t = `${keyword} ${title}`.toLowerCase();
  if (/lyrics|كلمات|subtitle|مترجم/.test(t)) return 'H01';
  if (/duet|ثنائي|karaoke|كاريوكي/.test(t)) return 'H02';
  if (/app|تطبيق|demo|home|بيت/.test(t)) return 'H03';
  if (/couple|زوج|friend|صديق|love|حب/.test(t)) return 'H04';
  if (CELEB_KW.some(k => t.includes(k.toLowerCase()))) return 'H05';
  if (/رمضان|ramadan|عيد|eid|celebration/.test(t)) return 'H06';
  if (/night|ليل|alone|وحيد|midnight/.test(t)) return 'H07';
  return 'H03';
}

function calcScores(signal) {
  const score_heat = Math.min(10, signal.heat_score);
  const days = (Date.now() - new Date(signal.published_at || Date.now()).getTime()) / 86400000;
  const fm = days <= 7 ? 1.0 : days <= 14 ? 0.8 : days <= 30 ? 0.6 : 0.4;
  const score_freshness = fm * 10;
  const text = `${signal.keyword} ${signal.content_title || ''}`.toLowerCase();
  let score_relevance = 4;
  if (MUSIC_KW.some(k => text.includes(k.toLowerCase()))) score_relevance = 10;
  else if (SEASONAL_KW.some(k => text.includes(k.toLowerCase()))) score_relevance = 7;
  else if (CELEB_KW.some(k => text.includes(k.toLowerCase()))) score_relevance = 7;
  if (score_relevance < 2) return null;
  const score_total = Math.round((score_heat * 0.4 + score_freshness * 0.3 + score_relevance * 0.3) * 10) / 10;
  return { score_heat, score_freshness, score_relevance, score_total, hook_type: classifyHookType(signal.keyword, signal.content_title || '') };
}

export default async ({ req, res, log }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const db = new Databases(client);

  let signals = [];
  if (req.body && req.body.$id) {
    signals = [req.body];
  } else {
    const today = new Date(); today.setHours(0,0,0,0);
    const r = await db.listDocuments(DATABASE_ID, 'radar_signals', [
      Query.greaterThan('crawled_at', today.toISOString()), Query.limit(100),
    ]);
    signals = r.documents;
  }
  log(`Processing ${signals.length} signals`);

  let created = 0, skipped = 0;
  for (const signal of signals) {
    const scores = calcScores(signal);
    if (!scores) { skipped++; continue; }
    const dup = await db.listDocuments(DATABASE_ID, 'insight_candidates', [
      Query.equal('title', signal.keyword), Query.limit(1),
    ]);
    if (dup.total > 0) { skipped++; continue; }
    await db.createDocument(DATABASE_ID, 'insight_candidates', ID.unique(), {
      signal_ids: JSON.stringify([signal.$id]),
      title: signal.keyword,
      category: signal.source === 'tiktok_music' ? '热门歌曲' : signal.source === 'tiktok_hashtag' ? '标签话题' : signal.source === 'youtube_trending' ? '热门视频' : 'Google热词',
      hook_type: scores.hook_type,
      score_total: scores.score_total,
      score_heat: scores.score_heat,
      score_freshness: scores.score_freshness,
      score_relevance: scores.score_relevance,
      source: signal.source,
      content_url: signal.content_url || '',
      status: 'pending',
    });
    created++;
  }
  return res.json({ ok: true, created, skipped });
};
