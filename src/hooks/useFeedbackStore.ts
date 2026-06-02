/**
 * 人工反馈持久化 Hook
 * - 未登录：用 localStorage 暂存，写入数据库时静默失败
 * - 已登录：写入 Appwrite feedback 表，刷新后恢复
 */
import { useState, useEffect, useCallback } from 'react'
import { ID, Permission, Role, Query } from '@codeflicker/appwrite'
import { databases, account, DATABASE_ID, FEEDBACK_TABLE_ID } from '@/lib/appwrite'

export type VoteType = 'up' | 'down'

const LS_KEY = 'nagham_feedback'

function loadLocalFeedback(): Record<string, VoteType> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveLocalFeedback(map: Record<string, VoteType>) {
  localStorage.setItem(LS_KEY, JSON.stringify(map))
}

export function useFeedbackStore() {
  const [feedbackMap, setFeedbackMap] = useState<Record<string, VoteType>>(loadLocalFeedback)
  const [userId, setUserId] = useState<string | null>(null)
  // docId map: candidateId -> appwrite $id，用于更新/删除
  const [docIdMap, setDocIdMap] = useState<Record<string, string>>({})

  // 尝试获取当前用户信息（不强制登录）
  useEffect(() => {
    account.get().then(u => setUserId(u.$id)).catch(() => setUserId(null))
  }, [])

  // 已登录后拉取远程反馈
  useEffect(() => {
    if (!userId) return
    databases.listDocuments(DATABASE_ID, FEEDBACK_TABLE_ID, [
      Query.equal('user_id', userId),
      Query.limit(100),
    ]).then(res => {
      const map: Record<string, VoteType> = {}
      const dmap: Record<string, string> = {}
      for (const doc of res.documents) {
        map[doc.candidate_id as string] = doc.vote as VoteType
        dmap[doc.candidate_id as string] = doc.$id
      }
      setFeedbackMap(prev => ({ ...prev, ...map }))
      setDocIdMap(dmap)
    }).catch(() => {})
  }, [userId])

  const vote = useCallback(async (candidateId: string, candidateTitle: string, type: VoteType) => {
    const current = feedbackMap[candidateId]
    const isToggle = current === type // 再次点击同一个 = 取消

    const next = isToggle ? undefined : type
    const newMap = { ...feedbackMap }

    if (isToggle) {
      delete newMap[candidateId]
    } else {
      newMap[candidateId] = type
    }

    setFeedbackMap(newMap)
    saveLocalFeedback(newMap)

    if (!userId) return // 未登录只存本地

    try {
      const existingDocId = docIdMap[candidateId]
      if (isToggle && existingDocId) {
        // 取消投票：删除文档
        await databases.deleteDocument(DATABASE_ID, FEEDBACK_TABLE_ID, existingDocId)
        const nd = { ...docIdMap }
        delete nd[candidateId]
        setDocIdMap(nd)
      } else if (!isToggle) {
        if (existingDocId) {
          // 更新已有文档
          await databases.updateDocument(DATABASE_ID, FEEDBACK_TABLE_ID, existingDocId, {
            vote: type,
            candidate_title: candidateTitle,
          })
        } else {
          // 新建文档
          const docId = ID.unique()
          await databases.createDocument(
            DATABASE_ID,
            FEEDBACK_TABLE_ID,
            docId,
            {
              candidate_id: candidateId,
              candidate_title: candidateTitle,
              vote: type,
              user_id: userId,
              created_at: new Date().toISOString(),
            },
            [
              Permission.read(Role.user(userId)),
              Permission.update(Role.user(userId)),
              Permission.delete(Role.user(userId)),
            ]
          )
          setDocIdMap(prev => ({ ...prev, [candidateId]: docId }))
        }
      }
    } catch (e) {
      console.warn('[Feedback] 写入数据库失败（忽略）', e)
    }
  }, [feedbackMap, userId, docIdMap])

  return { feedbackMap, vote }
}
