import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-forest-700 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-forest-700 font-display font-bold text-xl">J</span>
              </div>
              <span className="font-display font-bold text-2xl">JeLotis</span>
            </div>
            <p className="text-forest-100 leading-relaxed">
              Experts en division parcellaire. Nous valorisons votre terrain sans frais à avancer.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-forest-600 rounded-full flex items-center justify-center hover:bg-copper-500 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-forest-600 rounded-full flex items-center justify-center hover:bg-copper-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-forest-600 rounded-full flex items-center justify-center hover:bg-copper-500 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-forest-100 hover:text-copper-300 transition-colors">Division parcellaire</Link></li>
              <li><Link to="/services" className="text-forest-100 hover:text-copper-300 transition-colors">Étude de faisabilité</Link></li>
              <li><Link to="/services" className="text-forest-100 hover:text-copper-300 transition-colors">Viabilisation</Link></li>
              <li><Link to="/services" className="text-forest-100 hover:text-copper-300 transition-colors">Accompagnement complet</Link></li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Liens utiles</h4>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-forest-100 hover:text-copper-300 transition-colors">Blog</Link></li>
              <li><Link to="/a-propos" className="text-forest-100 hover:text-copper-300 transition-colors">À propos</Link></li>
              <li><Link to="/contact" className="text-forest-100 hover:text-copper-300 transition-colors">Contact</Link></li>
              <li><a href="#" className="text-forest-100 hover:text-copper-300 transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-copper-400" />
                <span className="text-forest-100">contact@jelotis.fr</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-copper-400" />
                <span className="text-forest-100">01 23 45 67 89</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-copper-400 mt-1" />
                <span className="text-forest-100">France métropolitaine</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-forest-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-forest-200 text-sm">
            © {new Date().getFullYear()} JeLotis. Tous droits réservés.
          </p>
          <p className="text-forest-200 text-sm mt-2 md:mt-0">
            Développement durable • Loi Climat & Résilience • Objectif ZAN
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
