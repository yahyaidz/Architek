// src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/Auth/AuthProvider'
import { ProtectedRoute } from './components/Auth/ProtectedRoute'
import { LoginPage } from './components/Auth/LoginPage'
import { QuoteModal } from './components/QuoteModal'
import { useQuoteModal } from './hooks/useQuoteModal'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { WebsiteCreationPage } from './components/ServicePages/WebsiteCreationPage'
import { AppDevelopmentPage } from './components/ServicePages/AppDevelopmentPage'
import { SaasDevelopmentPage } from './components/ServicePages/SaasDevelopmentPage'
import { AIIntegrationPage } from './components/ServicePages/AIIntegrationPage'
import { AdminDashboard } from './components/Admin/AdminDashboard'

function App() {
  const { isOpen, openModal, closeModal } = useQuoteModal()

  const HomePage = () => (
    <div className="min-h-screen bg-black text-white">
      <Header onGetQuote={openModal} />
      <Hero onGetQuote={openModal} />
      <Services onGetQuote={openModal} />
      <About />
      <Contact onGetQuote={openModal} />
      <Footer />
      <QuoteModal isOpen={isOpen} onClose={closeModal} />
    </div>
  )

  return (
    < AuthProvider >
      < Router >
        < Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/website-creation" element={<WebsiteCreationPage />} />
          <Route path="/app-development" element={<AppDevelopmentPage />} />
          <Route path="/saas-development" element={<SaasDevelopmentPage />} />
          <Route path="/ai-integration" element={<AIIntegrationPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={
            < ProtectedRoute >
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
