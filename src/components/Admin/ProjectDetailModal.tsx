// src/components/Admin/ProjectDetailModal.tsx
import React, { useState } from 'react'
import { X, Save, Calendar, DollarSign, Users, Code } from 'lucide-react'
import type { Project } from '../../types/database'

interface ProjectDetailModalProps {
  project: Project
  onClose: () => void
  onUpdate: (id: string, updates: Partial< Project >) => void
}

export const ProjectDetailModal: React.FC< ProjectDetailModalProps > = ({ 
  project, 
  onClose, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    status: project.status,
    start_date: project.start_date || '',
    end_date: project.end_date || '',
    budget: project.budget || 0,
    image_url: project.image_url || ''
  })

  const handleSave = () => {
    onUpdate(project.id, formData)
    setIsEditing(false)
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'text-blue-400'
      case 'in_progress': return 'text-yellow-400'
      case 'completed': return 'text-green-400'
      case 'on_hold': return 'text-red-400'
      case 'paid': return 'text-emerald-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Project Details</h2>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center gap-1"
                >
                  <Save size={16} />
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Description */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Project Information</h3>
                
                {isEditing ? (
                  <div className="space-y-4">
                    < div >
                      <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    < div >
                      <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-blue-500 focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    < div >
                      <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                    </div>
                    < div >
                      <p className="text-gray-300 leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Code size={20} />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Image */}
              {(project.image_url || isEditing) && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Project Image</h3>
                  {isEditing ? (
                    < div >
                      <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                      <input
                        type="url"
                        value={formData.image_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                        placeholder="https://example.com/project-image.jpg"
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  ) : project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-600 rounded flex items-center justify-center text-gray-400">
                      No image available
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Dates */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Project Status</h3>
                
                {isEditing ? (
                  <div className="space-y-4">
                    < div >
                      <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Project['status'] }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="planning">Planning</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on_hold">On Hold</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                    < div >
                      <label className="block text-sm font-medium text-gray-400 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    < div >
                      <label className="block text-sm font-medium text-gray-400 mb-2">End Date</label>
                      <input
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`capitalize font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    {project.start_date && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Start:</span>
                        <div className="flex items-center gap-1 text-white">
                          <Calendar size={14} />
                          {new Date(project.start_date).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    {project.end_date && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">End:</span>
                        <div className="flex items-center gap-1 text-white">
                          <Calendar size={14} />
                          {new Date(project.end_date).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Client & Budget */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Client & Budget</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Client:</span>
                    <div className="flex items-center gap-1 text-white">
                      <Users size={14} />
                      {project.client_name}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white capitalize">{project.project_type}</span>
                  </div>
                  {isEditing ? (
                    < div >
                      <label className="block text-sm font-medium text-gray-400 mb-2">Budget (€)</label>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                        min="0"
                        step="100"
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  ) : project.budget ? (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Budget:</span>
                      <div className="flex items-center gap-1 text-white">
                        <DollarSign size={14} />
                        €{project.budget.toLocaleString()}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Metadata</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">ID:</span>
                    <span className="text-white font-mono text-xs">
                      {project.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
