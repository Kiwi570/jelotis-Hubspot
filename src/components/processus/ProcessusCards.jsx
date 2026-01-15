import { motion } from 'framer-motion'

const ProcessusCards = ({ titre, sousTitre, etapes, couleurs = {} }) => {
  const colors = {
    principale: couleurs.principale || '#15803d',
    fond: couleurs.fond || '#18181b',
    titres: couleurs.titres || '#ffffff',
    cartes: couleurs.cartes || '#27272a',
    texte: couleurs.texte || '#a1a1aa'
  }

  // Generer des variations de la couleur principale pour les cartes
  const getCardGradient = (index) => {
    const hueShift = index * 30
    return `linear-gradient(135deg, ${colors.principale}, ${colors.principale}dd)`
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

        <div className="grid md:grid-cols-2 gap-6">
          {etapes.map((etape, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative overflow-hidden rounded-3xl p-8 shadow-2xl cursor-pointer"
              style={{ background: getCardGradient(index) }}
            >
              {/* Numero en fond */}
              <div 
                className="absolute -right-4 -top-4 font-display font-bold text-[150px] leading-none"
                style={{ color: 'rgba(255,255,255,0.1)' }}
              >
                {etape.numero || index + 1}
              </div>

              <div className="relative z-10">
                <div 
                  className="w-12 h-12 backdrop-blur-sm rounded-xl flex items-center justify-center font-bold text-xl text-white mb-6"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {etape.numero || index + 1}
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  {etape.titre}
                </h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  {etape.description}
                </p>
              </div>

              {/* Decoration */}
              <div 
                className="absolute bottom-0 left-0 w-full h-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessusCards
