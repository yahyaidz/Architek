// src/components/Admin/StatsCard.tsx
import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red'
}

const colorClasses = {
  blue: 'bg-blue-500/20 text-blue-400',
  green: 'bg-green-500/20 text-green-400',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  purple: 'bg-purple-500/20 text-purple-400',
  red: 'bg-red-500/20 text-red-400'
}

export const StatsCard: React.FC< StatsCardProps > = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        < div >
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
