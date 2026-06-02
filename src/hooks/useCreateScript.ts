import { useCallback, useState } from 'react';
import { databases } from '../lib/appwrite';
import { ID } from '@codeflicker/appwrite';
import type { InsightCandidate, Script } from '../types/appwrite';

const DATABASE_ID = 'naghamdb';

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function useCreateScript() {
  const [loading, setLoading] = useState(false);

  const createFromCandidate = useCallback(async (candidate: InsightCandidate): Promise<Script> => {
    setLoading(true);
    try {
      const now = new Date();
      const week = `${now.getFullYear()}-W${String(getISOWeek(now)).padStart(2, '0')}`;
      const doc = await databases.createDocument(DATABASE_ID, 'scripts', ID.unique(), {
        candidate_id: candidate.$id,
        week,
        title: candidate.title,
        hook: '',
        body: '',
        cta: '',
        hook_type: candidate.hook_type || 'H03',
        status: 'draft',
        difficulty: 'medium',
      });
      await databases.updateDocument(DATABASE_ID, 'insight_candidates', candidate.$id, { status: 'selected' });
      return doc as unknown as Script;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createFromCandidate, loading };
}
