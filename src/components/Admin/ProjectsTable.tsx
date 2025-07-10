// src/components/Admin/ProjectsTable.tsx
import React, { useState } from 'react'
import { Eye, Calendar, DollarSign, Users } from 'lucide-react'
import type { Project } from '../../types/database'
import { ProjectDetailModal } from './ProjectDetailModal'

interface ProjectsTableProps {
  projects: Project[]
  onUpdateProject: (id: string, updates: Partial< Project >) => void
}

export const ProjectsTable: React.FC< ProjectsTableProps > = ({ 
  projects, 
  onUpdateProject 
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [statusFilter, setStatusFilter] = useState< string >('all')
  const [typeFilter, setTypeFilter] = useState< string >('all')

  const filteredProjects = projects.filter(project => {
    if (statusFilter !== 'all' && project.status !== statusFilter) return false
    if (typeFilter !== 'all' && project.project_type !== typeFilter) return false
    return true
  })

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'bg-blue-500/20 text-blue-400'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400'
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'on_hold': return 'bg-red-500/20 text-red-400'
      case 'paid': return 'bg-emerald-500/20 text-emerald-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getProgress = (project: Project) => {
    switch (project.status) {
      case 'planning': return 10
      case 'in_progress': return 50
      case 'completed': return 90
      case 'paid': return 100
      case 'on_hold': return 25
      default: return 0
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex flex-wrap gap-4">
          < div >
            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          < div >
            <label className="block text-sm font-medium text-gray-400 mb-1">Project Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="website">Website</option>
              <option value="mobile-app">Mobile App</option>
              <option value="saas">SaaS</option>
              <option value="ai-integration">AI Integration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users size={14} />
                  {project.client_name}
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(project)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="View details"
              >
                <Eye size={16} />
              </button>
            </div>

            {/* Project Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Type:</span>
                <span className="text-sm text-white capitalize">{project.project_type}</span>
              </div>
              
              {project.budget && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Budget:</span>
                  <div className="flex items-center gap-1 text-sm text-white">
                    <DollarSign size={12} />
                    €{project.budget.toLocaleString()}
                  </div>
                </div>
              )}
              
              {project.start_date && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Start:</span>
                  <div className="flex items-center gap-1 text-sm text-white">
                    <Calendar size={12} />
                    {new Date(project.start_date).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>

            {/* Status & Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Status:</span>
                <select
                  value={project.status}
                  onChange={(e) => onUpdateProject(project.id, { status: e.target.value as Project['status'] })}
                  className={`px-2 py-1 rounded text-xs font-medium border-0 ${getStatusColor(project.status)}`}
                >
                  <option value="planning">Planning</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on_hold">On Hold</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              
              {/* Progress Bar */}
              < div >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-xs text-white">{getProgress(project)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      project.status === 'paid' 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                        : 'bg-gradient-to-r from-blue-500 to-green-500'
                    }`}
                    style={{ width: `${getProgress(project)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdate={onUpdateProject}
        />
      )}
    </div>
  )
}
