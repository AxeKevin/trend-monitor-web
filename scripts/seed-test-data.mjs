import { Client, Databases, ID } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject('naghamtrenddb')
  .setKey(process.env.APPWRITE_API_KEY);

const db = new Databases(client);

const items = [
  { title: 'يا طيرة طيري - محمد عبده', category: '热门歌曲', hook_type: 'H05', score_total: 8.5, score_heat: 9.0, score_freshness: 8.0, score_relevance: 8.5, source: 'tiktok_music', content_url: 'https://www.tiktok.com', status: 'pending', signal_ids: '[]' },
  { title: '#رمضان_كريم', category: '标签话题', hook_type: 'H06', score_total: 7.8, score_heat: 8.0, score_freshness: 7.5, score_relevance: 8.0, source: 'tiktok_hashtag', content_url: 'https://www.tiktok.com', status: 'pending', signal_ids: '[]' },
  { title: 'تحدي الغناء في البيت', category: '热门视频', hook_type: 'H03', score_total: 6.9, score_heat: 7.0, score_freshness: 6.5, score_relevance: 7.2, source: 'youtube_trending', content_url: 'https://youtube.com', status: 'pending', signal_ids: '[]' },
  { title: 'اغاني حب 2024', category: 'Google热词', hook_type: 'H04', score_total: 6.2, score_heat: 6.5, score_freshness: 6.0, score_relevance: 6.1, source: 'google_trends', content_url: 'https://trends.google.com', status: 'pending', signal_ids: '[]' },
];

Promise.all(items.map(i => db.createDocument('naghamdb', 'insight_candidates', ID.unique(), i)))
  .then(() => console.log('✅ 4条测试数据插入成功'))
  .catch(e => console.error(e.message));
