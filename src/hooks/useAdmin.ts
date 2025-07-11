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
      setError(null) // Clear previous errors
      const data = await adminService.getDashboardStats()
      setStats(data)
    } catch (err) {
      console.error("Failed to load stats:", err);
      setError(err instanceof Error ? err.message : 'Error loading stats');
    } finally {
      setLoading(false)
    }
  }

  // Charger les quotes avec filtres
  const loadQuotes = async (filters: QuoteFilters = {}) => {
    try {
      setLoading(true)
      setError(null) // Clear previous errors
      const data = await adminService.getQuotesWithFilters(filters)
      setQuotes(data)
    } catch (err) {
      console.error("Failed to load quotes:", err);
      setError(err instanceof Error ? err.message : 'Error loading quotes');
    } finally {
      setLoading(false)
    }
  }

  // Charger les projets avec filtres
  const loadProjects = async (filters: ProjectFilters = {}) => {
    try {
      setLoading(true)
      setError(null) // Clear previous errors
      const data = await adminService.getProjectsWithFilters(filters)
      setProjects(data)
    } catch (err) {
      console.error("Failed to load projects:", err);
      setError(err instanceof Error ? err.message : 'Error loading projects');
    } finally {
      setLoading(false)
    }
  }

  // Mettre à jour le statut d'une quote
  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      setError(null); // Clear previous errors
      await quotesService.updateStatus(id, status);
      setQuotes(prev => prev.map(quote =>
        quote.id === id ? { ...quote, status } : quote
      ));
      // Recharger les stats pour refléter le changement
      await loadStats();
    } catch (err) {
      console.error(`Failed to update quote ${id} status:`, err);
      setError(err instanceof Error ? err.message : 'Error updating quote');
    }
  };

  // Mettre à jour un projet
  const updateProject = async (id: string, updates: Partial< Project >) => {
    try {
      setError(null); // Clear previous errors
      await projectsService.update(id, updates);
      setProjects(prev => prev.map(project =>
        project.id === id ? { ...project, ...updates } : project
      ));
      // Recharger les stats pour refléter le changement
      await loadStats();
    } catch (err) {
      console.error(`Failed to update project ${id}:`, err);
      setError(err instanceof Error ? err.message : 'Error updating project');
    }
  };

  // Convertir quote en projet
  const convertQuoteToProject = async (quote: Quote, projectData: Omit<ProjectInsert, 'id' | 'created_at'>) => {
    try {
      setError(null); // Clear previous errors before attempting conversion
      console.log('Converting quote to project...', { quoteId: quote.id, projectData });
      
      // This function now relies on adminService to handle the transaction
      await adminService.convertQuoteToProject(quote.id, projectData);
      
      // Recharger toutes les données après succès
      await Promise.all([
        loadQuotes(),
        loadProjects(),
        loadStats()
      ]);
      
      console.log('Quote converted successfully');
      // Optionally, you could return a success status or message here
    } catch (err) {
      // Error is already logged in adminService, but we catch it here to update the UI state
      console.error('Error in convertQuoteToProject hook:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error converting quote';
      setError(errorMessage);
      // Re-throw the error so that the component calling this hook can also handle it if needed
      throw err;
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    const initializeData = async () => {
      try {
        await Promise.all([
          loadStats(),
          loadQuotes(),
          loadProjects()
        ]);
      } catch (err) {
        // Errors during initialization are already handled in individual load functions
        console.error('Error initializing admin data:', err);
      }
    };

    initializeData();
  }, []); // Empty dependency array ensures this runs only once on mount

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
  };
};