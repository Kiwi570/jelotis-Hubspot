import { motion } from 'framer-motion'

const ProcessusTimeline = ({ titre, sousTitre, etapes, couleurs = {} }) => {
  const colors = {
    principale: couleurs.principale || '#15803d',
    fond: couleurs.fond || '#f9fafb',
    titres: couleurs.titres || '#111827',
    cartes: couleurs.cartes || '#ffffff',
    texte: couleurs.texte || '#6b7280'
  }

  return (
    <section className="py-20" style={{ backgroundColor: colors.fond }}>
      <div className="max-w-4xl mx-auto px-4 md:px-8">
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

        <div className="relative">
          {/* Ligne centrale */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 rounded-full"
            style={{ 
              background: `linear-gradient(to bottom, ${colors.principale}33, ${colors.principale}, ${colors.principale}33)` 
            }}
          />

          <div className="space-y-12">
            {etapes.map((etape, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                {/* Cercle central */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-10 border-4"
                  style={{ 
                    backgroundColor: colors.principale,
                    borderColor: colors.fond
                  }}
                >
                  {etape.numero || index + 1}
                </div>

                {/* Carte */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div 
                    className="rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                    style={{ backgroundColor: colors.cartes }}
                  >
                    <h3 
                      className="font-display font-bold text-xl mb-2"
                      style={{ color: colors.titres }}
                    >
                      {etape.titre}
                    </h3>
                    <p className="leading-relaxed" style={{ color: colors.texte }}>
                      {etape.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessusTimeline
