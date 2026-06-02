import { useState, useEffect, useCallback } from 'react';
import { databases } from '../lib/appwrite';
import { Query } from '@codeflicker/appwrite';
import { DATABASE_ID } from '../types/appwrite';
import type { InsightCandidate, InsightStatus } from '../types/appwrite';

export function useInsightCandidates(status?: InsightStatus) {
  const [candidates, setCandidates] = useState<InsightCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queries: string[] = [
        Query.orderDesc('score_total'),
        Query.limit(50),
      ];
      if (status) queries.push(Query.equal('status', status));
      const res = await databases.listDocuments(DATABASE_ID, 'insight_candidates', queries);
      setCandidates(res.documents as unknown as InsightCandidate[]);
    } catch (e: any) {
      setError(e.message || '加载失败');
    }
    setLoading(false);
  }, [status]);

  useEffect(() => { fetchCandidates(); }, [fetchCandidates]);

  const updateStatus = async (id: string, newStatus: InsightStatus) => {
    await databases.updateDocument(DATABASE_ID, 'insight_candidates', id, { status: newStatus });
    await fetchCandidates();
  };

  return { candidates, loading, error, refetch: fetchCandidates, updateStatus };
}
