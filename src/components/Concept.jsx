import { motion } from 'framer-motion'
import { Search, FileText, CheckCircle, Compass, Building, Hammer } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Étude de faisabilité',
    description: 'Analyse du PLU et des possibilités'
  },
  {
    icon: FileText,
    title: 'Autorisations',
    description: 'Dépôt et suivi en mairie'
  },
  {
    icon: CheckCircle,
    title: 'Affichage & recours',
    description: 'Gestion réglementaire complète'
  },
  {
    icon: Compass,
    title: 'Géomètre-expert',
    description: 'Bornage et cadastre'
  },
  {
    icon: Building,
    title: 'Étude géotechnique',
    description: 'Analyse de sol (loi ELAN)'
  },
  {
    icon: Hammer,
    title: 'Viabilisation',
    description: 'Coordination des travaux'
  }
]

const Concept = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header avec titre à gauche, texte à droite */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-copper-100 text-copper-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Notre approche
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-dark-green leading-tight">
              Le concept<br />
              <span className="text-copper-500">JeLotis.fr</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
              <strong className="text-dark-green">Une formule clé en main</strong> pour valoriser votre terrain 
              sans aucun frais à avancer. Nos experts prennent en charge l'intégralité du processus.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              De l'étude initiale jusqu'à la vente finale, nous coordonnons tous les intervenants 
              pour maximiser la valeur de votre bien.
            </p>
          </motion.div>
        </div>

        {/* 6 pictos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-copper-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-copper-500 transition-colors">
                <feature.icon className="text-copper-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="font-display font-semibold text-dark-green mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Concept
