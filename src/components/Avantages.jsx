import { motion } from 'framer-motion'
import { 
  MapPin, Shield, TrendingUp, Users, Eye, Clock,
  Wallet, FileText, CheckCircle, Home, Landmark, 
  BadgeCheck, Handshake, PiggyBank, Award, Target,
  Zap, Heart, Star, ThumbsUp, Lock
} from 'lucide-react'

const iconMap = {
  MapPin, Shield, TrendingUp, Users, Eye, Clock,
  Wallet, FileText, CheckCircle, Home, Landmark,
  BadgeCheck, Handshake, PiggyBank, Award, Target,
  Zap, Heart, Star, ThumbsUp, Lock
}

const Avantages = ({ pageData }) => {
  const titre = pageData?.avantages?.titre || 'Pourquoi choisir JeLotis ?'
  const items = pageData?.avantages?.items || []

  if (items.length === 0) return null

  return (
    <section className="py-20 bg-white">
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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icone] || Shield
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group rounded-2xl p-8 border hover:shadow-xl transition-all duration-300"
                style={{ 
                  backgroundColor: item.couleurCarte || '#ffffff',
                  borderColor: item.couleurCarte === '#ffffff' ? '#e5e7eb' : 'transparent'
                }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300"
                  style={{ backgroundColor: item.couleurFondIcone || '#dcfce7' }}
                >
                  <IconComponent 
                    style={{ color: item.couleurIcone || '#15803d' }} 
                    size={28} 
                  />
                </div>
                <h3 
                  className="font-display font-bold text-xl mb-3"
                  style={{ color: item.couleurTitre || '#111827' }}
                >
                  {item.titre}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Avantages
