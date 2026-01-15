import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MapPin, Maximize, Trash2, Plus } from 'lucide-react'

const Step3Recap = ({ formData, updateFormData, nextStep, prevStep, goToStep }) => {
  const { address, parcelles, surfaceTotale } = formData

  const removeParcelle = (id) => {
    const newParcelles = parcelles.filter(p => p.id !== id)
    const newSurface = newParcelles.reduce((acc, p) => acc + p.surface, 0)
    updateFormData('parcelles', newParcelles)
    updateFormData('surfaceTotale', newSurface)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-forest-100 rounded-full mb-6"
        >
          <Maximize className="text-forest-600" size={40} />
        </motion.div>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
          Récapitulatif de votre sélection
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Vérifiez les parcelles sélectionnées avant de continuer.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Address card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center">
              <MapPin className="text-forest-600" size={20} />
            </div>
            <h3 className="font-display font-semibold text-lg text-gray-900">Localisation</h3>
          </div>
          <p className="text-gray-700 font-medium">{address?.label || "123 Rue de la République, 69001 Lyon"}</p>
          <button 
            onClick={() => goToStep(1)}
            className="mt-4 text-sm text-forest-600 hover:text-forest-700 font-medium"
          >
            Modifier l'adresse →
          </button>
        </motion.div>

        {/* Surface card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-copper-500 to-copper-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <h3 className="font-display font-semibold text-lg mb-2 text-copper-100">Surface totale</h3>
          <div className="font-display font-bold text-5xl mb-2">
            {surfaceTotale || 2670} m²
          </div>
          <p className="text-copper-100">
            {parcelles?.length || 3} parcelle{(parcelles?.length || 3) > 1 ? 's' : ''} sélectionnée{(parcelles?.length || 3) > 1 ? 's' : ''}
          </p>
        </motion.div>
      </div>

      {/* Parcelles list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-display font-semibold text-lg text-gray-900">Détail des parcelles</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {(parcelles?.length > 0 ? parcelles : [
            { id: 1, section: "AB", numero: "0123", surface: 850 },
            { id: 2, section: "AB", numero: "0124", surface: 620 },
            { id: 3, section: "AB", numero: "0125", surface: 1200 },
          ]).map((parcelle, index) => (
            <motion.div
              key={parcelle.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center">
                  <span className="font-display font-bold text-forest-700">{index + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Section {parcelle.section} - N° {parcelle.numero}
                  </p>
                  <p className="text-sm text-gray-500">Parcelle cadastrale</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="font-display font-bold text-lg text-forest-700">
                  {parcelle.surface} m²
                </span>
                <button
                  onClick={() => removeParcelle(parcelle.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add more button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => goToStep(2)}
            className="flex items-center space-x-2 text-forest-600 hover:text-forest-700 font-medium"
          >
            <Plus size={18} />
            <span>Ajouter d'autres parcelles</span>
          </button>
        </div>
      </motion.div>

      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex justify-between"
      >
        <button
          onClick={prevStep}
          className="flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </button>

        <button
          onClick={nextStep}
          className="flex items-center space-x-2 px-8 py-4 rounded-full font-semibold text-lg bg-forest-700 text-white hover:bg-forest-600 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <span>Continuer</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  )
}

export default Step3Recap
