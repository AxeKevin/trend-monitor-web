import { Outlet, NavLink, useLocation } from 'react-router'
import { useAuth } from '@/context/AuthContext'

const navItems = [
  { path: '/radar',    label: 'RADAR',    sub: '热词信号' },
  { path: '/insight',  label: 'INSIGHT',  sub: '候选热点' },
  { path: '/brief',    label: 'BRIEF',    sub: '脚本卡' },
  { path: '/intel',    label: 'INTEL',    sub: '情报台' },
  { path: '/feedback', label: 'FEEDBACK', sub: '数据回路' },
  { path: '/readme',   label: 'README',   sub: '使用指南' },
]

export default function Layout() {
  const location = useLocation()
  const { user, loading, login, logout } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="3" fill="white" />
                <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground tracking-tight leading-none">
                Nagham 市场情报
              </div>
              <div className="font-mono-display text-[10px] text-muted-foreground tracking-wider mt-0.5">
                KSA Trend Monitor
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    px-3 py-2 rounded-md text-xs font-medium transition-all
                    ${isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <span className="block font-mono-display tracking-wider">{item.label}</span>
                  <span className="block text-[9px] opacity-70">{item.sub}</span>
                </NavLink>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="status-dot warning" />
              <span className="font-mono-display text-[10px] tracking-wider">WEEK 1 · 脚本卡产出中</span>
            </div>
            <div className="w-px h-3 bg-border" />
            {loading ? (
              <span className="text-[10px] text-muted-foreground font-mono-display">...</span>
            ) : user ? (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-[10px] font-mono-display text-muted-foreground hover:text-foreground transition-colors"
                title="退出登录"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                <span className="max-w-[80px] truncate">{user.name || user.email.split('@')[0]}</span>
              </button>
            ) : (
              <button
                onClick={login}
                className="text-[10px] font-mono-display px-2.5 py-1 rounded border border-border hover:border-primary/50 hover:text-primary transition-colors"
              >
                快手登录
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border py-3 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <span className="font-mono-display text-[10px] text-muted-foreground">
            Nagham KSA Trend Monitor v2.0
          </span>
          <span className="font-mono-display text-[10px] text-muted-foreground">
            本地编辑 → git push → 自动更新
          </span>
        </div>
      </footer>
    </div>
  )
}
