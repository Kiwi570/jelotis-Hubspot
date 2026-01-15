import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Clock } from 'lucide-react'

const BlogCard = ({ post, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-90`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <post.icon className="text-white/30" size={120} />
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 backdrop-blur text-white text-sm px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h3 className="font-display font-semibold text-xl text-gray-900 mb-3 group-hover:text-forest-700 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-6 line-clamp-2">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center space-x-2 text-forest-700 font-semibold hover:text-copper-500 transition-colors"
        >
          <span>Lire l'article</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  )
}

export default BlogCard
