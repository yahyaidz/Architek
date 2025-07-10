// src/components/Admin/RecentActivity.tsx
import React from 'react'
import { Clock, MessageSquare, FolderOpen } from 'lucide-react'
import type { DashboardStats } from '../../types/admin'

interface RecentActivityProps {
  activities: DashboardStats['recentActivity']
}

export const RecentActivity: React.FC< RecentActivityProps > = ({ activities }) => {
  const getIcon = (type: 'quote' | 'project') => {
    return type === 'quote' ? MessageSquare : FolderOpen
  }

  const getColor = (type: 'quote' | 'project') => {
    return type === 'quote' ? 'text-blue-400' : 'text-green-400'
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clock size={20} />
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No recent activity</p>
        ) : (
          activities.map((activity) => {
            const Icon = getIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                <div className={`p-2 rounded-full bg-gray-700 ${getColor(activity.type)}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {new Date(activity.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {activity.type}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
