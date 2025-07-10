// src/components/Admin/QuotesTable.tsx
import React, { useState } from 'react'
import { Eye, Mail, Phone, Building, Calendar, ArrowRight } from 'lucide-react'
import type { Quote } from '../../types/database'
import { QuoteDetailModal } from './QuoteDetailModal'
import { ConvertToProjectModal } from './ConvertToProjectModal'

interface QuotesTableProps {
  quotes: Quote[]
  onUpdateStatus: (id: string, status: Quote['status']) => void
  onConvertToProject: (quote: Quote, projectData: any) => void
}

export const QuotesTable: React.FC< QuotesTableProps > = ({ 
  quotes, 
  onUpdateStatus, 
  onConvertToProject 
}) => {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [convertingQuote, setConvertingQuote] = useState<Quote | null>(null)
  const [statusFilter, setStatusFilter] = useState< string >('all')
  const [typeFilter, setTypeFilter] = useState< string >('all')

  const filteredQuotes = quotes.filter(quote => {
    if (statusFilter !== 'all' && quote.status !== statusFilter) return false
    if (typeFilter !== 'all' && quote.project_type !== typeFilter) return false
    return true
  })

  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'contacted': return 'bg-blue-500/20 text-blue-400'
      case 'approved': return 'bg-green-500/20 text-green-400'
      case 'rejected': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
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
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
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

      {/* Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              < tr >
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    < div >
                      <div className="text-sm font-medium text-white">{quote.name}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <Mail size={12} />
                        {quote.email}
                      </div>
                      {quote.phone && (
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Phone size={12} />
                          {quote.phone}
                        </div>
                      )}
                      {quote.company && (
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Building size={12} />
                          {quote.company}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{quote.project_type}</div>
                    {quote.timeline && (
                      <div className="text-xs text-gray-400">{quote.timeline}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      {quote.budget || 'Not specified'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={quote.status}
                      onChange={(e) => onUpdateStatus(quote.id, e.target.value as Quote['status'])}
                      className={`px-2 py-1 rounded text-xs font-medium border-0 ${getStatusColor(quote.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} />
                      {new Date(quote.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedQuote(quote)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      {quote.status === 'approved' && (
                        <button
                          onClick={() => setConvertingQuote(quote)}
                          className="p-1 text-green-400 hover:text-green-300 transition-colors"
                          title="Convert to project"
                        >
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
        />
      )}

      {convertingQuote && (
        <ConvertToProjectModal
          quote={convertingQuote}
          onClose={() => setConvertingQuote(null)}
          onConvert={onConvertToProject}
        />
      )}
    </div>
  )
}
