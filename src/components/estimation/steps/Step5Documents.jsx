import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Upload, FileText, Image, X, CheckCircle } from 'lucide-react'

const Step5Documents = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [documents, setDocuments] = useState(formData.documents || [])
  const [dragActive, setDragActive] = useState(false)

  // Simulation d'upload pour la maquette
  const handleFiles = (files) => {
    const newDocs = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      type: file.type.includes('image') ? 'image' : 'document'
    }))
    
    const updatedDocs = [...documents, ...newDocs]
    setDocuments(updatedDocs)
    updateFormData('documents', updatedDocs)
  }

  const removeDocument = (id) => {
    const updatedDocs = documents.filter(d => d.id !== id)
    setDocuments(updatedDocs)
    updateFormData('documents', updatedDocs)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  // Pour la maquette, on ajoute des faux documents
  const addFakeDocument = (type) => {
    const fakeDoc = {
      id: Date.now(),
      name: type === 'image' ? `photo_terrain_${documents.length + 1}.jpg` : `document_${documents.length + 1}.pdf`,
      size: Math.floor(Math.random() * 5000000) + 500000,
      type: type
    }
    const updatedDocs = [...documents, fakeDoc]
    setDocuments(updatedDocs)
    updateFormData('documents', updatedDocs)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-forest-100 rounded-full mb-6"
        >
          <Upload className="text-forest-600" size={40} />
        </motion.div>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
          Documents & Photos
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Ajoutez des photos de votre terrain et tout document utile (certificat d'urbanisme, plan...).
        </p>
        <p className="text-sm text-copper-600 mt-2">Cette étape est optionnelle</p>
      </div>

      {/* Upload zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-forest-500 bg-forest-50'
            : 'border-gray-300 bg-white hover:border-forest-400 hover:bg-forest-50/50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          handleFiles(e.dataTransfer.files)
        }}
      >
        <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Upload className="text-forest-600" size={32} />
        </div>
        <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
          Glissez vos fichiers ici
        </h3>
        <p className="text-gray-500 mb-6">ou cliquez pour sélectionner</p>
        
        {/* Fake buttons for demo */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => addFakeDocument('image')}
            className="flex items-center space-x-2 px-6 py-3 bg-forest-700 text-white rounded-full font-medium hover:bg-forest-600 transition-colors"
          >
            <Image size={18} />
            <span>Ajouter une photo</span>
          </button>
          <button
            onClick={() => addFakeDocument('document')}
            className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-forest-700 text-forest-700 rounded-full font-medium hover:bg-forest-50 transition-colors"
          >
            <FileText size={18} />
            <span>Ajouter un document</span>
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Formats acceptés : JPG, PNG, PDF • Max 10 MB par fichier
        </p>
      </motion.div>

      {/* Documents list */}
      {documents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-3"
        >
          <h3 className="font-semibold text-gray-900 mb-4">
            Fichiers ajoutés ({documents.length})
          </h3>
          
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  doc.type === 'image' ? 'bg-blue-100' : 'bg-orange-100'
                }`}>
                  {doc.type === 'image' ? (
                    <Image className="text-blue-600" size={24} />
                  ) : (
                    <FileText className="text-orange-600" size={24} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{doc.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(doc.size)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <button
                  onClick={() => removeDocument(doc.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-copper-50 rounded-2xl border border-copper-100"
      >
        <h3 className="font-semibold text-copper-800 mb-3">📸 Documents utiles</h3>
        <ul className="text-copper-700 text-sm space-y-2">
          <li>• Photos du terrain (vues d'ensemble, accès, limites)</li>
          <li>• Certificat d'urbanisme (si disponible)</li>
          <li>• Plan cadastral ou de bornage</li>
          <li>• Tout document relatif aux servitudes</li>
        </ul>
      </motion.div>

      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex justify-between"
      >
        <button
          onClick={prevStep}
          className="flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </button>

        <button
          onClick={nextStep}
          className="flex items-center space-x-2 px-8 py-4 rounded-full font-semibold text-lg bg-forest-700 text-white hover:bg-forest-600 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <span>{documents.length > 0 ? 'Continuer' : 'Passer cette étape'}</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  )
}

export default Step5Documents
