// src/components/QuoteModal.tsx
import React, { useState } from 'react'
import { X, Send, User, Mail, Phone, MessageSquare, Briefcase, DollarSign } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { quotesService } from '../services/supabaseService'
import type { QuoteInsert } from '../types/database'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

export const QuoteModal: React.FC< QuoteModalProps > = ({ isOpen, onClose }) => {
  const { t, isRTL } = useLanguage()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: '',
    budget: '',
    message: '',
    timeline: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const quoteData: QuoteInsert = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        project_type: formData.project_type,
        budget: formData.budget || undefined,
        message: formData.message,
        timeline: formData.timeline || undefined,
        status: 'pending'
      }

      await quotesService.create(quoteData)
      setIsSubmitted(true)

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          project_type: '',
          budget: '',
          message: '',
          timeline: ''
        })
        onClose()
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className={`text-2xl font-bold bg-gradient-to-r from-pink-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent ${isRTL ? 'font-arabic' : ''}`}>
            Get Your Quote
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Satisfaction Guarantee Banner */}
        <div className="bg-gradient-to-r from-emerald-900/40 via-cyan-900/40 to-emerald-900/40 border-b border-emerald-500/30 px-6 py-3">
          <div className="flex items-center justify-center gap-2 text-emerald-300">
            <span className="text-lg">✅</span>
            <span className={`text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>{t.satisfactionGuarantee}</span>
          </div>
          <div className="text-center mt-1">
            <p className={`text-emerald-400/80 text-xs ${isRTL ? 'font-arabic' : ''}`}>
              {t.guaranteeDescription}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className={`text-red-400 text-sm ${isRTL ? 'font-arabic' : ''}`}>{error}</p>
            </div>
          )}

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="text-white" size={24} />
              </div>
              <h3 className={`text-xl font-bold text-white mb-2 ${isRTL ? 'font-arabic' : ''}`}>Quote Request Sent!</h3>
              <p className={`text-gray-300 ${isRTL ? 'font-arabic' : ''}`}>We'll get back to you within 24 hours with a detailed proposal.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reste du formulaire identique... */}
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                < div >
                  <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    <User size={16} className="inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                    placeholder="John Doe"
                  />
                </div>
                < div >
                  <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    <Mail size={16} className="inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                < div >
                  <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    <Phone size={16} className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                < div >
                  <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    <Briefcase size={16} className="inline mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                < div >
                  <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    Project Type *
                  </label>
                  <select
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                  >
                    <option value="">Select a service</option>
                    <option value="website">Website Creation</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="saas">SaaS Development</option>
                    <option value="ai-integration">AI Integration</option>
                    <option value="consulting">AI Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                < div >
                  <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    <DollarSign size={16} className="inline mr-2" />
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                  >
                    <option value="">Select budget range</option>
                    <option value="5k-10k">€5,000 - €10,000</option>
                    <option value="10k-25k">€10,000 - €25,000</option>
                    <option value="25k-50k">€25,000 - €50,000</option>
                    <option value="50k-100k">€50,000 - €100,000</option>
                    <option value="100k+">€100,000+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </div>
              </div>

              < div >
                <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors ${isRTL ? 'font-arabic text-right' : ''}`}
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-months+">6+ months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              < div >
                <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  <MessageSquare size={16} className="inline mr-2" />
                  Project Description *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors resize-none ${isRTL ? 'font-arabic text-right' : ''}`}
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 hover:from-emerald-600 hover:via-cyan-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isRTL ? 'font-arabic' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Quote Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
