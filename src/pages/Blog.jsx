import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, ArrowRight } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data/blogPosts'

const categories = ['Tous', 'Guide', 'Actualité', 'Conseils', 'Réglementation', 'Environnement']

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filteredPosts = activeCategory === 'Tous'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory)

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-forest-700 to-forest-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-copper-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Ressources
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              <span className="font-light">Le</span> <span className="font-bold text-copper-400">Blog</span>
            </h1>
            <p className="text-xl text-forest-100">
              Conseils, guides et actualités sur la division parcellaire et la valorisation foncière.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section ZAN */}
      <section className="py-12 bg-gradient-to-r from-forest-50 to-copper-50 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-8"
          >
            <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Leaf className="text-forest-600" size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display font-bold text-xl md:text-2xl text-dark-green mb-2">
                Loi Climat & Résilience — Objectif ZAN
              </h2>
              <p className="text-gray-600">
                <strong>Zéro Artificialisation Nette :</strong> comprendre les nouvelles contraintes 
                réglementaires et leurs impacts sur la division parcellaire. La densification douce 
                comme solution d'avenir.
              </p>
            </div>
            <Link
              to="/blog/loi-climat-zan"
              className="btn-outline whitespace-nowrap flex items-center gap-2"
            >
              En savoir plus
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-forest-700 text-white'
                    : 'bg-cream text-gray-700 hover:bg-forest-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucun article trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blog
