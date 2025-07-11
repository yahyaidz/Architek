// src/components/Admin/ConvertToProjectModal.tsx
import React, { useState } from 'react'
import { X, Save } from 'lucide-react'
import type { Quote, Project, ProjectInsert } from '../../types/database' // Assurez-vous que ProjectInsert est importé

interface ConvertToProjectModalProps {
  quote: Quote
  onClose: () => void
  onConvert: (quote: Quote, projectData: Omit<ProjectInsert, 'id' | 'created_at'>) => void
}

export const ConvertToProjectModal: React.FC< ConvertToProjectModalProps > = ({ 
  quote, 
  onClose, 
  onConvert 
}) => {
  // Utiliser Omit<ProjectInsert, 'id' | 'created_at'> pour typer formData correctement
  const [formData, setFormData] = useState<Omit<ProjectInsert, 'id' | 'created_at'>>({
    // Fournir des valeurs par défaut ou utiliser des fallbacks au cas où quote.project_type ou quote.name seraient null/undefined
    title: `${quote.project_type || 'New Project'} for ${quote.name}`,
    description: quote.message || 'No description provided.',
    client_name: quote.name,
    project_type: quote.project_type || 'other',
    status: 'planning', // Statut par défaut pour un nouveau projet
    start_date: new Date().toISOString().split('T')[0], // Date actuelle comme date de début par défaut
    end_date: null, // Optionnel, initialiser à null
    // Parser le budget de manière sécurisée. La colonne Supabase attend un nombre ou null.
    // Supprime les caractères non numériques et convertit en entier, sinon null.
    budget: quote.budget ? parseInt(quote.budget.replace(/[^0-9]/g, ''), 10) || null : null,
    // technologies et image_url sont optionnels, initialiser à null
    technologies: null, // Assurez-vous que quote.technologies n'est pas un champ pertinent ici, sinon adaptez
    image_url: null
  });

  const [techInput, setTechInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Assurez-vous que les valeurs vides pour les dates sont converties en null si nécessaire
    const finalProjectData = {
      ...formData,
      end_date: formData.end_date || null, // Convertir chaîne vide en null pour end_date
      // Le budget et les technologies sont déjà gérés à l'initialisation pour être null si vides/invalides
    };
    onConvert(quote, finalProjectData);
    onClose();
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies?.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        // Si technologies est null, initialiser comme un tableau avant d'ajouter
        technologies: [...(prev.technologies || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies?.filter(t => t !== tech) || null
    }));
  };

  // Gestion des changements pour les champs optionnels afin qu'ils puissent être mis à null
  const handleOptionalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? null : value // Convertir les champs vides en null
    }));
  };

  // Gérer le changement pour les technologies (qui est un tableau)
  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = e.target;
    // Ici, on met à jour techInput. La logique d'ajout se fait via addTechnology.
    // Si la logique d'ajout directe était implémentée ici, il faudrait aussi gérer le passage à null.
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Convert Quote to Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                value={formData.client_name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="planning">Planning</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.start_date || ''}
                onChange={handleOptionalChange} // Use handler that converts '' to null
                name="start_date"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.end_date || ''} // Display empty string if null for input field
                onChange={handleOptionalChange} // Use handler that converts '' to null
                name="end_date"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Budget (€)
            </label>
            <input
              type="number"
              value={formData.budget === null ? '' : formData.budget || ''} // Display empty if null
              onChange={(e) => {
                const value = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  // Convert to number, set to null if empty or invalid
                  budget: value === '' ? null : parseInt(value, 10) || null
                }));
              }}
              min="0"
              step="100"
              placeholder="Enter budget or leave empty"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Technologies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                placeholder="Add technology (e.g., React, Node.js)"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.technologies || []).map((tech) => ( // Use || [] in case technologies is null
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-600 text-white text-sm rounded flex items-center gap-1"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Project Image URL (optional)
            </label>
            <input
              type="url"
              value={formData.image_url || ''} // Display empty string if null for input field
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value === '' ? null : e.target.value }))}
              placeholder="https://example.com/project-image.jpg"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};