import { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite';
import { Query } from '@codeflicker/appwrite';
import { DATABASE_ID } from '../types/appwrite';
import { useScripts } from '../hooks/useScripts';
import { useCreateScript } from '../hooks/useCreateScript';
import type { Script, InsightCandidate } from '../types/appwrite';
import { HOOK_LABELS } from '../types/appwrite';
import { FileText, Sparkles, Edit3, Send, CheckCircle } from 'lucide-react';

const STATUS_LABELS: Record<string, string> = { draft: '草稿', ready: '就绪', live: '上线' };
const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  ready: 'bg-blue-100 text-blue-600',
  live: 'bg-green-100 text-green-600'
};

export default function BriefPage() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [tab, setTab] = useState<'all' | 'draft' | 'ready' | 'live'>('all');
  const [candidates, setCandidates] = useState<InsightCandidate[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<InsightCandidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  const { fetchScripts, updateStatus } = useScripts();
  const { createFromCandidate } = useCreateScript();

  const loadScripts = async () => {
    setLoading(true);
    try { const all = await fetchScripts(); setScripts(all); }
    catch (e) { console.error(e); }
    setLoading(false);
  };

  const loadCandidates = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, 'insight_candidates', [
        Query.equal('status', 'selected'),
        Query.orderDesc('score_total'),
        Query.limit(20),
      ]);
      setCandidates(res.documents as unknown as InsightCandidate[]);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { loadScripts(); loadCandidates(); }, []);

  const handleCreateScript = async () => {
    if (!selectedCandidate) return;
    try {
      await createFromCandidate(selectedCandidate);
      setShowCreate(false);
      setSelectedCandidate(null);
      loadScripts();
      loadCandidates();
    } catch (e) { console.error(e); }
  };

  const filtered = tab === 'all' ? scripts : scripts.filter(s => s.status === tab);

  if (editingScript) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">编辑脚本卡</h2>
          <button onClick={() => { setEditingScript(null); loadScripts(); }}
            className="text-sm text-gray-500 hover:text-gray-700">← 返回列表</button>
        </div>
        <ScriptEditor script={editingScript} onSave={() => { setEditingScript(null); loadScripts(); }} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">BRIEF · 素材脚本池</h1>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          <Sparkles size={16} /> 从 INSIGHT 创建
        </button>
      </div>

      {candidates.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-700">⚡ {candidates.length} 个已入选热点待生成脚本</p>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        {(['all', 'draft', 'ready', 'live'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1 rounded-full text-sm ${tab === t ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t === 'all' ? '全部' : STATUS_LABELS[t]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center py-8 text-gray-400">加载中...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FileText size={48} className="mx-auto mb-4 opacity-30" />
          <p>暂无脚本卡</p>
          <p className="text-sm mt-2">从 INSIGHT 入选热点后创建</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(s => (
            <div key={s.$id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[s.status]}`}>
                      {STATUS_LABELS[s.status]}
                    </span>
                    <span className="text-xs text-gray-400">
                      {HOOK_LABELS[s.hook_type as keyof typeof HOOK_LABELS] || s.hook_type}
                    </span>
                    <span className="text-xs text-gray-400">W{s.week}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  {s.hook && <p className="text-sm text-gray-600 mt-1"><span className="text-blue-500">Hook:</span> {s.hook}</p>}
                  {s.body && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{s.body}</p>}
                  {s.cta && <p className="text-sm text-orange-500 mt-1">CTA: {s.cta}</p>}
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => setEditingScript(s)}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded">
                    <Edit3 size={16} />
                  </button>
                  {s.status === 'draft' && (
                    <button onClick={async () => { await updateStatus(s.$id, 'ready'); loadScripts(); }}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded" title="标记就绪">
                      <CheckCircle size={16} />
                    </button>
                  )}
                  {s.status === 'ready' && (
                    <button onClick={async () => { await updateStatus(s.$id, 'live'); loadScripts(); }}
                      className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded" title="上线">
                      <Send size={16} />
                    </button>
                  )}
                </div>
              </div>
              {s.target_audience && (
                <p className="text-xs text-gray-400 mt-2">目标受众: {s.target_audience}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <CreateScriptModal
          candidates={candidates}
          selected={selectedCandidate}
          onSelect={setSelectedCandidate}
          onConfirm={handleCreateScript}
          onCancel={() => { setShowCreate(false); setSelectedCandidate(null); }}
        />
      )}
    </div>
  );
}

function CreateScriptModal({ candidates, selected, onSelect, onConfirm, onCancel }: {
  candidates: InsightCandidate[];
  selected: InsightCandidate | null;
  onSelect: (c: InsightCandidate) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
        <h2 className="text-lg font-bold mb-4">从 INSIGHT 创建脚本</h2>
        {candidates.length === 0 ? (
          <p className="text-gray-400 text-center py-8">暂无入选热点，请先在 INSIGHT 页点选</p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {candidates.map(c => (
              <button key={c.$id} onClick={() => onSelect(c)}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  selected?.$id === c.$id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-xs text-gray-400">
                    {HOOK_LABELS[c.hook_type as keyof typeof HOOK_LABELS] || c.hook_type}
                  </span>
                </div>
                <span className="text-xs text-blue-500">得分 {c.score_total}</span>
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel}
            className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">取消</button>
          <button onClick={onConfirm} disabled={!selected}
            className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed">
            创建脚本
          </button>
        </div>
      </div>
    </div>
  );
}

function ScriptEditor({ script, onSave }: { script: Script; onSave: () => void }) {
  const [form, setForm] = useState({
    title: script.title || '',
    hook: script.hook || '',
    body: script.body || '',
    cta: script.cta || '',
    target_audience: script.target_audience || '',
    difficulty: script.difficulty || 'medium',
  });
  const { updateScript } = useScripts();

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">标题</label>
        <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          className="w-full mt-1 p-2 border rounded-lg" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Hook（前3秒）</label>
        <textarea value={form.hook} onChange={e => setForm(f => ({ ...f, hook: e.target.value }))}
          className="w-full mt-1 p-2 border rounded-lg" rows={2} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Body（主体内容）</label>
        <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
          className="w-full mt-1 p-2 border rounded-lg" rows={4} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">CTA（行动号召）</label>
        <textarea value={form.cta} onChange={e => setForm(f => ({ ...f, cta: e.target.value }))}
          className="w-full mt-1 p-2 border rounded-lg" rows={2} />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">目标受众</label>
        <input value={form.target_audience} onChange={e => setForm(f => ({ ...f, target_audience: e.target.value }))}
          className="w-full mt-1 p-2 border rounded-lg" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">难度</label>
        <select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as any }))}
          className="w-full mt-1 p-2 border rounded-lg">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={async () => { await updateScript(script.$id, form); onSave(); }}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">保存</button>
    </div>
  );
}
