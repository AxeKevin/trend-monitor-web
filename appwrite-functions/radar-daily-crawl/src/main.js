import { Client, Databases, ID } from 'node-appwrite';

const DATABASE_ID = 'naghamdb';
const COLLECTION_ID = 'radar_signals';

function log(msg) { console.log(`[radar-daily-crawl] ${new Date().toISOString()} ${msg}`); }

async function fetchGoogleTrends() {
  const signals = [];
  try {
    const url = 'https://trends.google.com/trends/api/dailytrends?hl=ar&tz=-180&geo=SA&ns=15';
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'ar,en;q=0.9' } });
    const text = await res.text();
    const json = JSON.parse(text.replace(/^\)\]\}'\n/, ''));
    const searches = json?.default?.trendingSearchesDays?.[0]?.trendingSearches || [];
    for (const item of searches.slice(0, 25)) {
      const keyword = item.title?.query || '';
      const rawScore = parseInt(item.formattedTraffic?.replace(/[^0-9]/g, '') || '0');
      signals.push({
        source: 'google_trends', keyword,
        heat_score: Math.min(10, rawScore / 100000),
        content_url: `https://trends.google.com/trends/explore?geo=SA&q=${encodeURIComponent(keyword)}`,
        content_title: item.articles?.[0]?.title || keyword,
        published_at: new Date().toISOString(),
        crawled_at: new Date().toISOString(),
      });
    }
    log(`Google Trends: ${signals.length} signals`);
  } catch (err) { log(`Google Trends error: ${err.message}`); }
  return signals;
}

async function fetchTikTokCreativeCenter() {
  const signals = [];
  try {
    const hashtagRes = await fetch(
      'https://ads.tiktok.com/creative_radar_api/v1/popular_trend/hashtag/list?period=7&country_code=SA&page=1&limit=20',
      { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://ads.tiktok.com/business/creativecenter/hashtag/pc/en' } }
    );
    if (hashtagRes.ok) {
      const data = await hashtagRes.json();
      for (const tag of (data?.data?.list || [])) {
        signals.push({
          source: 'tiktok_hashtag',
          keyword: tag.hashtag_name || tag.id,
          heat_score: Math.min(10, (tag.publish_cnt || 0) / 1000000),
          content_url: `https://www.tiktok.com/tag/${tag.hashtag_name}`,
          content_title: `#${tag.hashtag_name}`,
          published_at: new Date().toISOString(),
          crawled_at: new Date().toISOString(),
        });
      }
    }
    const musicRes = await fetch(
      'https://ads.tiktok.com/creative_radar_api/v1/popular_trend/music/list?period=7&country_code=SA&page=1&limit=20',
      { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://ads.tiktok.com/business/creativecenter/music/pc/en' } }
    );
    if (musicRes.ok) {
      const data = await musicRes.json();
      for (const song of (data?.data?.list || [])) {
        signals.push({
          source: 'tiktok_music',
          keyword: `${song.song_name} - ${song.author}`,
          heat_score: Math.min(10, (song.clip_count || 0) / 500000),
          content_url: song.link || '',
          content_title: `${song.song_name} by ${song.author}`,
          published_at: new Date().toISOString(),
          crawled_at: new Date().toISOString(),
        });
      }
    }
    log(`TikTok: ${signals.length} signals`);
  } catch (err) { log(`TikTok error: ${err.message}`); }
  return signals;
}

async function fetchYouTubeTrending() {
  const signals = [];
  const API_KEY = process.env.YOUTUBE_API_KEY;
  if (!API_KEY) { log('YouTube: YOUTUBE_API_KEY not set, skipping'); return signals; }
  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=SA&videoCategoryId=10&maxResults=20&key=${API_KEY}`);
    const data = await res.json();
    for (const item of (data.items || [])) {
      const viewCount = parseInt(item.statistics?.viewCount || '0');
      signals.push({
        source: 'youtube_trending',
        keyword: item.snippet?.title || '',
        heat_score: Math.min(10, viewCount / 1000000),
        content_url: `https://www.youtube.com/watch?v=${item.id}`,
        content_title: item.snippet?.title || '',
        published_at: item.snippet?.publishedAt || new Date().toISOString(),
        crawled_at: new Date().toISOString(),
      });
    }
    log(`YouTube: ${signals.length} signals`);
  } catch (err) { log(`YouTube error: ${err.message}`); }
  return signals;
}

export default async ({ req, res, log: appLog }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const db = new Databases(client);

  const [trendSignals, tiktokSignals, ytSignals] = await Promise.all([
    fetchGoogleTrends(), fetchTikTokCreativeCenter(), fetchYouTubeTrending(),
  ]);
  const all = [...trendSignals, ...tiktokSignals, ...ytSignals];
  appLog(`Total: ${all.length} signals`);

  let saved = 0;
  for (const s of all) {
    try { await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), s); saved++; }
    catch (e) { appLog(`Save error: ${e.message}`); }
  }

  return res.json({ ok: true, total: all.length, saved });
};
