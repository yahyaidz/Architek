// src/components/Admin/QuoteDetailModal.tsx
import React from 'react'
import { X, Mail, Phone, Building, Calendar, MessageSquare } from 'lucide-react'
import type { Quote } from '../../types/database'

interface QuoteDetailModalProps {
  quote: Quote
  onClose: () => void
}

export const QuoteDetailModal: React.FC< QuoteDetailModalProps > = ({ quote, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Quote Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Client Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Client Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="font-medium">Name:</span>
                < span >{quote.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                < span >{quote.email}</span>
              </div>
              {quote.phone && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone size={16} />
                  < span >{quote.phone}</span>
                </div>
              )}
              {quote.company && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Building size={16} />
                  < span >{quote.company}</span>
                </div>
              )}
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Project Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              < div >
                <span className="text-gray-400">Type:</span>
                <span className="text-white ml-2">{quote.project_type}</span>
              </div>
              {quote.budget && (
                < div >
                  <span className="text-gray-400">Budget:</span>
                  <span className="text-white ml-2">{quote.budget}</span>
                </div>
              )}
              {quote.timeline && (
                < div >
                  <span className="text-gray-400">Timeline:</span>
                  <span className="text-white ml-2">{quote.timeline}</span>
                </div>
              )}
              < div >
                <span className="text-gray-400">Status:</span>
                <span className="text-white ml-2 capitalize">{quote.status}</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <MessageSquare size={20} />
              Project Description
            </h3>
            <p className="text-gray-300 leading-relaxed">{quote.message}</p>
          </div>

          {/* Metadata */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Metadata</h3>
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar size={16} />
              < span >Received: {new Date(quote.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
