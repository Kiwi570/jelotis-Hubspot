import { motion } from 'framer-motion'

const templates = [
  {
    id: 'classique',
    name: 'Classique',
    description: 'Cartes en ligne avec fleches',
    preview: (
      <div className="flex items-center justify-center gap-2 p-3">
        <div className="w-8 h-10 bg-forest-100 rounded flex items-center justify-center text-xs font-bold text-forest-600">1</div>
        <div className="text-forest-300">→</div>
        <div className="w-8 h-10 bg-forest-100 rounded flex items-center justify-center text-xs font-bold text-forest-600">2</div>
        <div className="text-forest-300">→</div>
        <div className="w-8 h-10 bg-forest-100 rounded flex items-center justify-center text-xs font-bold text-forest-600">3</div>
        <div className="text-forest-300">→</div>
        <div className="w-8 h-10 bg-forest-100 rounded flex items-center justify-center text-xs font-bold text-forest-600">4</div>
      </div>
    )
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Ligne verticale alternee',
    preview: (
      <div className="flex flex-col items-center gap-1 p-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 bg-forest-100 rounded text-[8px] flex items-center justify-center">1</div>
          <div className="w-1 h-1 bg-forest-400 rounded-full"></div>
          <div className="w-6 h-4 bg-transparent"></div>
        </div>
        <div className="w-0.5 h-2 bg-forest-300"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 bg-transparent"></div>
          <div className="w-1 h-1 bg-forest-400 rounded-full"></div>
          <div className="w-6 h-4 bg-forest-100 rounded text-[8px] flex items-center justify-center">2</div>
        </div>
        <div className="w-0.5 h-2 bg-forest-300"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 bg-forest-100 rounded text-[8px] flex items-center justify-center">3</div>
          <div className="w-1 h-1 bg-forest-400 rounded-full"></div>
          <div className="w-6 h-4 bg-transparent"></div>
        </div>
      </div>
    )
  },
  {
    id: 'cards',
    name: 'Cards',
    description: 'Grandes cartes colorees',
    preview: (
      <div className="grid grid-cols-2 gap-1 p-3">
        <div className="h-8 bg-gradient-to-br from-forest-500 to-forest-700 rounded text-white text-[8px] flex items-center justify-center font-bold">1</div>
        <div className="h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded text-white text-[8px] flex items-center justify-center font-bold">2</div>
        <div className="h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded text-white text-[8px] flex items-center justify-center font-bold">3</div>
        <div className="h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded text-white text-[8px] flex items-center justify-center font-bold">4</div>
      </div>
    )
  }
]

const TemplateSelector = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Choisissez un design</label>
      
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <motion.button
            key={template.id}
            type="button"
            onClick={() => onChange(template.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-2xl border-2 transition-all ${
              value === template.id
                ? 'border-forest-500 bg-forest-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-forest-300 hover:shadow-md'
            }`}
          >
            {/* Badge selection */}
            {value === template.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-forest-600 text-white rounded-full flex items-center justify-center shadow-md">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}

            {/* Preview */}
            <div className="h-20 bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              {template.preview}
            </div>

            {/* Info */}
            <h4 className={`font-semibold text-sm ${value === template.id ? 'text-forest-700' : 'text-gray-900'}`}>
              {template.name}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {template.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector
