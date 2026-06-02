import { useEffect, useState, useCallback } from 'react';
import { databases } from '../lib/appwrite';
import { Query } from '@codeflicker/appwrite';
import type { InsightCandidate, InsightStatus } from '../types/appwrite';

const DATABASE_ID = 'naghamdb';
const COLLECTION_ID = 'insight_candidates';

export function useInsightCandidates(statusFilter?: InsightStatus) {
  const [candidates, setCandidates] = useState<InsightCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queries = [Query.orderDesc('score_total'), Query.limit(50)];
      if (statusFilter) queries.push(Query.equal('status', statusFilter));
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
      setCandidates(res.documents as unknown as InsightCandidate[]);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateStatus = useCallback(async (id: string, status: InsightStatus) => {
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, { status });
    setCandidates(prev => prev.map(c => c.$id === id ? { ...c, status } : c));
  }, []);

  return { candidates, loading, error, refetch: fetchData, updateStatus };
}
