import { useState } from 'react';
import { CheckCircle, XCircle, ExternalLink, TrendingUp, Clock, Music } from 'lucide-react';
import { useInsightCandidates } from '../hooks/useInsightCandidates';
import { useCreateScript } from '../hooks/useCreateScript';
import { HOOK_LABELS } from '../types/appwrite';
import type { InsightCandidate, HookType, InsightStatus } from '../types/appwrite';

function ScoreBreakdown({ candidate }: { candidate: InsightCandidate }) {
  return (
    <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
      <div className="flex flex-col items-center bg-orange-50 rounded p-1.5">
        <TrendingUp className="w-3 h-3 text-orange-400 mb-0.5" />
        <span className="text-orange-600 font-semibold">{candidate.score_heat.toFixed(1)}</span>
        <span className="text-gray-400">热度</span>
      </div>
      <div className="flex flex-col items-center bg-blue-50 rounded p-1.5">
        <Clock className="w-3 h-3 text-blue-400 mb-0.5" />
        <span className="text-blue-600 font-semibold">{candidate.score_freshness.toFixed(1)}</span>
        <span className="text-gray-400">时效</span>
      </div>
      <div className="flex flex-col items-center bg-purple-50 rounded p-1.5">
        <Music className="w-3 h-3 text-purple-400 mb-0.5" />
        <span className="text-purple-600 font-semibold">{candidate.score_relevance.toFixed(1)}</span>
        <span className="text-gray-400">相关度</span>
      </div>
    </div>
  );
}

function CandidateCard({ candidate, onSelect, onReject, creating }: {
  candidate: InsightCandidate;
  onSelect: (c: InsightCandidate) => void;
  onReject: (id: string) => void;
  creating: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const hookLabel = candidate.hook_type ? HOOK_LABELS[candidate.hook_type as HookType] : '—';
  const statusColor: Record<InsightStatus, string> = {
    pending: 'border-gray-200 bg-white',
    selected: 'border-green-300 bg-green-50',
    rejected: 'border-red-200 bg-red-50 opacity-50',
  };
  return (
    <div className={`border rounded-xl p-4 transition-all ${statusColor[candidate.status]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
          {candidate.score_total.toFixed(1)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-gray-900 text-sm truncate">{candidate.title}</span>
            {candidate.hook_type && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 flex-shrink-0">
                {candidate.hook_type}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2 flex-wrap">
            <span className="px-1.5 py-0.5 bg-gray-100 rounded">{candidate.category || candidate.source}</span>
            <span>{hookLabel}</span>
            {candidate.content_url && (
              <a href={candidate.content_url} target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-0.5">
                <ExternalLink className="w-3 h-3" />来源
              </a>
            )}
          </div>
        </div>
        {candidate.status === 'pending' && (
          <div className="flex flex-col gap-1.5 flex-shrink-0">
            <button onClick={() => onSelect(candidate)} disabled={creating}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors disabled:opacity-50">
              <CheckCircle className="w-3.5 h-3.5" />进入脚本池
            </button>
            <button onClick={() => onReject(candidate.$id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 text-xs rounded-lg transition-colors">
              <XCircle className="w-3.5 h-3.5" />跳过
            </button>
          </div>
        )}
        {candidate.status === 'selected' && <span className="text-green-600 text-xs font-medium flex-shrink-0">✓ 已选</span>}
        {candidate.status === 'rejected' && <span className="text-gray-400 text-xs flex-shrink-0">已跳过</span>}
      </div>
      <button onClick={() => setExpanded(v => !v)} className="mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
        {expanded ? '▲ 收起评分详情' : '▼ 查看评分详情'}
      </button>
      {expanded && <ScoreBreakdown candidate={candidate} />}
    </div>
  );
}

type FilterTab = 'pending' | 'selected' | 'all';

export default function InsightPage() {
  const [tab, setTab] = useState<FilterTab>('pending');
  const statusFilter = tab === 'all' ? undefined : tab as InsightStatus;
  const { candidates, loading, error, refetch, updateStatus } = useInsightCandidates(statusFilter);
  const { createFromCandidate, loading: creating } = useCreateScript();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSelect = async (candidate: InsightCandidate) => {
    try {
      await createFromCandidate(candidate);
      showToast(`「${candidate.title}」已加入脚本池 ✓`);
    } catch (e: any) {
      showToast(`操作失败：${e.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">INSIGHT</h1>
        <p className="text-gray-500 text-sm">AI 评分的 KSA 热点素材候选，按综合得分排序</p>
      </div>
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1">
        {(['pending', 'selected', 'all'] as FilterTab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 text-sm py-1.5 rounded-md transition-colors font-medium ${tab === t ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            {t === 'pending' ? '待处理' : t === 'selected' ? '已选' : '全部'}
          </button>
        ))}
      </div>
      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <div className="animate-spin w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full mr-3" />加载中...
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          <p className="font-medium mb-1">数据加载失败</p>
          <p className="text-red-400">{error}</p>
          <button onClick={refetch} className="mt-2 text-red-500 underline text-xs">重试</button>
        </div>
      )}
      {!loading && !error && candidates.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium">暂无候选热点</p>
          <p className="text-sm mt-1">{tab === 'pending' ? 'RADAR 数据采集后会自动出现' : '没有符合筛选条件的记录'}</p>
        </div>
      )}
      {!loading && !error && candidates.length > 0 && (
        <div className="space-y-3">
          {candidates.map(c => (
            <CandidateCard key={c.$id} candidate={c} onSelect={handleSelect}
              onReject={(id) => updateStatus(id, 'rejected')} creating={creating} />
          ))}
        </div>
      )}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
