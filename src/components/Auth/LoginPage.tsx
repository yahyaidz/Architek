// src/components/Auth/LoginPage.tsx
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, loading } = useAuth()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Rediriger si déjà connecté
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const success = await login(password)
      if (!success) {
        setError('Mot de passe incorrect')
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Administration</h1>
          <p className="text-gray-400">Saisissez le mot de passe pour accéder au dashboard</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          < div >
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Lock size={16} className="inline mr-2" />
              Mot de passe administrateur
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors pr-12"
                placeholder="••••••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Vérification...
              </>
            ) : (
              <>
                <Lock size={20} />
                Accéder au dashboard
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Retour au site
          </button>
        </div>
      </div>
    </div>
  )
}
