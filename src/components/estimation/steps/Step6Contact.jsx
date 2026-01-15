import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, User, Mail, Phone, Shield, Building, Users } from 'lucide-react'

const Step6Contact = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [contact, setContact] = useState(formData.contact || {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    profil: '',
    nomAgence: '',
    rgpdConsent: false
  })

  const [errors, setErrors] = useState({})

  const updateContact = (field, value) => {
    const newContact = { ...contact, [field]: value }
    setContact(newContact)
    updateFormData('contact', newContact)
    
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone) => {
    return /^[0-9]{10}$/.test(phone.replace(/\s/g, ''))
  }

  const validate = () => {
    const newErrors = {}
    
    if (!contact.profil) newErrors.profil = 'Veuillez sélectionner votre profil'
    if (!contact.nom.trim()) newErrors.nom = 'Le nom est requis'
    if (!contact.prenom.trim()) newErrors.prenom = 'Le prénom est requis'
    if (!contact.email.trim()) newErrors.email = 'L\'email est requis'
    else if (!validateEmail(contact.email)) newErrors.email = 'Email invalide'
    if (!contact.telephone.trim()) newErrors.telephone = 'Le téléphone est requis'
    else if (!validatePhone(contact.telephone)) newErrors.telephone = 'Format invalide (10 chiffres)'
    if (!contact.rgpdConsent) newErrors.rgpdConsent = 'Vous devez accepter la politique de confidentialité'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validate()) {
      nextStep()
    }
  }

  const InputField = ({ icon: Icon, label, field, type = 'text', placeholder }) => (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-gray-700 font-medium">
        <Icon size={18} className="text-forest-600" />
        <span>{label}</span>
      </label>
      <input
        type={type}
        value={contact[field]}
        onChange={(e) => updateContact(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-5 py-4 bg-white border-2 rounded-xl focus:outline-none transition-colors ${
          errors[field]
            ? 'border-red-300 focus:border-red-500'
            : 'border-gray-200 focus:border-forest-500'
        }`}
      />
      {errors[field] && (
        <p className="text-red-500 text-sm flex items-center space-x-1">
          <span>⚠️</span>
          <span>{errors[field]}</span>
        </p>
      )}
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-forest-100 rounded-full mb-6"
        >
          <User className="text-forest-600" size={40} />
        </motion.div>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-dark-green mb-4">
          Vos coordonnées
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Pour finaliser votre demande d'estimation, nous avons besoin de vos informations de contact.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10 space-y-6"
      >
        {/* Profil */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-gray-700 font-medium">
            <Users size={18} className="text-forest-600" />
            <span>Vous êtes *</span>
          </label>
          <select
            value={contact.profil}
            onChange={(e) => updateContact('profil', e.target.value)}
            className={`w-full px-5 py-4 bg-white border-2 rounded-xl focus:outline-none transition-colors appearance-none cursor-pointer ${
              errors.profil
                ? 'border-red-300 focus:border-red-500'
                : 'border-gray-200 focus:border-forest-500'
            }`}
          >
            <option value="">Sélectionnez votre profil</option>
            <option value="proprietaire">Je suis le propriétaire du terrain</option>
            <option value="agent">Je suis un agent/mandataire immobilier ayant le terrain sous mandat</option>
          </select>
          {errors.profil && (
            <p className="text-red-500 text-sm flex items-center space-x-1">
              <span>⚠️</span>
              <span>{errors.profil}</span>
            </p>
          )}
        </div>

        {/* Nom de l'agence (conditionnel) */}
        {contact.profil === 'agent' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <label className="flex items-center space-x-2 text-gray-700 font-medium">
              <Building size={18} className="text-copper-600" />
              <span>Nom de l'agence <span className="text-gray-400">(optionnel)</span></span>
            </label>
            <input
              type="text"
              value={contact.nomAgence}
              onChange={(e) => updateContact('nomAgence', e.target.value)}
              placeholder="Nom de votre agence immobilière"
              className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-500 transition-colors"
            />
          </motion.div>
        )}

        {/* Nom & Prénom */}
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            icon={User}
            label="Nom"
            field="nom"
            placeholder="Dupont"
          />
          <InputField
            icon={User}
            label="Prénom"
            field="prenom"
            placeholder="Jean"
          />
        </div>

        {/* Email */}
        <InputField
          icon={Mail}
          label="Email"
          field="email"
          type="email"
          placeholder="jean.dupont@exemple.fr"
        />

        {/* Téléphone */}
        <InputField
          icon={Phone}
          label="Téléphone"
          field="telephone"
          type="tel"
          placeholder="06 12 34 56 78"
        />

        {/* RGPD Consent */}
        <div className="pt-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={contact.rgpdConsent}
              onChange={(e) => updateContact('rgpdConsent', e.target.checked)}
              className="mt-1 w-5 h-5 text-forest-600 border-gray-300 rounded focus:ring-forest-500"
            />
            <div className="flex-1">
              <span className="text-gray-700">
                J'accepte d'être contacté par JeLotis concernant ma demande d'estimation et je reconnais avoir pris connaissance de la{' '}
                <a href="#" className="text-forest-600 hover:text-forest-700 underline">
                  politique de confidentialité
                </a>
                . *
              </span>
              {errors.rgpdConsent && (
                <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.rgpdConsent}</span>
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Security badge */}
        <div className="flex items-center space-x-3 p-4 bg-forest-50 rounded-xl border border-forest-100">
          <Shield className="text-forest-600 flex-shrink-0" size={24} />
          <p className="text-sm text-forest-700">
            <strong>Vos données sont sécurisées.</strong> Nous ne les partagerons jamais avec des tiers.
          </p>
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
          onClick={handleContinue}
          className="flex items-center space-x-2 px-8 py-4 rounded-full font-semibold text-lg bg-forest-700 text-white hover:bg-forest-600 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <span>Continuer</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  )
}

export default Step6Contact
