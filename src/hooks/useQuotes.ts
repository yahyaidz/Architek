// src/hooks/useQuotes.ts
import { useState, useEffect } from 'react'
import { quotesService } from '../services/supabaseService'
import type { Quote, QuoteInsert } from '../types/database'

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await quotesService.getAll()
      setQuotes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createQuote = async (quote: QuoteInsert) => {
    try {
      setLoading(true)
      setError(null)
      const newQuote = await quotesService.create(quote)
      setQuotes(prev => [newQuote, ...prev])
      return newQuote
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateQuoteStatus = async (id: string, status: Quote['status']) => {
    try {
      setLoading(true)
      setError(null)
      const updatedQuote = await quotesService.updateStatus(id, status)
      setQuotes(prev => prev.map(quote => 
        quote.id === id ? updatedQuote : quote
      ))
      return updatedQuote
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return {
    quotes,
    loading,
    error,
    createQuote,
    updateQuoteStatus,
    refetch: fetchQuotes
  }
}
