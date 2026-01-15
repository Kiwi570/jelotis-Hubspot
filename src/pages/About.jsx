import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Target, Award, Heart, ArrowRight, CheckCircle } from 'lucide-react'

const values = [
  {
    icon: Users,
    title: "Expertise humaine",
    description: "Pas d'IA, de vrais experts locaux qui connaissent votre territoire et ses spécificités."
  },
  {
    icon: Target,
    title: "Transparence",
    description: "Un accompagnement clair à chaque étape, sans frais cachés ni mauvaises surprises."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Des partenaires triés sur le volet : géomètres, notaires, entreprises VRD qualifiés."
  },
  {
    icon: Heart,
    title: "Engagement",
    description: "Votre réussite est notre priorité. Nous nous engageons sur des résultats concrets."
  }
]

const milestones = [
  { number: "+500", label: "Terrains divisés" },
  { number: "98%", label: "Clients satisfaits" },
  { number: "+50%", label: "Plus-value moyenne" },
  { number: "12", label: "Régions couvertes" }
]

const About = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-forest-700 to-forest-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-copper-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              À propos
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Qui sommes-<span className="text-copper-400">nous</span> ?
            </h1>
            <p className="text-xl text-forest-100">
              JeLotis, c'est une équipe d'experts passionnés par la valorisation foncière, 
              au service des propriétaires partout en France.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display font-bold text-4xl md:text-5xl text-forest-700">
                  {milestone.number}
                </div>
                <div className="text-gray-600 mt-2">{milestone.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-forest-100 text-forest-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Notre histoire
              </span>
              <h2 className="font-display font-bold text-4xl text-dark-green mb-6">
                Nés de la volonté de simplifier la division parcellaire
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  JeLotis est né d'un constat simple : trop de propriétaires passent à côté 
                  d'une opportunité de valoriser leur terrain, faute d'accompagnement adapté.
                </p>
                <p>
                  Face à la complexité des démarches administratives, aux multiples intervenants 
                  à coordonner et aux risques financiers, beaucoup renoncent ou vendent leur bien 
                  en dessous de sa valeur réelle.
                </p>
                <p>
                  Notre mission : démocratiser l'accès à la division parcellaire en proposant 
                  une solution clé en main, sans frais à avancer, avec un accompagnement humain 
                  et personnalisé à chaque étape.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-forest-600 to-forest-800 rounded-3xl p-8 text-white">
                <h3 className="font-display font-bold text-2xl mb-6">Notre engagement</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-copper-400 flex-shrink-0 mt-1" size={20} />
                    <span>Étude gratuite et sans engagement de votre terrain</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-copper-400 flex-shrink-0 mt-1" size={20} />
                    <span>Aucun frais à avancer, paiement uniquement à la vente</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-copper-400 flex-shrink-0 mt-1" size={20} />
                    <span>Accompagnement par de vrais experts, pas des algorithmes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-copper-400 flex-shrink-0 mt-1" size={20} />
                    <span>Transparence totale sur les délais et les coûts</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-copper-400 flex-shrink-0 mt-1" size={20} />
                    <span>Réseau de partenaires qualifiés dans toute la France</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block bg-copper-100 text-copper-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Nos valeurs
            </span>
            <h2 className="font-display font-bold text-4xl text-dark-green mb-6">
              Ce qui nous anime au quotidien
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-forest-600" size={32} />
                </div>
                <h3 className="font-display font-semibold text-xl text-dark-green mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Encart Recrutement */}
      <section className="py-12 bg-copper-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-copper-200 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-copper-100 rounded-xl flex items-center justify-center">
                <Users className="text-copper-600" size={28} />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-dark-green">
                  JeLotis.fr recrute !
                </h3>
                <p className="text-gray-600">
                  Agents commerciaux sur toute la France
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="btn-secondary whitespace-nowrap"
            >
              Nous rejoindre
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-forest-700">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl text-white mb-6">
              Prêt à valoriser votre terrain ?
            </h2>
            <p className="text-xl text-forest-100 mb-8">
              Rejoignez les centaines de propriétaires qui nous ont fait confiance.
            </p>
            <Link
              to="/estimer"
              className="inline-flex items-center space-x-2 bg-copper-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-copper-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Mon projet JeLotis.fr en quelques clics</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
