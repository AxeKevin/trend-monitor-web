import { Client, Databases, Permission, Role } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject('naghamtrenddb')
  .setKey(process.env.APPWRITE_API_KEY);

const db = new Databases(client);
const DATABASE_ID = 'naghamdb';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function createCollectionSafe(id, name) {
  try { await db.deleteCollection(DATABASE_ID, id); await sleep(2000); } catch (_) {}
  return db.createCollection(DATABASE_ID, id, name, [
    Permission.read(Role.users()),
    Permission.create(Role.users()),
    Permission.update(Role.users()),
    Permission.delete(Role.users()),
  ]);
}

async function main() {
  console.log('Creating radar_signals...');
  await createCollectionSafe('radar_signals', 'RADAR Signals');
  await sleep(1000);
  await db.createStringAttribute(DATABASE_ID, 'radar_signals', 'source', 64, true); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'radar_signals', 'keyword', 256, true); await sleep(500);
  await db.createFloatAttribute(DATABASE_ID, 'radar_signals', 'heat_score', true); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'radar_signals', 'content_url', 2048, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'radar_signals', 'content_title', 512, false); await sleep(500);
  await db.createDatetimeAttribute(DATABASE_ID, 'radar_signals', 'published_at', false); await sleep(500);
  await db.createDatetimeAttribute(DATABASE_ID, 'radar_signals', 'crawled_at', true); await sleep(500);
  console.log('✓ radar_signals done');

  console.log('Creating insight_candidates...');
  await createCollectionSafe('insight_candidates', 'INSIGHT Candidates');
  await sleep(1000);
  await db.createStringAttribute(DATABASE_ID, 'insight_candidates', 'signal_ids', 65535, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'insight_candidates', 'title', 512, true); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'insight_candidates', 'category', 64, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'insight_candidates', 'hook_type', 8, false); await sleep(500);
  await db.createFloatAttribute(DATABASE_ID, 'insight_candidates', 'score_total', true); await sleep(500);
  await db.createFloatAttribute(DATABASE_ID, 'insight_candidates', 'score_heat', true); await sleep(500);
  await db.createFloatAttribute(DATABASE_ID, 'insight_candidates', 'score_freshness', true); await sleep(500);
  await db.createFloatAttribute(DATABASE_ID, 'insight_candidates', 'score_relevance', true); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'insight_candidates', 'audience_gender', 16, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'insight_candidates', 'audience_age', 32, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'insight_candidates', 'audience_note', 512, false); await sleep(500);
  await db.createEnumAttribute(DATABASE_ID, 'insight_candidates', 'status', ['pending','selected','rejected'], false, 'pending'); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'insight_candidates', 'source', 64, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'insight_candidates', 'content_url', 2048, false); await sleep(500);
  console.log('✓ insight_candidates done');

  console.log('Creating scripts...');
  await createCollectionSafe('scripts', 'BRIEF Scripts');
  await sleep(1000);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'candidate_id', 64, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'week', 16, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'title', 256, true); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'hook', 1024, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'body', 4096, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'cta', 512, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'target_audience', 512, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'platform', 64, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'hook_type', 8, false); await sleep(500);
  await db.createEnumAttribute(DATABASE_ID, 'scripts', 'difficulty', ['easy','medium','hard'], false, 'medium'); await sleep(500);
  await db.createEnumAttribute(DATABASE_ID, 'scripts', 'status', ['draft','ready','live'], false, 'draft'); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'asset_name', 256, false); await sleep(500);
  await db.createStringAttribute(DATABASE_ID, 'scripts', 'ref_videos', 65535, false); await sleep(500);
  console.log('✓ scripts done');
  console.log('\n🎉 All tables created!');
}

main().catch(console.error);
