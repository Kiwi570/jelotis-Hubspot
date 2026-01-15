import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '../components/ContactForm'

const Contact = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-forest-700 to-forest-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-copper-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Contact
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Parlons de votre <span className="text-copper-400">projet</span>
            </h1>
            <p className="text-xl text-forest-100">
              Notre équipe d'experts est à votre écoute pour étudier votre terrain et vous proposer la meilleure solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display font-bold text-3xl text-dark-green mb-6">
                  Comment pouvons-nous vous aider ?
                </h2>
                
                {/* 3 textes d'intro */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-forest-700 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-green mb-1">Vous êtes propriétaire d'un terrain ?</h3>
                      <p className="text-gray-600 text-sm">
                        Rien de plus simple : cliquez sur <a href="/estimer" className="text-copper-500 font-semibold hover:underline">Mon projet JeLotis.fr en 2 clics</a> et suivez les indications. Nous reviendrons vers vous sous 72h en moyenne.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-copper-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-copper-700 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-green mb-1">Vous avez une question ?</h3>
                      <p className="text-gray-600 text-sm">
                        Adressez-nous votre demande via le formulaire ci-contre ou demandez à être contacté par l'un de nos experts par téléphone ou en visio au moment qui vous convient.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-forest-700 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-green mb-1">Vous souhaitez devenir partenaire ?</h3>
                      <p className="text-gray-600 text-sm">
                        Rejoignez notre équipe d'experts ! Complétez le formulaire et sélectionnez « Je suis agent/mandataire immobilier et souhaite devenir Partenaire de JeLotis.fr ».
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
                    <Phone className="text-forest-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                  <a href="tel:0123456789" className="text-forest-600 hover:text-copper-500 transition-colors">
                    01 23 45 67 89
                  </a>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-copper-100 rounded-xl flex items-center justify-center mb-4">
                    <Mail className="text-copper-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:contact@jelotis.fr" className="text-forest-600 hover:text-copper-500 transition-colors">
                    contact@jelotis.fr
                  </a>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="text-forest-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Zone d'intervention</h3>
                  <p className="text-gray-600">France métropolitaine</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-copper-100 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="text-copper-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Disponibilité</h3>
                  <p className="text-gray-600">Lun-Ven : 9h-18h</p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-forest-700 rounded-2xl p-6 text-white">
                <h3 className="font-display font-semibold text-lg mb-4">Pourquoi nous faire confiance ?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-copper-400 rounded-full"></div>
                    <span>+500 terrains divisés avec succès</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-copper-400 rounded-full"></div>
                    <span>98% de clients satisfaits</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-copper-400 rounded-full"></div>
                    <span>0€ de frais à avancer</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-copper-400 rounded-full"></div>
                    <span>Experts locaux dans toute la France</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
