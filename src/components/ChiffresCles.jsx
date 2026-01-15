import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Clock, MapPin, Wallet, Award, Users, Home, CheckCircle } from 'lucide-react'

const iconMap = {
  MapPin, TrendingUp, Clock, Wallet, Award, Users, Home, CheckCircle
}

const defaultChiffres = [
  { value: 150, suffix: '+', label: 'Terrains divisés', icon: 'MapPin' },
  { value: 37, suffix: '%', label: 'Plus-value moyenne', icon: 'TrendingUp' },
  { value: 72, suffix: 'h', label: "Délai d'étude moyen", icon: 'Clock' },
  { value: 0, suffix: '€', label: 'Frais à avancer', icon: 'Wallet' },
]

const Counter = ({ target, suffix, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = target
    const increment = end / (duration * 60)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className="font-display font-bold text-5xl md:text-6xl text-white">
      {count}{suffix}
    </span>
  )
}

const ChiffresCles = ({ pageData }) => {
  // Valeurs forcées (TODO: relier à l'admin plus tard)
  const titre = 'Les avantages de JeLotis.fr'
  const sousTitre = 'Pourquoi nous faire confiance'
  const chiffres = defaultChiffres

  return (
    <section className="py-16 bg-gradient-to-r from-forest-700 via-forest-600 to-forest-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            {titre}
          </h2>
          <p className="text-forest-100 text-lg">
            {sousTitre}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {chiffres.map((item, index) => {
            const Icon = iconMap[item.icon] || MapPin
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
                  <Icon className="text-copper-400" size={28} />
                </div>
                <div className="mb-2">
                  <Counter target={item.value} suffix={item.suffix} />
                </div>
                <p className="text-forest-100 font-medium">
                  {item.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ChiffresCles
