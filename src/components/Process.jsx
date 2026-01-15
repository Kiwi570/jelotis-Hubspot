import { motion } from 'framer-motion'

const Process = ({ pageData }) => {
  const titre = pageData?.processus?.titre || 'Comment ça marche ?'
  const sousTitre = pageData?.processus?.sousTitre || 'Un processus simple et efficace'
  const etapes = pageData?.processus?.etapes || []

  if (etapes.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-br from-forest-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            {titre}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full border border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-forest-600 to-forest-700 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{etape.numero}</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-4">
                    {etape.titre}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {etape.description}
                  </p>
                </div>

                {index < etapes.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-forest-300">
                      <path d="M12 8L20 16L12 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
