import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CTA = ({ pageData }) => {
  const titre = pageData?.cta?.titre || 'Prêt à valoriser votre terrain ?'
  const description = pageData?.cta?.description || 'Obtenez une estimation gratuite en quelques clics.'
  const texteBouton = 'Mon projet JeLotis.fr en 2 clics'

  return (
    <section className="py-20 bg-gradient-to-br from-forest-600 to-forest-800">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            {titre}
          </h2>
          <p className="text-xl text-forest-100 mb-10 max-w-2xl mx-auto">
            {description}
          </p>
          <Link 
            to="/estimer" 
            className="inline-flex items-center space-x-2 bg-white text-forest-700 px-8 py-4 rounded-full font-semibold hover:bg-cream hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <span>{texteBouton}</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
