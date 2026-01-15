import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, FileText, CheckCircle, Compass, Building, Hammer, Users,
  ArrowRight, Check, Shield, Clock, Wallet, TrendingUp
} from 'lucide-react'

const services = [
  {
    icon: Search,
    title: "Étude de faisabilité",
    description: "Analyse complète du règlement d'urbanisme et étude des possibilités de division de votre terrain.",
    features: [
      "Analyse du PLU/PLUi",
      "Étude des contraintes",
      "Propositions de division optimales",
      "Estimation de la plus-value"
    ]
  },
  {
    icon: FileText,
    title: "Autorisations d'urbanisme",
    description: "Création et dépôt de la demande d'autorisation d'urbanisme auprès de votre mairie.",
    features: [
      "Déclaration préalable",
      "Permis d'aménager si nécessaire",
      "Suivi du dossier en mairie",
      "Gestion des éventuelles demandes"
    ]
  },
  {
    icon: CheckCircle,
    title: "Affichage et recours",
    description: "Gestion de l'affichage réglementaire et des constats pendant la période de recours.",
    features: [
      "Affichage sur le terrain",
      "2 constats d'huissier",
      "Purge du recours des tiers",
      "Sécurisation juridique"
    ]
  },
  {
    icon: Compass,
    title: "Géomètre-expert",
    description: "Intervention de notre géomètre partenaire pour le bornage et l'enregistrement cadastral.",
    features: [
      "Relevé topographique",
      "Bornage des parcelles",
      "Document d'arpentage",
      "Enregistrement au cadastre"
    ]
  },
  {
    icon: Building,
    title: "Étude géotechnique G1",
    description: "Réalisation de l'étude de sol obligatoire conformément à la loi ELAN.",
    features: [
      "Analyse du sol",
      "Identification des risques",
      "Rapport géotechnique",
      "Conformité loi ELAN"
    ]
  },
  {
    icon: Users,
    title: "Consultation concessionnaires",
    description: "Consultation de l'ensemble des concessionnaires pour les raccordements aux réseaux.",
    features: [
      "Eau potable & assainissement",
      "Électricité & gaz",
      "Télécommunications",
      "Devis détaillés"
    ]
  },
  {
    icon: Hammer,
    title: "Suivi de viabilisation",
    description: "Coordination et supervision des travaux de viabilisation des parcelles.",
    features: [
      "Coordination des travaux",
      "Suivi de chantier",
      "Plans de récolement",
      "Réception des ouvrages"
    ],
    isOptional: true
  }
]

const Services = () => {
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
              Nos prestations
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Une formule <span className="text-copper-400">clé en main</span>
            </h1>
            <p className="text-xl text-forest-100">
              De l'étude initiale à la vente finale, nous gérons l'intégralité de votre projet de division parcellaire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Avantages rapides */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-copper-100 rounded-2xl flex items-center justify-center">
                <TrendingUp className="text-copper-600" size={28} />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-dark-green">Vendez plus cher</div>
                <div className="text-gray-600">+37% de plus-value moyenne</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-forest-100 rounded-2xl flex items-center justify-center">
                <Clock className="text-forest-600" size={28} />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-dark-green">Vendez plus vite</div>
                <div className="text-gray-600">6 à 12 mois en moyenne</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-forest-100 rounded-2xl flex items-center justify-center">
                <Wallet className="text-forest-600" size={28} />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-dark-green">Aucun frais à avancer</div>
                <div className="text-gray-600">Paiement à la vente uniquement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-display font-bold text-4xl text-dark-green mb-6">
              Tout est inclus
            </h2>
            <p className="text-xl text-gray-600">
              Nos experts prennent en charge chaque étape de votre projet de division.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  service.isOptional 
                    ? 'bg-gradient-to-br from-copper-50 to-copper-100 border-2 border-copper-200' 
                    : 'bg-white'
                }`}
              >
                {service.isOptional && (
                  <span className="inline-block bg-copper-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    Option
                  </span>
                )}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  service.isOptional ? 'bg-copper-200' : 'bg-forest-100'
                }`}>
                  <service.icon className={service.isOptional ? 'text-copper-600' : 'text-forest-600'} size={32} />
                </div>
                <h3 className="font-display font-bold text-xl text-dark-green mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <Check className={service.isOptional ? 'text-copper-500 flex-shrink-0' : 'text-forest-500 flex-shrink-0'} size={18} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl text-dark-green mb-6">
              Prêt à valoriser votre terrain ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Obtenez une estimation gratuite et sans engagement de votre projet.
            </p>
            <Link
              to="/estimer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Mon projet JeLotis.fr en 2 clics</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
