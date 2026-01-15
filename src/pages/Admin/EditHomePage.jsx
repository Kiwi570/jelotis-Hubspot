import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Loader2, Upload, Trash2, Image, Plus, MapPin, TrendingUp, Clock, Wallet, Award, Users, Home, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import AvantageCard from '../../components/admin/ColorIconPicker'
import TemplateSelector from '../../components/admin/TemplateSelector'
import ProcessusColorPicker from '../../components/admin/ProcessusColorPicker'
import { supabase } from '../../config/supabase'

const iconOptionsChiffres = [
  { name: 'MapPin', icon: MapPin },
  { name: 'TrendingUp', icon: TrendingUp },
  { name: 'Clock', icon: Clock },
  { name: 'Wallet', icon: Wallet },
  { name: 'Award', icon: Award },
  { name: 'Users', icon: Users },
  { name: 'Home', icon: Home },
  { name: 'CheckCircle', icon: CheckCircle },
]

function EditHomePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [openAvantage, setOpenAvantage] = useState(null)
  const [openExemple, setOpenExemple] = useState(null)
  const [uploadingImages, setUploadingImages] = useState({})

  const [formData, setFormData] = useState({
    // Hero
    badgeActif: true,
    badgeTexte: '',
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    heroImageUrl: '',
    uploadingImage: false,
    boutonPrincipalTexte: '',
    boutonPrincipalLien: '',
    boutonSecondaireTexte: '',
    boutonSecondaireLien: '',
    carteHautActif: true,
    carteBasActif: true,
    plusValue: 80,
    fees: 0,
    labelPlusValue: '',
    labelFees: '',
    // Chiffres Cles
    chiffresTitre: 'Des résultats concrets',
    chiffresSousTitre: 'La preuve par les chiffres',
    chiffresItems: [
      { value: 150, suffix: '+', label: 'Terrains divisés', icon: 'MapPin' },
      { value: 80, suffix: '%', label: 'Plus-value moyenne', icon: 'TrendingUp' },
      { value: 48, suffix: 'h', label: "Délai d'estimation", icon: 'Clock' },
      { value: 0, suffix: '€', label: 'Frais à avancer', icon: 'Wallet' },
    ],
    // Avantages
    avantagesTitre: '',
    avantagesItems: [],
    // Avant Apres
    avantApresTitre: 'Transformez votre terrain en',
    avantApresTitreHighlight: 'opportunité',
    avantApresSousTitre: 'Découvrez le potentiel caché de votre propriété grâce à la division parcellaire.',
    avantApresExemples: [
      {
        id: 1,
        titre: 'Projet Lyon 3ème',
        imageAvant: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
        imageApres: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
        texteAvant: 'Un grand terrain sous-exploité avec une seule habitation',
        texteApres: '2 lots distincts valorisés, +80% de plus-value générée',
        plusValue: '+80%'
      }
    ],
    // Processus
    processusTitre: '',
    processusSousTitre: '',
    processusTemplate: 'classique',
    processusCouleurs: {},
    processusEtapes: [],
    // Testimonials
    testimonialsActif: true,
    testimonialsNombre: 3,
    // CTA
    ctaTitre: '',
    ctaDescription: '',
    ctaTexteBouton: ''
  })

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('content')
          .eq('page_name', 'home')
          .single()

        if (error) throw error

        if (data && data.content) {
          // Support ancien format (imageAvant/imageApres) + nouveau format (exemples)
          let exemples = data.content.avantApres?.exemples || []
          if (exemples.length === 0 && data.content.avantApres?.imageAvant) {
            exemples = [{
              id: 1,
              titre: 'Exemple de transformation',
              imageAvant: data.content.avantApres.imageAvant,
              imageApres: data.content.avantApres.imageApres,
              texteAvant: data.content.avantApres.texteAvant || '',
              texteApres: data.content.avantApres.texteApres || '',
              plusValue: '+80%'
            }]
          }

          setFormData({
            badgeActif: data.content.hero?.badge?.actif !== false,
            badgeTexte: data.content.hero?.badge?.texte || '',
            heroTitle: data.content.hero?.title || '',
            heroSubtitle: data.content.hero?.subtitle || '',
            heroDescription: data.content.hero?.description || '',
            heroImageUrl: data.content.hero?.imageUrl || '',
            uploadingImage: false,
            boutonPrincipalTexte: data.content.hero?.boutonPrincipal?.texte || '',
            boutonPrincipalLien: data.content.hero?.boutonPrincipal?.lien || '',
            boutonSecondaireTexte: data.content.hero?.boutonSecondaire?.texte || '',
            boutonSecondaireLien: data.content.hero?.boutonSecondaire?.lien || '',
            carteHautActif: data.content.hero?.carteFlottanteHaut?.actif !== false,
            carteBasActif: data.content.hero?.carteFlottanteBas?.actif !== false,
            plusValue: data.content.stats?.plusValue || 80,
            fees: data.content.stats?.fees || 0,
            labelPlusValue: data.content.stats?.labelPlusValue || '',
            labelFees: data.content.stats?.labelFees || '',
            chiffresTitre: data.content.chiffresCles?.titre || 'Des résultats concrets',
            chiffresSousTitre: data.content.chiffresCles?.sousTitre || 'La preuve par les chiffres',
            chiffresItems: data.content.chiffresCles?.items || [
              { value: 150, suffix: '+', label: 'Terrains divisés', icon: 'MapPin' },
              { value: 80, suffix: '%', label: 'Plus-value moyenne', icon: 'TrendingUp' },
              { value: 48, suffix: 'h', label: "Délai d'estimation", icon: 'Clock' },
              { value: 0, suffix: '€', label: 'Frais à avancer', icon: 'Wallet' },
            ],
            avantagesTitre: data.content.avantages?.titre || '',
            avantagesItems: data.content.avantages?.items || [],
            avantApresTitre: data.content.avantApres?.titre || 'Transformez votre terrain en',
            avantApresTitreHighlight: data.content.avantApres?.titreHighlight || 'opportunité',
            avantApresSousTitre: data.content.avantApres?.sousTitre || 'Découvrez le potentiel caché de votre propriété grâce à la division parcellaire.',
            avantApresExemples: exemples.length > 0 ? exemples : [{
              id: 1,
              titre: 'Projet Lyon 3ème',
              imageAvant: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
              imageApres: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
              texteAvant: 'Un grand terrain sous-exploité avec une seule habitation',
              texteApres: '2 lots distincts valorisés, +80% de plus-value générée',
              plusValue: '+80%'
            }],
            processusTitre: data.content.processus?.titre || '',
            processusSousTitre: data.content.processus?.sousTitre || '',
            processusTemplate: data.content.processus?.template || 'classique',
            processusCouleurs: data.content.processus?.couleurs || {},
            processusEtapes: data.content.processus?.etapes || [],
            testimonialsActif: data.content.testimonials?.actif !== false,
            testimonialsNombre: data.content.testimonials?.nombre || 3,
            ctaTitre: data.content.cta?.titre || '',
            ctaDescription: data.content.cta?.description || '',
            ctaTexteBouton: data.content.cta?.texteBouton || ''
          })
        }
      } catch (err) {
        console.error('Erreur chargement:', err)
        setError('Erreur lors du chargement des donnees')
      } finally {
        setLoading(false)
      }
    }

    fetchPageData()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              (name.includes('Value') || name.includes('fees') || name.includes('Nombre')) 
              ? parseInt(value) || 0 
              : value
    }))
  }

  const addAvantage = () => {
    const newItem = {
      icone: 'Shield',
      titre: '',
      description: '',
      couleurIcone: '#15803d',
      couleurFondIcone: '#dcfce7',
      couleurTitre: '#111827',
      couleurCarte: '#ffffff'
    }
    setFormData(prev => ({ ...prev, avantagesItems: [...prev.avantagesItems, newItem] }))
    setOpenAvantage(formData.avantagesItems.length)
  }

  const removeAvantage = (index) => {
    const newItems = formData.avantagesItems.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, avantagesItems: newItems }))
    setOpenAvantage(null)
  }

  const handleAvantageChange = (index, field, value) => {
    const newItems = [...formData.avantagesItems]
    newItems[index][field] = value
    setFormData(prev => ({ ...prev, avantagesItems: newItems }))
  }

  const handleChiffreChange = (index, field, value) => {
    const newItems = [...formData.chiffresItems]
    newItems[index][field] = field === 'value' ? parseInt(value) || 0 : value
    setFormData(prev => ({ ...prev, chiffresItems: newItems }))
  }

  const handleEtapeChange = (index, field, value) => {
    const newEtapes = [...formData.processusEtapes]
    newEtapes[index][field] = value
    setFormData(prev => ({ ...prev, processusEtapes: newEtapes }))
  }

  const addEtape = () => {
    const newEtape = {
      numero: formData.processusEtapes.length + 1,
      titre: '',
      description: ''
    }
    setFormData(prev => ({ ...prev, processusEtapes: [...prev.processusEtapes, newEtape] }))
  }

  const removeEtape = (index) => {
    const newEtapes = formData.processusEtapes.filter((_, i) => i !== index)
    const updatedEtapes = newEtapes.map((etape, i) => ({ ...etape, numero: i + 1 }))
    setFormData(prev => ({ ...prev, processusEtapes: updatedEtapes }))
  }

  // Fonctions pour Avant/Apres exemples
  const addExemple = () => {
    const newExemple = {
      id: Date.now(),
      titre: '',
      imageAvant: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
      imageApres: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      texteAvant: '',
      texteApres: '',
      plusValue: ''
    }
    setFormData(prev => ({ ...prev, avantApresExemples: [...prev.avantApresExemples, newExemple] }))
    setOpenExemple(formData.avantApresExemples.length)
  }

  const removeExemple = (index) => {
    const newExemples = formData.avantApresExemples.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, avantApresExemples: newExemples }))
    setOpenExemple(null)
  }

  const handleExempleChange = (index, field, value) => {
    const newExemples = [...formData.avantApresExemples]
    newExemples[index][field] = value
    setFormData(prev => ({ ...prev, avantApresExemples: newExemples }))
  }

  const handleImageUpload = async (e, field, exempleIndex = null) => {
    const file = e.target.files[0]
    if (!file) return

    const validTypes = ['image/png', 'image/jpeg', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Format non supporte. Utilisez PNG, JPG ou WebP.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image trop lourde. Maximum 2MB.')
      return
    }

    const uploadKey = exempleIndex !== null ? `${field}-${exempleIndex}` : field
    setUploadingImages(prev => ({ ...prev, [uploadKey]: true }))
    setError('')

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${field}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from('hero-images')
        .getPublicUrl(fileName)

      if (exempleIndex !== null) {
        handleExempleChange(exempleIndex, field, publicUrlData.publicUrl)
      } else {
        setFormData(prev => ({ ...prev, [field]: publicUrlData.publicUrl }))
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError("Erreur lors de l'upload: " + err.message)
    } finally {
      setUploadingImages(prev => ({ ...prev, [uploadKey]: false }))
    }
  }

  const handleRemoveImage = (field, exempleIndex = null) => {
    if (exempleIndex !== null) {
      handleExempleChange(exempleIndex, field, '')
    } else {
      setFormData(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      const content = {
        hero: {
          badge: { actif: formData.badgeActif, texte: formData.badgeTexte },
          title: formData.heroTitle,
          subtitle: formData.heroSubtitle,
          description: formData.heroDescription,
          imageUrl: formData.heroImageUrl,
          boutonPrincipal: { texte: formData.boutonPrincipalTexte, lien: formData.boutonPrincipalLien },
          boutonSecondaire: { texte: formData.boutonSecondaireTexte, lien: formData.boutonSecondaireLien },
          carteFlottanteHaut: { actif: formData.carteHautActif },
          carteFlottanteBas: { actif: formData.carteBasActif }
        },
        stats: {
          plusValue: formData.plusValue,
          fees: formData.fees,
          labelPlusValue: formData.labelPlusValue,
          labelFees: formData.labelFees
        },
        chiffresCles: {
          titre: formData.chiffresTitre,
          sousTitre: formData.chiffresSousTitre,
          items: formData.chiffresItems
        },
        avantages: {
          titre: formData.avantagesTitre,
          items: formData.avantagesItems
        },
        avantApres: {
          titre: formData.avantApresTitre,
          titreHighlight: formData.avantApresTitreHighlight,
          sousTitre: formData.avantApresSousTitre,
          exemples: formData.avantApresExemples
        },
        processus: {
          titre: formData.processusTitre,
          sousTitre: formData.processusSousTitre,
          template: formData.processusTemplate,
          couleurs: formData.processusCouleurs,
          etapes: formData.processusEtapes
        },
        testimonials: {
          actif: formData.testimonialsActif,
          nombre: formData.testimonialsNombre
        },
        cta: {
          titre: formData.ctaTitre,
          description: formData.ctaDescription,
          texteBouton: formData.ctaTexteBouton
        }
      }

      const { error } = await supabase
        .from('pages')
        .update({ content })
        .eq('page_name', 'home')

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Erreur sauvegarde:', err)
      setError('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-forest-600" size={32} />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <button onClick={() => navigate('/admin/pages')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            <span>Retour aux pages</span>
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900">Modifier la Page d Accueil</h2>
          <p className="text-gray-600 mt-2">Personnalisez tout le contenu de votre page d accueil</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
            Modifications sauvegardees avec succes !
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION HERO */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              Section Hero
            </h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <input type="checkbox" name="badgeActif" checked={formData.badgeActif} onChange={handleChange} className="w-5 h-5 text-forest-600 rounded focus:ring-forest-500" />
                <label className="text-sm font-medium text-gray-700">Afficher le badge vert</label>
              </div>

              {formData.badgeActif && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Texte du badge</label>
                  <input type="text" name="badgeTexte" value={formData.badgeTexte} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre Principal</label>
                <input type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                <input type="text" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="heroDescription" value={formData.heroDescription} onChange={handleChange} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none" />
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Image size={20} className="mr-2 text-forest-600" />
                  Image Hero (optionnel)
                </h4>
                {formData.heroImageUrl ? (
                  <div className="relative inline-block">
                    <img src={formData.heroImageUrl} alt="Preview" className="w-48 h-48 object-cover rounded-xl border-2 border-forest-200 shadow-md" />
                    <button type="button" onClick={() => handleRemoveImage("heroImageUrl")} className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => handleImageUpload(e, "heroImageUrl")} disabled={uploadingImages.heroImageUrl} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center ${uploadingImages.heroImageUrl ? "border-forest-300 bg-forest-50" : "border-gray-300 hover:border-forest-400"}`}>
                      {uploadingImages.heroImageUrl ? (
                        <Loader2 className="animate-spin text-forest-600 mx-auto" size={32} />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="text-gray-400 mb-2" size={32} />
                          <span className="text-gray-600">Cliquez ou glissez une image</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bouton principal - Texte</label>
                  <input type="text" name="boutonPrincipalTexte" value={formData.boutonPrincipalTexte} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bouton principal - Lien</label>
                  <input type="text" name="boutonPrincipalLien" value={formData.boutonPrincipalLien} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION CHIFFRES CLES */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">📊</span>
              Section Chiffres Cles
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
                <input type="text" name="chiffresTitre" value={formData.chiffresTitre} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                <input type="text" name="chiffresSousTitre" value={formData.chiffresSousTitre} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.chiffresItems.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Chiffre {index + 1}</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Valeur</label>
                          <input type="number" value={item.value} onChange={(e) => handleChiffreChange(index, 'value', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Suffixe</label>
                          <input type="text" value={item.suffix} onChange={(e) => handleChiffreChange(index, 'suffix', e.target.value)} placeholder="%, +, €, h..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                        <input type="text" value={item.label} onChange={(e) => handleChiffreChange(index, 'label', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">Icone</label>
                        <div className="flex flex-wrap gap-2">
                          {iconOptionsChiffres.map(({ name, icon: IconComp }) => (
                            <button
                              key={name}
                              type="button"
                              onClick={() => handleChiffreChange(index, 'icon', name)}
                              className={`p-2 rounded-lg transition-all ${
                                item.icon === name
                                  ? 'bg-forest-600 text-white shadow-md'
                                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <IconComp size={18} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION AVANTAGES */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">⭐</span>
              Section Avantages
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
                <input type="text" name="avantagesTitre" value={formData.avantagesTitre} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
              </div>

              <div className="space-y-4">
                {formData.avantagesItems.map((item, index) => (
                  <AvantageCard
                    key={index}
                    item={item}
                    index={index}
                    onChange={(field, value) => handleAvantageChange(index, field, value)}
                    onRemove={() => removeAvantage(index)}
                    isOpen={openAvantage === index}
                    onToggle={() => setOpenAvantage(openAvantage === index ? null : index)}
                  />
                ))}
              </div>

              <button type="button" onClick={addAvantage} className="w-full py-4 border-2 border-dashed border-forest-300 rounded-xl text-forest-600 hover:bg-forest-50 hover:border-forest-400 transition-all flex items-center justify-center gap-2 font-medium">
                <Plus size={20} />
                Ajouter un avantage
              </button>
            </div>
          </div>

          {/* SECTION AVANT / APRES */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">🔄</span>
              Section Avant / Apres
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                  <input type="text" name="avantApresTitre" value={formData.avantApresTitre} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot en surbrillance</label>
                  <input type="text" name="avantApresTitreHighlight" value={formData.avantApresTitreHighlight} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                <textarea name="avantApresSousTitre" value={formData.avantApresSousTitre} onChange={handleChange} rows={2} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 resize-none" />
              </div>

              {/* Liste des exemples */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Exemples de transformation ({formData.avantApresExemples.length})</h4>
                
                <div className="space-y-4">
                  {formData.avantApresExemples.map((exemple, index) => (
                    <div key={exemple.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      {/* Header accordeon */}
                      <div 
                        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => setOpenExemple(openExemple === index ? null : index)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-copper-600 text-white rounded-xl flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{exemple.titre || 'Nouvel exemple'}</h4>
                            <p className="text-sm text-gray-500">{exemple.plusValue || 'Plus-value non definie'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeExemple(index); }}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                          {openExemple === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>

                      {/* Contenu accordeon */}
                      {openExemple === index && (
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Titre du projet</label>
                              <input type="text" value={exemple.titre} onChange={(e) => handleExempleChange(index, 'titre', e.target.value)} placeholder="Ex: Projet Lyon 3eme" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Plus-value</label>
                              <input type="text" value={exemple.plusValue} onChange={(e) => handleExempleChange(index, 'plusValue', e.target.value)} placeholder="Ex: +80%" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Image AVANT */}
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                                <span className="w-6 h-6 bg-gray-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">1</span>
                                Image AVANT
                              </h5>
                              {exemple.imageAvant ? (
                                <div className="relative">
                                  <img src={exemple.imageAvant} alt="Avant" className="w-full h-32 object-cover rounded-lg" />
                                  <button type="button" onClick={() => handleRemoveImage('imageAvant', index)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ) : (
                                <div className="relative">
                                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => handleImageUpload(e, 'imageAvant', index)} disabled={uploadingImages[`imageAvant-${index}`]} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                  <div className={`border-2 border-dashed rounded-lg p-4 text-center ${uploadingImages[`imageAvant-${index}`] ? 'border-forest-300 bg-forest-50' : 'border-gray-300 hover:border-forest-400'}`}>
                                    {uploadingImages[`imageAvant-${index}`] ? (
                                      <Loader2 className="animate-spin text-forest-600 mx-auto" size={20} />
                                    ) : (
                                      <div className="flex flex-col items-center">
                                        <Upload className="text-gray-400 mb-1" size={20} />
                                        <span className="text-xs text-gray-600">Uploader</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              <div className="mt-2">
                                <input type="text" value={exemple.texteAvant} onChange={(e) => handleExempleChange(index, 'texteAvant', e.target.value)} placeholder="Description avant..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-forest-500" />
                              </div>
                            </div>

                            {/* Image APRES */}
                            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                              <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                                <span className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">2</span>
                                Image APRES
                              </h5>
                              {exemple.imageApres ? (
                                <div className="relative">
                                  <img src={exemple.imageApres} alt="Apres" className="w-full h-32 object-cover rounded-lg" />
                                  <button type="button" onClick={() => handleRemoveImage('imageApres', index)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ) : (
                                <div className="relative">
                                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => handleImageUpload(e, 'imageApres', index)} disabled={uploadingImages[`imageApres-${index}`]} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                  <div className={`border-2 border-dashed rounded-lg p-4 text-center ${uploadingImages[`imageApres-${index}`] ? 'border-green-300 bg-green-100' : 'border-green-300 hover:border-green-400'}`}>
                                    {uploadingImages[`imageApres-${index}`] ? (
                                      <Loader2 className="animate-spin text-green-600 mx-auto" size={20} />
                                    ) : (
                                      <div className="flex flex-col items-center">
                                        <Upload className="text-green-500 mb-1" size={20} />
                                        <span className="text-xs text-green-700">Uploader</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              <div className="mt-2">
                                <input type="text" value={exemple.texteApres} onChange={(e) => handleExempleChange(index, 'texteApres', e.target.value)} placeholder="Description apres..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-forest-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button type="button" onClick={addExemple} className="w-full mt-4 py-4 border-2 border-dashed border-copper-300 rounded-xl text-copper-600 hover:bg-copper-50 hover:border-copper-400 transition-all flex items-center justify-center gap-2 font-medium">
                  <Plus size={20} />
                  Ajouter un exemple
                </button>
              </div>
            </div>
          </div>

          {/* SECTION PROCESSUS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">📋</span>
              Section Processus
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la section</label>
                <input type="text" name="processusTitre" value={formData.processusTitre} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                <input type="text" name="processusSousTitre" value={formData.processusSousTitre} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-transparent" />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <TemplateSelector value={formData.processusTemplate} onChange={(template) => setFormData(prev => ({ ...prev, processusTemplate: template }))} />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">🎨</span>
                  Personnaliser les couleurs
                </h4>
                <ProcessusColorPicker couleurs={formData.processusCouleurs} onChange={(couleurs) => setFormData(prev => ({ ...prev, processusCouleurs: couleurs }))} template={formData.processusTemplate} />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Etapes du processus</h4>
                <div className="space-y-4">
                  {formData.processusEtapes.map((etape, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-forest-600 text-white rounded-xl flex items-center justify-center font-bold">{etape.numero || index + 1}</div>
                          <h4 className="font-medium text-gray-900">Etape {etape.numero || index + 1}</h4>
                        </div>
                        <button type="button" onClick={() => removeEtape(index)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input type="text" value={etape.titre} onChange={(e) => handleEtapeChange(index, 'titre', e.target.value)} placeholder="Titre de l etape" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
                        <textarea value={etape.description} onChange={(e) => handleEtapeChange(index, 'description', e.target.value)} placeholder="Description de l etape" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 resize-none" />
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" onClick={addEtape} className="w-full mt-4 py-4 border-2 border-dashed border-forest-300 rounded-xl text-forest-600 hover:bg-forest-50 hover:border-forest-400 transition-all flex items-center justify-center gap-2 font-medium">
                  <Plus size={20} />
                  Ajouter une etape
                </button>
              </div>
            </div>
          </div>

          {/* SECTION TEMOIGNAGES */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">💬</span>
              Section Temoignages
            </h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <input type="checkbox" name="testimonialsActif" checked={formData.testimonialsActif} onChange={handleChange} className="w-5 h-5 text-forest-600 rounded" />
                <label className="text-sm font-medium text-gray-700">Afficher les temoignages</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de temoignages</label>
                <input type="number" name="testimonialsNombre" value={formData.testimonialsNombre} onChange={handleChange} min="1" max="6" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500" />
              </div>
            </div>
          </div>

          {/* SECTION CTA */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">🚀</span>
              Section CTA
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                <input type="text" name="ctaTitre" value={formData.ctaTitre} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea name="ctaDescription" value={formData.ctaDescription} onChange={handleChange} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton</label>
                <input type="text" name="ctaTexteBouton" value={formData.ctaTexteBouton} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500" />
              </div>
            </div>
          </div>

          {/* BOUTONS SAUVEGARDE */}
          <div className="flex items-center justify-end space-x-4 sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/pages')}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-forest-600 text-white rounded-xl hover:bg-forest-700 disabled:opacity-50 transition-all"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Sauvegarde...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Sauvegarder</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default EditHomePage
