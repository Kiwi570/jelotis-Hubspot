import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Facebook, Twitter } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'

const BlogPost = () => {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3)

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className={`py-20 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <post.icon className="absolute right-10 top-1/2 -translate-y-1/2 text-white" size={400} />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link 
              to="/blog"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Retour au blog</span>
            </Link>

            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              {post.category}
            </span>

            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={18} />
                <span>{post.readTime} de lecture</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1fr_200px] gap-12">
            {/* Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="sticky top-32">
                <div className="bg-cream rounded-2xl p-6">
                  <h4 className="font-display font-semibold text-gray-900 mb-4">Partager</h4>
                  <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-forest-600 hover:shadow-md transition-all">
                      <Linkedin size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-forest-600 hover:shadow-md transition-all">
                      <Facebook size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-forest-600 hover:shadow-md transition-all">
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>

                <div className="mt-8 bg-forest-700 rounded-2xl p-6 text-white">
                  <h4 className="font-display font-semibold mb-3">Besoin de conseils ?</h4>
                  <p className="text-forest-100 text-sm mb-4">Nos experts sont là pour vous accompagner.</p>
                  <Link to="/contact" className="block text-center bg-white text-forest-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-copper-500 hover:text-white transition-colors">
                    Nous contacter
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-8">
            Articles similaires
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, index) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <span className="text-sm text-forest-600 font-medium">{relatedPost.category}</span>
                <h3 className="font-display font-semibold text-lg text-gray-900 mt-2 group-hover:text-forest-700 transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{relatedPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPost
