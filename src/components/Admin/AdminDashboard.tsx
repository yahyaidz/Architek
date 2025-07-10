// src/components/Admin/AdminDashboard.tsx
import React, { useState } from 'react'
import { 
  BarChart3, 
  Users, 
  FolderOpen, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react'
import { useAdmin } from '../../hooks/useAdmin'
import { StatsCard } from './StatsCard'
import { QuotesTable } from './QuotesTable'
import { ProjectsTable } from './ProjectsTable'
import { RecentActivity } from './RecentActivity'

type TabType = 'dashboard' | 'quotes' | 'projects'

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState< TabType >('dashboard')
  const { stats, quotes, projects, loading, error, updateQuoteStatus, updateProject, convertQuoteToProject } = useAdmin()

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <div className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="mt-4">
            <div className="flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'quotes', label: 'Quotes', icon: Users },
                { id: 'projects', label: 'Projects', icon: FolderOpen }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as TabType)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <StatsCard
                title="Total Quotes"
                value={stats?.quotes.total || 0}
                subtitle={`${stats?.quotes.thisMonth || 0} this month`}
                icon={Users}
                color="blue"
              />
              <StatsCard
                title="Active Projects"
                value={stats?.projects.inProgress || 0}
                subtitle={`${stats?.projects.total || 0} total`}
                icon={FolderOpen}
                color="green"
              />
              <StatsCard
                title="Pending Quotes"
                value={stats?.quotes.pending || 0}
                subtitle="Need attention"
                icon={Clock}
                color="yellow"
              />
              <StatsCard
                title="Paid Projects"
                value={stats?.projects.paid || 0}
                subtitle="Completed & paid"
                icon={CheckCircle}
                color="green"
              />
              <StatsCard
                title="Total Revenue"
                value={`€${(stats?.projects.totalRevenue || 0).toLocaleString()}`}
                subtitle="From all projects"
                icon={DollarSign}
                color="purple"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quotes Status Chart */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quotes Status</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Pending', value: stats?.quotes.pending || 0, color: 'bg-yellow-500' },
                    { label: 'Contacted', value: stats?.quotes.contacted || 0, color: 'bg-blue-500' },
                    { label: 'Approved', value: stats?.quotes.approved || 0, color: 'bg-green-500' },
                    { label: 'Rejected', value: stats?.quotes.rejected || 0, color: 'bg-red-500' }
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${color}`} />
                        <span className="text-gray-300">{label}</span>
                      </div>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Status Chart */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Projects Status</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Planning', value: stats?.projects.planning || 0, color: 'bg-blue-500' },
                    { label: 'In Progress', value: stats?.projects.inProgress || 0, color: 'bg-yellow-500' },
                    { label: 'Completed', value: stats?.projects.completed || 0, color: 'bg-green-500' },
                    { label: 'On Hold', value: stats?.projects.onHold || 0, color: 'bg-red-500' },
                    { label: 'Paid', value: stats?.projects.paid || 0, color: 'bg-emerald-500' }
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${color}`} />
                        <span className="text-gray-300">{label}</span>
                      </div>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <RecentActivity activities={stats?.recentActivity || []} />
          </div>
        )}

        {activeTab === 'quotes' && (
          <QuotesTable 
            quotes={quotes} 
            onUpdateStatus={updateQuoteStatus}
            onConvertToProject={convertQuoteToProject}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsTable 
            projects={projects} 
            onUpdateProject={updateProject}
          />
        )}
      </main>
    </div>
  )
}
