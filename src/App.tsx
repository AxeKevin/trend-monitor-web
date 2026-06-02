import { Routes, Route, Navigate } from 'react-router'
import Layout from '@/components/Layout'
import RadarPage from '@/pages/RadarPage'
import InsightPage from '@/pages/InsightPage'
import BriefPage from '@/pages/BriefPage'
import DashboardPage from '@/pages/DashboardPage'
import FeedbackPage from '@/pages/FeedbackPage'
import ReadmePage from '@/pages/ReadmePage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/insight" replace />} />
        <Route path="/radar"    element={<RadarPage />} />
        <Route path="/insight"  element={<InsightPage />} />
        <Route path="/brief"    element={<BriefPage />} />
        <Route path="/intel"    element={<DashboardPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/readme"   element={<ReadmePage />} />
        {/* 兼容旧路径 */}
        <Route path="/daily"    element={<Navigate to="/insight" replace />} />
        <Route path="/weekly"   element={<Navigate to="/brief" replace />} />
        <Route path="/dashboard" element={<Navigate to="/intel" replace />} />
      </Route>
    </Routes>
  )
}

export default App
