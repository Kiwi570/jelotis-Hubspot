import { motion } from 'framer-motion'
import { FileText, Users, BarChart3 } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useAuth } from '../../contexts/AuthContext'

function AdminDashboard() {
  const { currentUser } = useAuth()

  const stats = [
    { label: 'Pages', value: '4', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { label: 'Articles', value: '0', icon: FileText, color: 'bg-green-100 text-green-600' },
    { label: 'Témoignages', value: '0', icon: Users, color: 'bg-purple-100 text-purple-600' },
  ]

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Bienvenue, {currentUser?.email?.split('@')[0]} ! 👋
          </h2>
          <p className="text-gray-600 mt-2">
            Voici un aperçu de votre site
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            🚀 Prochaines Étapes
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-forest-600 rounded-full"></span>
              <span className="text-gray-700">Modifiez le contenu de la page d'accueil</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="text-gray-500">Ajoutez vos premiers articles de blog</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="text-gray-500">Personnalisez les couleurs du site</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
