import { motion } from 'framer-motion'

const ProcessusClassique = ({ titre, sousTitre, etapes, couleurs = {} }) => {
  const colors = {
    principale: couleurs.principale || '#15803d',
    fond: couleurs.fond || '#f9fafb',
    titres: couleurs.titres || '#111827',
    cartes: couleurs.cartes || '#ffffff',
    texte: couleurs.texte || '#6b7280'
  }

  return (
    <section className="py-20" style={{ backgroundColor: colors.fond }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="font-display font-bold text-4xl md:text-5xl mb-4"
            style={{ color: colors.titres }}
          >
            {titre}
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.texte }}>
            {sousTitre}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {etapes.map((etape, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div 
                className="rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full"
                style={{ backgroundColor: colors.cartes }}
              >
                <div 
                  className="w-12 h-12 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4"
                  style={{ backgroundColor: colors.principale }}
                >
                  {etape.numero || index + 1}
                </div>
                <h3 
                  className="font-display font-bold text-xl mb-3"
                  style={{ color: colors.titres }}
                >
                  {etape.titre}
                </h3>
                <p className="leading-relaxed" style={{ color: colors.texte }}>
                  {etape.description}
                </p>
              </div>
              {index < etapes.length - 1 && (
                <div 
                  className="hidden lg:block absolute top-10 -right-4 text-2xl"
                  style={{ color: colors.principale, opacity: 0.4 }}
                >
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessusClassique
