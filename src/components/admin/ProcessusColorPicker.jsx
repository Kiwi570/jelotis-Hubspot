import { useState } from 'react'

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

const presets = [
  { name: 'Nature', principale: '#15803d', fond: '#f0fdf4', titres: '#14532d', cartes: '#ffffff', texte: '#6b7280' },
  { name: 'Ocean', principale: '#0891b2', fond: '#ecfeff', titres: '#164e63', cartes: '#ffffff', texte: '#6b7280' },
  { name: 'Royal', principale: '#7c3aed', fond: '#f5f3ff', titres: '#581c87', cartes: '#ffffff', texte: '#6b7280' },
  { name: 'Sombre', principale: '#22c55e', fond: '#18181b', titres: '#ffffff', cartes: '#27272a', texte: '#a1a1aa' },
]

const defaultColors = {
  principale: '#15803d',
  fond: '#f9fafb',
  titres: '#111827',
  cartes: '#ffffff',
  texte: '#6b7280'
}

const ProcessusColorPicker = ({ couleurs = {}, onChange, template }) => {
  const currentColors = { ...defaultColors, ...couleurs }

  const handleColorChange = (key, value) => {
    onChange({ ...currentColors, [key]: value })
  }

  const applyPreset = (preset) => {
    onChange(preset)
  }

  const resetColors = () => {
    onChange(defaultColors)
  }

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Themes rapides</label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:border-forest-400 hover:bg-forest-50 transition-all flex items-center gap-2"
            >
              <div className="flex -space-x-1">
                <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: preset.principale }} />
                <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: preset.fond }} />
                <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: preset.cartes }} />
              </div>
              <span className="text-sm font-medium text-gray-700">{preset.name}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={resetColors}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all text-sm text-gray-600"
          >
            Reinitialiser
          </button>
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Apercu</label>
        <div 
          className="rounded-xl p-6 border transition-all"
          style={{ backgroundColor: currentColors.fond }}
        >
          <h3 
            className="font-bold text-lg mb-2"
            style={{ color: currentColors.titres }}
          >
            Comment ca marche ?
          </h3>
          <p className="text-sm mb-4" style={{ color: currentColors.texte }}>
            Un processus simple et efficace
          </p>
          <div className="flex gap-3">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="flex-1 p-3 rounded-lg"
                style={{ backgroundColor: currentColors.cartes }}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-2"
                  style={{ backgroundColor: currentColors.principale }}
                >
                  {num}
                </div>
                <div className="text-xs font-medium" style={{ color: currentColors.titres }}>Etape {num}</div>
                <div className="text-xs mt-1" style={{ color: currentColors.texte }}>Description...</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur principale</label>
          <div className="flex flex-wrap gap-1">
            {colorPalette.flatMap(group => 
              group.colors.slice(0, 3).map((color, i) => (
                <button
                  key={`principale-${group.name}-${i}`}
                  type="button"
                  onClick={() => handleColorChange('principale', color)}
                  className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
                    currentColors.principale === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de fond</label>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => handleColorChange('fond', '#ffffff')}
              className={`w-8 h-8 rounded-lg border border-gray-300 transition-all hover:scale-110 ${
                currentColors.fond === '#ffffff' ? 'ring-2 ring-offset-2 ring-gray-400' : ''
              }`}
              style={{ backgroundColor: '#ffffff' }}
            />
            {colorPalette.flatMap(group => 
              group.colors.slice(4).map((color, i) => (
                <button
                  key={`fond-${group.name}-${i}`}
                  type="button"
                  onClick={() => handleColorChange('fond', color)}
                  className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
                    currentColors.fond === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur des titres</label>
          <div className="flex flex-wrap gap-1">
            {colorPalette.flatMap(group => 
              group.colors.slice(0, 3).map((color, i) => (
                <button
                  key={`titres-${group.name}-${i}`}
                  type="button"
                  onClick={() => handleColorChange('titres', color)}
                  className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
                    currentColors.titres === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur des cartes</label>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => handleColorChange('cartes', '#ffffff')}
              className={`w-8 h-8 rounded-lg border border-gray-300 transition-all hover:scale-110 ${
                currentColors.cartes === '#ffffff' ? 'ring-2 ring-offset-2 ring-gray-400' : ''
              }`}
              style={{ backgroundColor: '#ffffff' }}
            />
            {colorPalette.flatMap(group => 
              group.colors.slice(3).map((color, i) => (
                <button
                  key={`cartes-${group.name}-${i}`}
                  type="button"
                  onClick={() => handleColorChange('cartes', color)}
                  className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
                    currentColors.cartes === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
          <div className="flex flex-wrap gap-1">
            {colorPalette.flatMap(group => 
              group.colors.map((color, i) => (
                <button
                  key={`texte-${group.name}-${i}`}
                  type="button"
                  onClick={() => handleColorChange('texte', color)}
                  className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
                    currentColors.texte === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessusColorPicker
