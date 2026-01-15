import { useState } from 'react'
import { 
  MapPin, Shield, TrendingUp, Users, Eye, Clock,
  Wallet, FileText, CheckCircle, Home, Landmark, 
  BadgeCheck, Handshake, PiggyBank, Award, Target,
  Zap, Heart, Star, ThumbsUp, Lock, ChevronDown, ChevronUp
} from 'lucide-react'

const icons = [
  { name: 'MapPin', icon: MapPin, label: 'Localisation' },
  { name: 'Shield', icon: Shield, label: 'Securite' },
  { name: 'TrendingUp', icon: TrendingUp, label: 'Croissance' },
  { name: 'Users', icon: Users, label: 'Equipe' },
  { name: 'Eye', icon: Eye, label: 'Vision' },
  { name: 'Clock', icon: Clock, label: 'Temps' },
  { name: 'Wallet', icon: Wallet, label: 'Finance' },
  { name: 'FileText', icon: FileText, label: 'Document' },
  { name: 'CheckCircle', icon: CheckCircle, label: 'Valide' },
  { name: 'Home', icon: Home, label: 'Maison' },
  { name: 'Landmark', icon: Landmark, label: 'Institution' },
  { name: 'BadgeCheck', icon: BadgeCheck, label: 'Certifie' },
  { name: 'Handshake', icon: Handshake, label: 'Accord' },
  { name: 'PiggyBank', icon: PiggyBank, label: 'Epargne' },
  { name: 'Award', icon: Award, label: 'Recompense' },
  { name: 'Target', icon: Target, label: 'Objectif' },
  { name: 'Zap', icon: Zap, label: 'Energie' },
  { name: 'Heart', icon: Heart, label: 'Amour' },
  { name: 'Star', icon: Star, label: 'Etoile' },
  { name: 'ThumbsUp', icon: ThumbsUp, label: 'Approuve' },
  { name: 'Lock', icon: Lock, label: 'Securise' },
]

const colorPalette = [
  { name: 'Foret', colors: ['#14532d', '#166534', '#15803d', '#22c55e', '#86efac', '#dcfce7'] },
  { name: 'Bleu', colors: ['#1e3a8a', '#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'] },
  { name: 'Violet', colors: ['#581c87', '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ede9fe'] },
  { name: 'Rose', colors: ['#831843', '#db2777', '#ec4899', '#f472b6', '#f9a8d4', '#fce7f3'] },
  { name: 'Rouge', colors: ['#7f1d1d', '#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fee2e2'] },
  { name: 'Orange', colors: ['#7c2d12', '#ea580c', '#f97316', '#fb923c', '#fdba74', '#ffedd5'] },
  { name: 'Jaune', colors: ['#713f12', '#ca8a04', '#eab308', '#facc15', '#fde047', '#fef9c3'] },
  { name: 'Cyan', colors: ['#164e63', '#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#cffafe'] },
  { name: 'Gris', colors: ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#d4d4d8', '#f4f4f5'] },
]

const AvantageCard = ({ item, index, onChange, onRemove, isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState('icone')
  const IconComponent = icons.find(i => i.name === item.icone)?.icon || Shield

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Header avec preview */}
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          {/* Mini preview */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
            style={{ backgroundColor: item.couleurFondIcone || '#dcfce7' }}
          >
            <IconComponent 
              size={24} 
              style={{ color: item.couleurIcone || '#15803d' }}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {item.titre || `Avantage ${index + 1}`}
            </h4>
            <p className="text-sm text-gray-500 truncate max-w-xs">
              {item.description || 'Aucune description'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"/>
            </svg>
          </button>
          {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </div>
      </div>

      {/* Contenu expandable */}
      {isOpen && (
        <div className="border-t border-gray-100 p-5 bg-gray-50/50">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-5">
            {['icone', 'couleurs', 'texte'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'icone' && '🎯 Icone'}
                {tab === 'couleurs' && '🎨 Couleurs'}
                {tab === 'texte' && '✏️ Texte'}
              </button>
            ))}
          </div>

          {/* Tab Icone */}
          {activeTab === 'icone' && (
            <div className="grid grid-cols-7 gap-2">
              {icons.map(({ name, icon: Icon, label }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => onChange('icone', name)}
                  className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    item.icone === name
                      ? 'bg-forest-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  title={label}
                >
                  <Icon size={22} />
                </button>
              ))}
            </div>
          )}

          {/* Tab Couleurs */}
          {activeTab === 'couleurs' && (
            <div className="space-y-5">
              {/* Couleur Icone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de l'icone</label>
                <div className="flex flex-wrap gap-1">
                  {colorPalette.flatMap(group => 
                    group.colors.slice(0, 3).map((color, i) => (
                      <button
                        key={`icon-${group.name}-${i}`}
                        type="button"
                        onClick={() => onChange('couleurIcone', color)}
                        className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
                          item.couleurIcone === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Couleur Fond Icone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du fond</label>
                <div className="flex flex-wrap gap-1">
                  {colorPalette.flatMap(group => 
                    group.colors.slice(3).map((color, i) => (
                      <button
                        key={`bg-${group.name}-${i}`}
                        type="button"
                        onClick={() => onChange('couleurFondIcone', color)}
                        className={`w-8 h-8 rounded-lg transition-all hover:scale-110 border border-gray-200 ${
                          item.couleurFondIcone === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Couleur Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du titre</label>
                <div className="flex flex-wrap gap-1">
                  {colorPalette.flatMap(group => 
                    group.colors.slice(0, 4).map((color, i) => (
                      <button
                        key={`title-${group.name}-${i}`}
                        type="button"
                        onClick={() => onChange('couleurTitre', color)}
                        className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
                          item.couleurTitre === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Couleur Carte */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de la carte</label>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => onChange('couleurCarte', '#ffffff')}
                    className={`w-8 h-8 rounded-lg transition-all hover:scale-110 border border-gray-300 bg-white ${
                      item.couleurCarte === '#ffffff' ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                  />
                  {colorPalette.flatMap(group => 
                    group.colors.slice(4).map((color, i) => (
                      <button
                        key={`card-${group.name}-${i}`}
                        type="button"
                        onClick={() => onChange('couleurCarte', color)}
                        className={`w-8 h-8 rounded-lg transition-all hover:scale-110 border border-gray-200 ${
                          item.couleurCarte === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab Texte */}
          {activeTab === 'texte' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={item.titre || ''}
                  onChange={(e) => onChange('titre', e.target.value)}
                  placeholder="Ex: Zero frais a avancer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => onChange('description', e.target.value)}
                  placeholder="Decrivez cet avantage..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Preview */}
          <div className="mt-5 pt-5 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-500 mb-3">Apercu</label>
            <div 
              className="p-6 rounded-2xl border transition-all"
              style={{ 
                backgroundColor: item.couleurCarte || '#ffffff',
                borderColor: item.couleurCarte === '#ffffff' ? '#e5e7eb' : 'transparent'
              }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: item.couleurFondIcone || '#dcfce7' }}
              >
                <IconComponent 
                  size={28} 
                  style={{ color: item.couleurIcone || '#15803d' }}
                />
              </div>
              <h3 
                className="font-bold text-xl mb-2"
                style={{ color: item.couleurTitre || '#111827' }}
              >
                {item.titre || 'Titre de l\'avantage'}
              </h3>
              <p className="text-gray-600">
                {item.description || 'Description de l\'avantage...'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AvantageCard
