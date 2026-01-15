import { Link, useLocation } from 'react-router-dom'
import { Home, FileText, MessageSquare, Settings, LayoutDashboard } from 'lucide-react'

function AdminSidebar() {
  const location = useLocation()

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/pages', icon: FileText, label: 'Pages' },
    { path: '/admin/blog', icon: Home, label: 'Blog' },
    { path: '/admin/testimonials', icon: MessageSquare, label: 'Témoignages' },
    { path: '/admin/settings', icon: Settings, label: 'Réglages' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-forest-100 text-forest-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default AdminSidebar
