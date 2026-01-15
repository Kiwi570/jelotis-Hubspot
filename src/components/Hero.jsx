import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'

const Hero = ({ pageData }) => {
  const [count, setCount] = useState(0)

  // Hero data
  const badgeActif = pageData?.hero?.badge?.actif !== false
  const badgeTexte = pageData?.hero?.badge?.texte || 'Expert en division parcellaire'
  const heroTitle = pageData?.hero?.title || 'Divisez votre terrain.'
  const heroSubtitle = pageData?.hero?.subtitle || 'Multipliez sa valeur.'
  const heroDescription = pageData?.hero?.description || "Transformez votre terrain en opportunité."
  
  const boutonPrincipalTexte = 'Mon projet JeLotis.fr'
  const boutonPrincipalLien = pageData?.hero?.boutonPrincipal?.lien || '/estimer'
  const boutonSecondaireTexte = 'Découvrir nos Prestations'
  const boutonSecondaireLien = pageData?.hero?.boutonSecondaire?.lien || '/services'
  
  const carteHautActif = pageData?.hero?.carteFlottanteHaut?.actif !== false
  const carteHautMin = pageData?.hero?.carteFlottanteHaut?.valeurMin || 30
  const carteHautMax = pageData?.hero?.carteFlottanteHaut?.valeurMax || 80
  const carteHautLabel = pageData?.hero?.carteFlottanteHaut?.label || 'Plus-value'
  
  const carteBasActif = pageData?.hero?.carteFlottanteBas?.actif !== false
  const carteBasTitre = pageData?.hero?.carteFlottanteBas?.titre || 'Sans risque'
  const carteBasSousTitre = pageData?.hero?.carteFlottanteBas?.sousTitre || "0€ d'avance"
  
  // Image Hero (optionnel - remplace l'animation SVG)
  const heroImageUrl = pageData?.hero?.imageUrl || ''
  
  // Stats (valeurs forcées - TODO: relier à l'admin plus tard)
  const plusValue = 37
  const delaiEtude = 72
  const labelPlusValue = 'Plus-value moyenne'
  const labelDelai = "Délai d'étude moyen"

  useEffect(() => {
    const target = plusValue
    const duration = 2000
    const step = target / (duration / 16)
    
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [plusValue])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cream via-white to-forest-50">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-forest-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-copper-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {badgeActif && (
              <div className="inline-flex items-center space-x-2 bg-forest-100 text-forest-700 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-forest-500 rounded-full animate-pulse"></span>
                <span>{badgeTexte}</span>
              </div>
            )}

            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight">
              {heroTitle}
              <span className="block text-forest-700">{heroSubtitle}</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              {heroDescription}
            </p>

            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="font-display font-bold text-4xl md:text-5xl text-copper-500">
                  +{count}%
                </div>
                <div className="text-gray-500 text-sm mt-1">{labelPlusValue}</div>
              </div>
              <div className="w-px h-16 bg-gray-200"></div>
              <div className="text-center">
                <div className="font-display font-bold text-4xl md:text-5xl text-forest-700">
                  {delaiEtude}h
                </div>
                <div className="text-gray-500 text-sm mt-1">{labelDelai}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={boutonPrincipalLien} className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>{boutonPrincipalTexte}</span>
                <ArrowRight size={20} />
              </Link>
              <Link to={boutonSecondaireLien} className="btn-outline inline-flex items-center justify-center">
                {boutonSecondaireTexte}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                {heroImageUrl ? (
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img 
                      src={heroImageUrl} 
                      alt="Division parcellaire" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-forest-100 to-forest-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="0 0 200 200" className="w-full h-full p-8">
                      {/* Terrain initial qui s'efface */}
                      <motion.rect
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 1, duration: 1 }}
                        x="20" y="20" width="160" height="160"
                        fill="#1B4D3E" rx="8"
                      />
                      
                      {/* Lot 1 */}
                      <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                      >
                        <rect x="20" y="20" width="75" height="75" fill="#3d7d62" rx="4" />
                        <text x="57" y="50" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">LOT 1</text>
                        <text x="57" y="65" textAnchor="middle" fill="white" fontSize="8">450m²</text>
                      </motion.g>
                      
                      {/* Lot 2 */}
                      <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.7, duration: 0.5 }}
                      >
                        <rect x="105" y="20" width="75" height="75" fill="#5f9d82" rx="4" />
                        <text x="142" y="50" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">LOT 2</text>
                        <text x="142" y="65" textAnchor="middle" fill="white" fontSize="8">380m²</text>
                      </motion.g>
                      
                      {/* Lot 3 */}
                      <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.9, duration: 0.5 }}
                      >
                        <rect x="20" y="105" width="75" height="75" fill="#89bca5" rx="4" />
                        <text x="57" y="135" textAnchor="middle" fill="#1B4D3E" fontSize="10" fontWeight="bold">LOT 3</text>
                        <text x="57" y="150" textAnchor="middle" fill="#1B4D3E" fontSize="8">420m²</text>
                      </motion.g>
                      
                      {/* Lot 4 (conservé) */}
                      <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.1, duration: 0.5 }}
                      >
                        <rect x="105" y="105" width="75" height="75" fill="#B87333" rx="4" />
                        <text x="142" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MAISON</text>
                        <text x="142" y="150" textAnchor="middle" fill="white" fontSize="8">conservée</text>
                      </motion.g>
                    </svg>
                  </div>
                )}
              </div>

              {carteHautActif && (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-3"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">+{carteHautMin} à {carteHautMax}%</div>
                    <div className="text-sm text-gray-500">{carteHautLabel}</div>
                  </div>
                </motion.div>
              )}

              {carteBasActif && (
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-3"
                >
                  <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center">
                    <Shield className="text-forest-600" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{carteBasTitre}</div>
                    <div className="text-sm text-gray-500">{carteBasSousTitre}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
