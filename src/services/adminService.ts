// src/services/adminService.ts
import { supabase } from '../lib/supabase'
import type { Quote, Project } from '../types/database'
import type { DashboardStats, QuoteFilters, ProjectFilters } from '../types/admin'

export const adminService = {
  // Dashboard Statistics
  async getDashboardStats(): Promise< DashboardStats > {
    try {
      // Récupérer toutes les quotes
      const { data: quotes } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false })

      // Récupérer tous les projets
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      const now = new Date()
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

      // Statistiques quotes
      const quoteStats = {
        total: quotes?.length || 0,
        pending: quotes?.filter(q => q.status === 'pending').length || 0,
        contacted: quotes?.filter(q => q.status === 'contacted').length || 0,
        approved: quotes?.filter(q => q.status === 'approved').length || 0,
        rejected: quotes?.filter(q => q.status === 'rejected').length || 0,
        thisMonth: quotes?.filter(q => new Date(q.created_at) >= thisMonth).length || 0
      }

      // Statistiques projets - MODIFICATION ICI
      const projectStats = {
        total: projects?.length || 0,
        planning: projects?.filter(p => p.status === 'planning').length || 0,
        inProgress: projects?.filter(p => p.status === 'in_progress').length || 0,
        completed: projects?.filter(p => p.status === 'completed').length || 0,
        onHold: projects?.filter(p => p.status === 'on_hold').length || 0,
        paid: projects?.filter(p => p.status === 'paid').length || 0,
        // Seuls les projets avec statut 'paid' contribuent au revenu total
        totalRevenue: projects?.filter(p => p.status === 'paid').reduce((sum, p) => sum + (p.budget || 0), 0) || 0
      }

      // Activité récente
      const recentActivity = [
        ...(quotes?.slice(0, 5).map(q => ({
          id: q.id,
          type: 'quote' as const,
          action: `New quote from ${q.name}`,
          date: q.created_at,
          client: q.name
        })) || []),
        ...(projects?.slice(0, 5).map(p => ({
          id: p.id,
          type: 'project' as const,
          action: `Project ${p.status}`,
          date: p.created_at,
          client: p.client_name
        })) || [])
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)

      return {
        quotes: quoteStats,
        projects: projectStats,
        recentActivity
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  },

  // Quotes avec filtres
  async getQuotesWithFilters(filters: QuoteFilters = {}) {
    let query = supabase.from('quotes').select('*')

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.projectType) {
      query = query.eq('project_type', filters.projectType)
    }

    if (filters.dateRange) {
      const now = new Date()
      let startDate: Date

      switch (filters.dateRange) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          break
        case 'quarter':
          startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
          break
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1)
          break
        default:
          startDate = new Date(0)
      }

      query = query.gte('created_at', startDate.toISOString())
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Projets avec filtres
  async getProjectsWithFilters(filters: ProjectFilters = {}) {
    let query = supabase.from('projects').select('*')

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.projectType) {
      query = query.eq('project_type', filters.projectType)
    }

    if (filters.dateRange) {
      const now = new Date()
      let startDate: Date

      switch (filters.dateRange) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          break
        case 'quarter':
          startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
          break
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1)
          break
        default:
          startDate = new Date(0)
      }

      query = query.gte('created_at', startDate.toISOString())
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Convertir quote en projet
  async convertQuoteToProject(quoteId: string, projectData: Omit<Project, 'id' | 'created_at'>) {
    try {
      // Créer le projet
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single()

      if (projectError) throw projectError

      // Mettre à jour le statut de la quote
      const { error: quoteError } = await supabase
        .from('quotes')
        .update({ status: 'approved' })
        .eq('id', quoteId)

      if (quoteError) throw quoteError

      return project
    } catch (error) {
      console.error('Error converting quote to project:', error)
      throw error
    }
  }
}
