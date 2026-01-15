import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: "Jeanne Martin",
    role: "Propriétaire particulier",
    content: "Je suis extrêmement satisfaite des services de JeLotis. Leur approche professionnelle et leur expertise ont été essentielles pour la réussite de mon projet. J'ai gagné 45% de plus que si j'avais vendu mon terrain en l'état.",
    rating: 5,
    location: "Lyon"
  },
  {
    name: "Pierre Dubois",
    role: "Propriétaire foncier",
    content: "Un accompagnement de qualité du début à la fin. L'équipe a su gérer toutes les démarches administratives avec professionnalisme. Je recommande vivement !",
    rating: 5,
    location: "Bordeaux"
  },
  {
    name: "Marie Lambert",
    role: "Héritière",
    content: "Après avoir hérité d'un grand terrain, je ne savais pas comment le valoriser. JeLotis m'a proposé une solution parfaitement adaptée. Résultat : 3 lots vendus rapidement avec une belle plus-value.",
    rating: 5,
    location: "Nantes"
  }
]

const Testimonials = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block bg-copper-100 text-copper-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
            Ils nous ont fait <span className="text-copper-500">confiance</span>
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez les retours de nos clients satisfaits partout en France.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-forest-700 rounded-full flex items-center justify-center">
                <Quote className="text-white" size={18} />
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-6 pt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-forest-400 to-forest-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role} • {testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
