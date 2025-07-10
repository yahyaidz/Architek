// src/types/database.ts
export interface Database {
  public: {
    Tables: {
      quotes: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone?: string
          company?: string
          project_type: string
          budget?: string
          message: string
          timeline?: string
          status: 'pending' | 'contacted' | 'approved' | 'rejected'
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string
          company?: string
          project_type: string
          budget?: string
          message: string
          timeline?: string
          status?: 'pending' | 'contacted' | 'approved' | 'rejected'
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          company?: string
          project_type?: string
          budget?: string
          message?: string
          timeline?: string
          status?: 'pending' | 'contacted' | 'approved' | 'rejected'
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          client_name: string
          project_type: string
          status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'paid'
          start_date?: string
          end_date?: string
          budget?: number
          technologies?: string[]
          image_url?: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          client_name: string
          project_type: string
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'paid'
          start_date?: string
          end_date?: string
          budget?: number
          technologies?: string[]
          image_url?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          client_name?: string
          project_type?: string
          status?: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'paid'
          start_date?: string
          end_date?: string
          budget?: number
          technologies?: string[]
          image_url?: string
        }
      }
    }
  }
}

export type Quote = Database['public']['Tables']['quotes']['Row']
export type QuoteInsert = Database['public']['Tables']['quotes']['Insert']
export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
