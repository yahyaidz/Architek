// src/services/adminService.ts
import { supabase } from '../lib/supabase'
import type { Quote, Project, ProjectInsert } from '../types/database'
import type { DashboardStats, QuoteFilters, ProjectFilters } from '../types/admin'

export const adminService = {
  // Dashboard Statistics
  async getDashboardStats(): Promise< DashboardStats > {
    try {
      // Récupérer toutes les quotes
      const { data: quotes, error: quotesError } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (quotesError) throw quotesError

      // Récupérer tous les projets
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (projectsError) throw projectsError

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

      // Statistiques projets
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

      // Activité récente (combiner et trier)
      const recentQuotesActivity = quotes?.slice(0, 5).map(q => ({
        id: q.id,
        type: 'quote' as const,
        action: `New quote received from ${q.name}`,
        date: q.created_at,
        client: q.name
      })) || [];

      const recentProjectsActivity = projects?.slice(0, 5).map(p => ({
        id: p.id,
        type: 'project' as const,
        action: `Project status updated to ${p.status.replace('_', ' ')}`,
        date: p.created_at,
        client: p.client_name
      })) || [];

      const recentActivity = [...recentQuotesActivity, ...recentProjectsActivity]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

      return {
        quotes: quoteStats,
        projects: projectStats,
        recentActivity
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error; // Re-throw error to be caught by the hook
    }
  },

  // Quotes avec filtres
  async getQuotesWithFilters(filters: QuoteFilters = {}) {
    let query = supabase.from('quotes').select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.projectType) {
      query = query.eq('project_type', filters.projectType);
    }

    if (filters.dateRange) {
      const now = new Date();
      let startDate: Date;

      switch (filters.dateRange) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(0); // Start of epoch if range is unknown
      }

      query = query.gte('created_at', startDate.toISOString());
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase error fetching quotes with filters:', error);
        throw error;
    }
    return data || [];
  },

  // Projets avec filtres
  async getProjectsWithFilters(filters: ProjectFilters = {}) {
    let query = supabase.from('projects').select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.projectType) {
      query = query.eq('project_type', filters.projectType);
    }

    if (filters.dateRange) {
      const now = new Date();
      let startDate: Date;

      switch (filters.dateRange) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(0); // Start of epoch if range is unknown
      }

      query = query.gte('created_at', startDate.toISOString());
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase error fetching projects with filters:', error);
        throw error;
    }
    return data || [];
  },

  // Convertir quote en projet
  async convertQuoteToProject(quoteId: string, projectData: Omit<ProjectInsert, 'id' | 'created_at'>) {
    try {
      console.log('Attempting to insert project data:', projectData);
      // Créer le projet
      // projectData should already be formatted correctly with nulls for optional fields
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert(projectData)
        .select() // Select the newly created project data
        .single(); // Expecting a single row back

      if (projectError) {
        console.error('Supabase project insertion error:', projectError);
        // Throw the specific Supabase error for better handling
        throw new Error(`Supabase error: ${projectError.message} (Details: ${projectError.details})`);
      }
      
      if (!project) {
        // Should not happen if projectError is null, but good practice
        throw new Error('Project insertion succeeded but returned no data.');
      }
      console.log('Project inserted successfully:', project);

      // Mettre à jour le statut de la quote
      const { error: quoteError } = await supabase
        .from('quotes')
        .update({ status: 'approved' }) // Set quote status to approved
        .eq('id', quoteId); // Match the quote by its ID

      if (quoteError) {
        console.error('Supabase quote update error:', quoteError);
        // If quote update fails after project creation, it's a partial failure.
        // Depending on requirements, you might want to rollback the project insertion,
        // but for simplicity, we'll just throw the error.
        throw new Error(`Supabase error updating quote: ${quoteError.message} (Details: ${quoteError.details})`);
      }
      console.log(`Quote ${quoteId} updated to approved.`);

      return project; // Return the created project data
    } catch (error) {
      console.error('Error in adminService.convertQuoteToProject:', error);
      // Re-throw the error to be caught by the caller (useAdmin hook)
      throw error;
    }
  }
};