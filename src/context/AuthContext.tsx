/**
 * Auth Context — 快手 SSO 登录态管理
 * 仅在 Appwrite 配置的项目下使用，非强制，未登录照常浏览
 */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { handleOAuth2Token, OAuthProvider } from '@codeflicker/appwrite'
import { account, client } from '@/lib/appwrite'

interface AuthUser {
  $id: string
  name: string
  email: string
}

interface AuthCtx {
  user: AuthUser | null
  loading: boolean
  login: () => void
  logout: () => Promise<void>
}

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      await handleOAuth2Token(client)
    } catch (_) {}

    try {
      const u = await account.get()
      setUser({ $id: u.$id, name: u.name, email: u.email })
    } catch (_) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  function login() {
    account.createOAuth2Session({
      provider: OAuthProvider.Kuaishou,
      success: window.location.origin + window.location.pathname,
      failure: window.location.origin + window.location.pathname,
    })
  }

  async function logout() {
    try {
      await account.deleteSession('current')
    } catch (_) {}
    setUser(null)
  }

  return <Ctx.Provider value={{ user, loading, login, logout }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
