import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle, Home, Mail, Phone, ArrowRight } from 'lucide-react'

const Step8Success = ({ formData }) => {
  const { contact } = formData
  const dossierNumber = `JEL-${Date.now().toString().slice(-6)}`

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="mb-8"
      >
        <div className="inline-flex items-center justify-center w-32 h-32 bg-green-100 rounded-full mb-6">
          <CheckCircle className="text-green-600" size={80} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
          Demande envoyée avec succès ! 🎉
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Merci {contact?.prenom || "Jean"}, votre demande d'estimation a bien été enregistrée.
        </p>
      </motion.div>

      {/* Dossier card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-forest-700 to-forest-800 rounded-3xl p-8 text-white mb-8"
      >
        <p className="text-forest-200 mb-2">Numéro de dossier</p>
        <p className="font-display font-bold text-4xl mb-4">{dossierNumber}</p>
        <p className="text-forest-100">
          Conservez ce numéro pour suivre votre demande
        </p>
      </motion.div>

      {/* Info boxes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="w-12 h-12 bg-copper-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="text-copper-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email de confirmation</h3>
          <p className="text-sm text-gray-600">
            Vous recevrez un récapitulatif à l'adresse {contact?.email || "jean@exemple.fr"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Phone className="text-forest-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Contact sous 48h</h3>
          <p className="text-sm text-gray-600">
            Un expert vous contactera pour analyser votre projet
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="w-12 h-12 bg-copper-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-copper-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Estimation détaillée</h3>
          <p className="text-sm text-gray-600">
            Vous recevrez votre estimation personnalisée par email
          </p>
        </div>
      </motion.div>

      {/* Next steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-forest-50 rounded-2xl p-8 mb-10 border border-forest-100"
      >
        <h3 className="font-display font-semibold text-xl text-gray-900 mb-4">
          Que se passe-t-il maintenant ?
        </h3>
        <div className="text-left max-w-xl mx-auto space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-forest-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900">Analyse de votre dossier</p>
              <p className="text-sm text-gray-600">Nos experts étudient votre terrain et le règlement d'urbanisme local</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-forest-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900">Estimation personnalisée</p>
              <p className="text-sm text-gray-600">Vous recevez un rapport détaillé avec les options de division possibles</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-forest-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900">Rendez-vous téléphonique</p>
              <p className="text-sm text-gray-600">Un expert vous appelle pour répondre à vos questions</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 px-8 py-4 bg-forest-700 text-white rounded-full font-semibold hover:bg-forest-600 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Home size={20} />
          <span>Retour à l'accueil</span>
        </Link>
        <Link
          to="/blog"
          className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-forest-700 text-forest-700 rounded-full font-semibold hover:bg-forest-50 transition-all duration-300"
        >
          <span>Découvrir nos conseils</span>
          <ArrowRight size={20} />
        </Link>
      </motion.div>
    </div>
  )
}

export default Step8Success
