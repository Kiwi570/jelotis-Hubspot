import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, User, Mail, Phone, MapPin, FileText } from 'lucide-react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    surface: '',
    profil: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulation d'envoi - À remplacer par l'intégration Pipedrive
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 shadow-xl text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
          Demande envoyée !
        </h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre demande. Notre équipe vous contactera sous 48h pour étudier votre projet.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false)
            setFormData({ nom: '', email: '', telephone: '', adresse: '', surface: '', profil: '', message: '' })
          }}
          className="text-forest-700 font-semibold hover:text-forest-600 transition-colors"
        >
          Envoyer une autre demande
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
    >
      <h3 className="font-display font-bold text-2xl text-dark-green mb-2">
        Estimez votre terrain gratuitement
      </h3>
      <p className="text-gray-600 mb-8">
        Remplissez ce formulaire et recevez une estimation sous 48h.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Nom */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 bg-cream border-2 border-transparent rounded-xl focus:border-forest-500 focus:outline-none transition-colors"
              placeholder="Jean Dupont"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 bg-cream border-2 border-transparent rounded-xl focus:border-forest-500 focus:outline-none transition-colors"
              placeholder="jean@exemple.fr"
            />
          </div>
        </div>

        {/* Téléphone */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 bg-cream border-2 border-transparent rounded-xl focus:border-forest-500 focus:outline-none transition-colors"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>

        {/* Surface */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Surface du terrain (m²)
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="surface"
              value={formData.surface}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-cream border-2 border-transparent rounded-xl focus:border-forest-500 focus:outline-none transition-colors"
              placeholder="1500"
            />
          </div>
        </div>

        {/* Adresse */}
        <div className="relative md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse du terrain *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 bg-cream border-2 border-transparent rounded-xl focus:border-forest-500 focus:outline-none transition-colors"
              placeholder="123 rue de la Mairie, 69000 Lyon"
            />
          </div>
        </div>

        {/* Profil */}
        <div className="relative md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vous êtes *
          </label>
          <select
            name="profil"
            value={formData.profil}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 bg-cream border-2 border-transparent rounded-xl focus:border-forest-500 focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="">Sélectionnez votre profil</option>
            <option value="proprietaire">Propriétaire d'un terrain</option>
            <option value="heritier">Héritier / Indivision</option>
            <option value="particulier">Particulier avec un projet</option>
            <option value="partenaire">Je suis agent/mandataire immobilier et souhaite devenir Partenaire de JeLotis.fr</option>
          </select>
        </div>

        {/* Message */}
        <div className="relative md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Décrivez votre projet
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-4 bg-cream border-2 border-transparent rounded-xl focus:border-forest-500 focus:outline-none transition-colors resize-none"
            placeholder="Parlez-nous de votre terrain et de vos objectifs..."
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-8 btn-primary flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Envoi en cours...</span>
          </>
        ) : (
          <>
            <span>Envoyer ma demande</span>
            <Send size={20} />
          </>
        )}
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
      </p>
    </motion.form>
  )
}

export default ContactForm
