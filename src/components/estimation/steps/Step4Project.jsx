import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Mountain, Home, Zap, Car, FileText } from 'lucide-react'

const options = {
  topographie: [
    { value: 'plat', label: 'Plat', icon: '🏞️' },
    { value: 'legere_pente', label: 'Légère pente', icon: '⛰️' },
    { value: 'forte_pente', label: 'Forte pente', icon: '🏔️' },
  ],
  typeBien: [
    { value: 'terrain_nu', label: 'Terrain nu', icon: '🌱' },
    { value: 'avec_maison', label: 'Avec maison', icon: '🏠' },
    { value: 'avec_batiment', label: 'Avec bâtiment', icon: '🏢' },
    { value: 'avec_dependance', label: 'Avec dépendance', icon: '🏚️' },
  ],
  viabilisation: [
    { value: 'viabilise', label: 'Entièrement viabilisé', icon: '✅' },
    { value: 'partiel', label: 'Partiellement viabilisé', icon: '🔶' },
    { value: 'non_viabilise', label: 'Non viabilisé', icon: '❌' },
  ],
  acces: [
    { value: 'direct', label: 'Accès direct voie publique', icon: '🛣️' },
    { value: 'servitude', label: 'Servitude de passage', icon: '🚶' },
    { value: 'aucun', label: 'Aucun accès', icon: '🚫' },
  ],
}

const Step4Project = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [projet, setProjet] = useState(formData.projet || {
    topographie: '',
    typeBien: '',
    viabilisation: '',
    acces: '',
    description: ''
  })

  const updateProjet = (field, value) => {
    const newProjet = { ...projet, [field]: value }
    setProjet(newProjet)
    updateFormData('projet', newProjet)
  }

  const isComplete = projet.topographie && projet.typeBien && projet.viabilisation && projet.acces

  const OptionSelector = ({ field, label, icon: Icon, optionsList }) => (
    <div className="space-y-3">
      <label className="flex items-center space-x-2 text-gray-700 font-medium">
        <Icon size={20} className="text-forest-600" />
        <span>{label}</span>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {optionsList.map((option) => (
          <button
            key={option.value}
            onClick={() => updateProjet(field, option.value)}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              projet[field] === option.value
                ? 'border-forest-500 bg-forest-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="text-2xl mb-2">{option.icon}</div>
            <div className={`font-medium text-sm ${
              projet[field] === option.value ? 'text-forest-700' : 'text-gray-700'
            }`}>
              {option.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-forest-100 rounded-full mb-6"
        >
          <FileText className="text-forest-600" size={40} />
        </motion.div>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
          Décrivez votre projet
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Ces informations nous aideront à mieux évaluer le potentiel de votre terrain.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Topographie */}
        <OptionSelector
          field="topographie"
          label="Topographie du terrain"
          icon={Mountain}
          optionsList={options.topographie}
        />

        {/* Type de bien */}
        <OptionSelector
          field="typeBien"
          label="Type de bien"
          icon={Home}
          optionsList={options.typeBien}
        />

        {/* Viabilisation */}
        <OptionSelector
          field="viabilisation"
          label="Viabilisation"
          icon={Zap}
          optionsList={options.viabilisation}
        />

        {/* Accès */}
        <OptionSelector
          field="acces"
          label="Accès à la parcelle"
          icon={Car}
          optionsList={options.acces}
        />

        {/* Description */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-gray-700 font-medium">
            <FileText size={20} className="text-forest-600" />
            <span>Description de votre projet (optionnel)</span>
          </label>
          <textarea
            value={projet.description}
            onChange={(e) => updateProjet('description', e.target.value)}
            placeholder="Décrivez votre projet de division, vos objectifs, contraintes particulières..."
            rows={4}
            className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-forest-500 focus:outline-none transition-colors resize-none"
          />
        </div>
      </motion.div>

      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
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
          disabled={!isComplete}
          className={`flex items-center space-x-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
            isComplete
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

export default Step4Project
