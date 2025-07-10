// src/hooks/useAdmin.ts
import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'
import { quotesService, projectsService } from '../services/supabaseService'
import type { Quote, Project, ProjectInsert } from '../types/database'
import type { DashboardStats, QuoteFilters, ProjectFilters } from '../types/admin'

export const useAdmin = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Charger les statistiques
  const loadStats = async () => {
    try {
      setLoading(true)
      const data = await adminService.getDashboardStats()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading stats')
    } finally {
      setLoading(false)
    }
  }

  // Charger les quotes avec filtres
  const loadQuotes = async (filters: QuoteFilters = {}) => {
    try {
      setLoading(true)
      const data = await adminService.getQuotesWithFilters(filters)
      setQuotes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading quotes')
    } finally {
      setLoading(false)
    }
  }

  // Charger les projets avec filtres
  const loadProjects = async (filters: ProjectFilters = {}) => {
    try {
      setLoading(true)
      const data = await adminService.getProjectsWithFilters(filters)
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading projects')
    } finally {
      setLoading(false)
    }
  }

  // Mettre à jour le statut d'une quote
  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      await quotesService.updateStatus(id, status)
      setQuotes(prev => prev.map(quote => 
        quote.id === id ? { ...quote, status } : quote
      ))
      // Recharger les stats
      loadStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating quote')
    }
  }

  // Mettre à jour un projet
  const updateProject = async (id: string, updates: Partial< Project >) => {
    try {
      await projectsService.update(id, updates)
      setProjects(prev => prev.map(project => 
        project.id === id ? { ...project, ...updates } : project
      ))
      // Recharger les stats
      loadStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating project')
    }
  }

  // Convertir quote en projet - VERSION CORRIGÉE
  const convertQuoteToProject = async (quote: Quote, projectData: Omit<ProjectInsert, 'id' | 'created_at'>) => {
    try {
      setError(null)
      console.log('Converting quote to project...', { quote: quote.id, projectData })
      
      await adminService.convertQuoteToProject(quote.id, projectData)
      
      // Recharger toutes les données
      await Promise.all([
        loadQuotes(),
        loadProjects(),
        loadStats()
      ])
      
      console.log('Quote converted successfully')
    } catch (err) {
      console.error('Error in convertQuoteToProject hook:', err)
      const errorMessage = err instanceof Error ? err.message : 'Error converting quote'
      setError(errorMessage)
      throw err // Re-throw pour que le composant puisse aussi gérer l'erreur
    }
  }

  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([
          loadStats(),
          loadQuotes(),
          loadProjects()
        ])
      } catch (err) {
        console.error('Error initializing admin data:', err)
      }
    }

    initializeData()
  }, [])

  return {
    stats,
    quotes,
    projects,
    loading,
    error,
    loadStats,
    loadQuotes,
    loadProjects,
    updateQuoteStatus,
    updateProject,
    convertQuoteToProject
  }
}
