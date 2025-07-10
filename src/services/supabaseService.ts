// src/services/supabaseService.ts
import { supabase } from '../lib/supabase'
import type { QuoteInsert, ProjectInsert, Quote, Project } from '../types/database'

// Service pour les devis (quotes)
export const quotesService = {
  // Créer un nouveau devis
  async create(quote: QuoteInsert) {
    const { data, error } = await supabase
      .from('quotes')
      .insert(quote)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating quote:', error)
      throw error
    }
    
    return data
  },

  // Récupérer tous les devis
  async getAll() {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching quotes:', error)
      throw error
    }
    
    return data
  },

  // Récupérer un devis par ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching quote:', error)
      throw error
    }
    
    return data
  },

  // Mettre à jour le statut d'un devis
  async updateStatus(id: string, status: Quote['status']) {
    const { data, error } = await supabase
      .from('quotes')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating quote status:', error)
      throw error
    }
    
    return data
  },

  // Supprimer un devis
  async delete(id: string) {
    const { error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting quote:', error)
      throw error
    }
  }
}

// Service pour les projets - VERSION CORRIGÉE
export const projectsService = {
  // Créer un nouveau projet
  async create(project: ProjectInsert) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating project:', error)
      throw error
    }
    
    return data
  },

  // Récupérer tous les projets
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
    
    return data
  },

  // Récupérer les projets par type
  async getByType(projectType: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('project_type', projectType)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching projects by type:', error)
      throw error
    }
    
    return data
  },

  // Récupérer les projets terminés pour le portfolio
  async getCompleted() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'completed')
      .order('end_date', { ascending: false })
    
    if (error) {
      console.error('Error fetching completed projects:', error)
      throw error
    }
    
    return data
  },

  // Mettre à jour un projet - VERSION CORRIGÉE
  async update(id: string, updates: Partial< Project >) {
    try {
      console.log('Updating project:', { id, updates })
      
      // Nettoyer les données avant la mise à jour
      const cleanUpdates: any = {}
      
      // Copier seulement les champs qui peuvent être mis à jour
      if (updates.title !== undefined) cleanUpdates.title = updates.title
      if (updates.description !== undefined) cleanUpdates.description = updates.description
      if (updates.status !== undefined) cleanUpdates.status = updates.status
      if (updates.start_date !== undefined) cleanUpdates.start_date = updates.start_date
      if (updates.end_date !== undefined) cleanUpdates.end_date = updates.end_date
      if (updates.budget !== undefined) {
        cleanUpdates.budget = updates.budget === 0 ? null : updates.budget
      }
      if (updates.technologies !== undefined) {
        cleanUpdates.technologies = Array.isArray(updates.technologies) && updates.technologies.length > 0 
          ? updates.technologies 
          : null
      }
      if (updates.image_url !== undefined) {
        cleanUpdates.image_url = updates.image_url?.trim() || null
      }
      
      // Supprimer les champs en lecture seule
      delete cleanUpdates.id
      delete cleanUpdates.created_at
      delete cleanUpdates.client_name
      delete cleanUpdates.project_type
      
      console.log('Clean updates:', cleanUpdates)
      
      const { data, error } = await supabase
        .from('projects')
        .update(cleanUpdates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('Supabase update error:', error)
        throw new Error(`Failed to update project: ${error.message}`)
      }
      
      console.log('Project updated successfully:', data)
      return data
    } catch (err) {
      console.error('Error updating project:', err)
      throw err
    }
  },

  // Supprimer un projet
  async delete(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }
}
