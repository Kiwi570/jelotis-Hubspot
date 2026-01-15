import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const defaultExemples = [
  {
    id: 1,
    titre: 'Projet Lyon 3ème',
    imageAvant: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    imageApres: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    texteAvant: '1 lot vendu 230 000€',
    texteApres: '4 lots vendus 377 200€',
    plusValue: '+64%'
  }
]

const AvantApres = ({ pageData }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  // Données forcées (TODO: relier à l'admin plus tard)
  const titre = 'Transformez votre terrain en'
  const titreHighlight = 'opportunité'
  const sousTitre = 'Découvrez le potentiel caché de votre propriété grâce à la division parcellaire.'
  
  // Utiliser les exemples par défaut (ignorer Supabase pour le moment)
  const exemples = defaultExemples

  const currentExemple = exemples[currentIndex] || defaultExemples[0]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % exemples.length)
    setSliderPosition(50)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + exemples.length) % exemples.length)
    setSliderPosition(50)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setSliderPosition(50)
  }

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95)
    setSliderPosition(percentage)
  }

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-copper-100 text-copper-700 rounded-full text-sm font-semibold mb-4">
            Transformation
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            {titre} <span className="text-copper-600">{titreHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {sousTitre}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Titre du projet + Plus-value */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between mb-4"
            >
              <h3 className="font-display font-semibold text-xl text-gray-900">
                {currentExemple.titre}
              </h3>
              {currentExemple.plusValue && (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold">
                  {currentExemple.plusValue} plus-value
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slider container */}
          <div className="relative">
            {/* Navigation arrows */}
            {exemples.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:scale-110 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:scale-110 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image slider */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  ref={containerRef}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none bg-gray-100"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                >
                  {/* Image APRÈS (fond) */}
                  <div className="absolute inset-0">
                    <img
                      src={currentExemple.imageApres}
                      alt="Après"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                      APRÈS
                    </div>
                  </div>

                  {/* Image AVANT (overlay avec clip) */}
                  <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src={currentExemple.imageAvant}
                      alt="Avant"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                      AVANT
                    </div>
                  </div>

                  {/* Slider handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                      <div className="flex items-center space-x-1">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="text-forest-600">
                          <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="text-forest-600">
                          <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots navigation */}
            {exemples.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {exemples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-forest-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 grid md:grid-cols-2 gap-6 text-center"
            >
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-2">Avant</h3>
                <p className="text-gray-600">{currentExemple.texteAvant}</p>
              </div>
              <div className="p-6 bg-green-50 rounded-2xl">
                <h3 className="font-semibold text-green-800 mb-2">Après</h3>
                <p className="text-green-700">{currentExemple.texteApres}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default AvantApres
