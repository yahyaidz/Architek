// src/types/admin.ts
export interface DashboardStats {
    quotes: {
      total: number
      pending: number
      contacted: number
      approved: number
      rejected: number
      thisMonth: number
    }
    projects: {
      total: number
      planning: number
      inProgress: number
      completed: number
      onHold: number
      paid: number
      totalRevenue: number
    }
    recentActivity: Array<{
      id: string
      type: 'quote' | 'project'
      action: string
      date: string
      client: string
    }>
  }
  
  export interface QuoteFilters {
    status?: string
    projectType?: string
    dateRange?: 'week' | 'month' | 'quarter' | 'year'
  }
  
  export interface ProjectFilters {
    status?: string
    projectType?: string
    dateRange?: 'week' | 'month' | 'quarter' | 'year'
  }
