import { Link } from 'react-router-dom'
import { FileText, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import AdminLayout from '../../components/admin/AdminLayout'

function AdminPages() {
  const pages = [
    { id: 'home', name: 'Page d\'Accueil', path: '/admin/pages/home' },
    { id: 'services', name: 'Services', path: '/admin/pages/services', disabled: true },
    { id: 'about', name: 'À propos', path: '/admin/pages/about', disabled: true },
    { id: 'contact', name: 'Contact', path: '/admin/pages/contact', disabled: true },
  ]

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Gérer les Pages
          </h2>
          <p className="text-gray-600 mt-2">
            Modifiez le contenu des pages de votre site
          </p>
        </div>

        <div className="space-y-4">
          {pages.map((page) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 ${
                page.disabled ? 'opacity-50' : 'hover:shadow-md'
              } transition-shadow`}
            >
              {page.disabled ? (
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-gray-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{page.name}</h3>
                      <p className="text-sm text-gray-500">Bientôt disponible</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to={page.path} className="p-6 flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center group-hover:bg-forest-200 transition-colors">
                      <FileText className="text-forest-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{page.name}</h3>
                      <p className="text-sm text-gray-500">Cliquez pour modifier</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-gray-600" size={20} />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminPages
