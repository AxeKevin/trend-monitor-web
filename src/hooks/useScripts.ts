import { databases } from '../lib/appwrite';
import { Query } from '@codeflicker/appwrite';
import { DATABASE_ID } from '../types/appwrite';
import type { Script } from '../types/appwrite';

export function useScripts() {
  const fetchScripts = async (week?: string): Promise<Script[]> => {
    const queries: string[] = [Query.orderDesc('$createdAt')];
    if (week) queries.push(Query.equal('week', week));
    const res = await databases.listDocuments(DATABASE_ID, 'scripts', queries);
    return res.documents as unknown as Script[];
  };

  const updateStatus = async (id: string, status: 'draft' | 'ready' | 'live') => {
    return databases.updateDocument(DATABASE_ID, 'scripts', id, { status });
  };

  const updateScript = async (id: string, data: Partial<Script>) => {
    return databases.updateDocument(DATABASE_ID, 'scripts', id, data);
  };

  return { fetchScripts, updateStatus, updateScript };
}
