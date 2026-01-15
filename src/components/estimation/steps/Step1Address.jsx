import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, ArrowRight, Locate, Loader2 } from 'lucide-react'

const Step1Address = ({ formData, updateFormData, nextStep }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(formData.address)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  // Search addresses using API Adresse Gouv
  const searchAddresses = async (searchQuery) => {
    if (searchQuery.length < 3) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(searchQuery)}&limit=5&autocomplete=1`
      )
      
      if (!response.ok) {
        throw new Error('Erreur lors de la recherche')
      }

      const data = await response.json()
      
      const formattedSuggestions = data.features.map(feature => ({
        label: feature.properties.label,
        city: feature.properties.city,
        postcode: feature.properties.postcode,
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
      }))

      setSuggestions(formattedSuggestions)
      setShowSuggestions(true)
    } catch (err) {
      console.error('Error fetching addresses:', err)
      setError('Impossible de charger les adresses. Veuillez réessayer.')
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((searchQuery) => searchAddresses(searchQuery), 300),
    []
  )

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    setSelectedAddress(null)
    setError(null)
    
    if (value.length >= 3) {
      debouncedSearch(value)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSelect = (address) => {
    setSelectedAddress(address)
    setQuery(address.label)
    setShowSuggestions(false)
    setSuggestions([])
    updateFormData('address', address)
  }

  const handleContinue = () => {
    if (selectedAddress) {
      nextStep()
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-forest-100 rounded-full mb-6"
        >
          <MapPin className="text-forest-600" size={40} />
        </motion.div>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
          Où se situe votre terrain ?
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Commencez par entrer l'adresse de votre terrain pour localiser les parcelles cadastrales.
        </p>
      </div>

      {/* Search input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true)
            }}
            placeholder="Entrez une adresse (ex: 123 rue de la Mairie, Lyon)"
            className="w-full pl-14 pr-14 py-5 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:border-forest-500 focus:outline-none transition-colors shadow-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="animate-spin text-forest-600" size={24} />
            ) : (
              <button className="p-2 bg-forest-100 rounded-xl text-forest-600 hover:bg-forest-200 transition-colors">
                <Locate size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-10"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSelect(suggestion)}
                className="w-full px-5 py-4 text-left hover:bg-forest-50 transition-colors flex items-center space-x-3 border-b border-gray-100 last:border-0"
              >
                <MapPin className="text-forest-500 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <div className="text-gray-900 font-medium">{suggestion.label}</div>
                  <div className="text-sm text-gray-500">
                    {suggestion.city} • {suggestion.postcode}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* No results message */}
        {!isLoading && query.length >= 3 && suggestions.length === 0 && showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-5 z-10"
          >
            <p className="text-gray-500 text-center">Aucune adresse trouvée. Essayez une recherche différente.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Selected address card */}
      {selectedAddress && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-forest-50 border-2 border-forest-200 rounded-2xl"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-forest-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="text-white" size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{selectedAddress.label}</p>
              <p className="text-sm text-gray-500 mt-1">
                Coordonnées : {selectedAddress.lat.toFixed(4)}, {selectedAddress.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-copper-50 rounded-2xl border border-copper-100"
      >
        <h3 className="font-semibold text-copper-800 mb-2">💡 Conseil</h3>
        <p className="text-copper-700 text-sm">
          Entrez au moins 3 caractères pour voir les suggestions. Si votre terrain n'a pas d'adresse exacte, 
          utilisez celle du terrain voisin ou le nom de la rue la plus proche.
        </p>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex justify-end"
      >
        <button
          onClick={handleContinue}
          disabled={!selectedAddress}
          className={`flex items-center space-x-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
            selectedAddress
              ? 'bg-forest-700 text-white hover:bg-forest-600 shadow-lg hover:shadow-xl hover:-translate-y-1'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Continuer</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  )
}

export default Step1Address
