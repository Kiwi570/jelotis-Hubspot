import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MousePointer2, Info, Loader2, AlertCircle } from 'lucide-react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Component to change map center
function ChangeMapView({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.setView(center, zoom)
    }
  }, [center, zoom, map])
  return null
}

const Step2Map = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [selectedParcelles, setSelectedParcelles] = useState(formData.parcelles || [])
  const [cadastreData, setCadastreData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [geoJsonKey, setGeoJsonKey] = useState(0)

  const { address } = formData
  const center = address ? [address.lat, address.lng] : [46.603354, 1.888334] // France center

  // Fetch cadastre data
  useEffect(() => {
    if (!address) {
      setError('Aucune adresse sélectionnée')
      return
    }

    const fetchCadastreData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const geom = {
          type: "Point",
          coordinates: [address.lng, address.lat]
        }

        const response = await fetch(
          `https://apicarto.ign.fr/api/cadastre/parcelle?geom=${encodeURIComponent(JSON.stringify(geom))}`
        )

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des parcelles')
        }

        const data = await response.json()

        if (!data.features || data.features.length === 0) {
          setError('Aucune parcelle cadastrale trouvée à cette adresse')
          setCadastreData(null)
          return
        }

        // Format the data
        const formattedData = {
          type: "FeatureCollection",
          features: data.features.map((feature, index) => ({
            ...feature,
            id: `parcelle-${index}`,
            properties: {
              ...feature.properties,
              id: `parcelle-${index}`,
              section: feature.properties.section || 'N/A',
              numero: feature.properties.numero || 'N/A',
              surface: feature.properties.contenance || 0
            }
          }))
        }

        setCadastreData(formattedData)
      } catch (err) {
        console.error('Error fetching cadastre data:', err)
        setError('Impossible de charger les parcelles cadastrales. Veuillez réessayer.')
        setCadastreData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCadastreData()
  }, [address])

  const toggleParcelle = (feature) => {
    const parcelleId = feature.properties.id
    const isSelected = selectedParcelles.find(p => p.id === parcelleId)

    let newSelection
    if (isSelected) {
      newSelection = selectedParcelles.filter(p => p.id !== parcelleId)
    } else {
      const newParcelle = {
        id: parcelleId,
        section: feature.properties.section,
        numero: feature.properties.numero,
        surface: Math.round(feature.properties.surface)
      }
      newSelection = [...selectedParcelles, newParcelle]
    }

    setSelectedParcelles(newSelection)

    const surfaceTotale = newSelection.reduce((acc, p) => acc + p.surface, 0)
    updateFormData('parcelles', newSelection)
    updateFormData('surfaceTotale', surfaceTotale)

    // Force GeoJSON to re-render
    setGeoJsonKey(prev => prev + 1)
  }

  const isSelected = (featureId) => {
    return selectedParcelles.some(p => p.id === featureId)
  }

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => toggleParcelle(feature),
      mouseover: (e) => {
        const layer = e.target
        layer.setStyle({
          weight: 3,
          color: '#B87333',
          fillOpacity: 0.7
        })
      },
      mouseout: (e) => {
        const layer = e.target
        const selected = isSelected(feature.properties.id)
        layer.setStyle({
          weight: 2,
          color: selected ? '#B87333' : '#1B4D3E',
          fillColor: selected ? '#B87333' : '#3d7d62',
          fillOpacity: selected ? 0.6 : 0.4
        })
      }
    })

    // Bind popup
    layer.bindPopup(`
      <div style="font-family: sans-serif;">
        <strong>${feature.properties.section} ${feature.properties.numero}</strong><br/>
        Surface: ${Math.round(feature.properties.surface)} m²<br/>
        Commune: ${feature.properties.commune || 'N/A'}
      </div>
    `)
  }

  const style = (feature) => {
    const selected = isSelected(feature.properties.id)
    return {
      fillColor: selected ? '#B87333' : '#3d7d62',
      weight: 2,
      opacity: 1,
      color: selected ? '#B87333' : '#1B4D3E',
      fillOpacity: selected ? 0.6 : 0.4
    }
  }

  const handleContinue = () => {
    if (selectedParcelles.length > 0) {
      nextStep()
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
          Sélectionnez vos parcelles
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Cliquez sur les parcelles cadastrales que vous souhaitez inclure dans votre estimation.
        </p>
      </div>

      {!address && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <p className="text-red-700 font-semibold">Aucune adresse sélectionnée</p>
          <p className="text-red-600 text-sm mt-2">Veuillez retourner à l'étape précédente pour sélectionner une adresse.</p>
        </div>
      )}

      {address && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
              {/* Map header */}
              <div className="bg-forest-700 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MousePointer2 size={20} />
                  <span className="font-medium">
                    {isLoading ? 'Chargement...' : 'Cliquez pour sélectionner'}
                  </span>
                </div>
                <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {address.city || address.label}
                </div>
              </div>

              {/* Map */}
              <div className="relative h-[400px] md:h-[500px]">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-[1000] flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="animate-spin text-forest-600 mx-auto mb-4" size={48} />
                      <p className="text-gray-700 font-medium">Chargement des parcelles cadastrales...</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="absolute inset-0 bg-white z-[1000] flex items-center justify-center p-8">
                    <div className="text-center max-w-md">
                      <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                      <p className="text-red-700 font-semibold mb-2">Erreur</p>
                      <p className="text-gray-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <MapContainer
                  center={center}
                  zoom={17}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={true}
                >
                  <ChangeMapView center={center} zoom={17} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {cadastreData && (
                    <GeoJSON
                      key={geoJsonKey}
                      data={cadastreData}
                      style={style}
                      onEachFeature={onEachFeature}
                    />
                  )}
                </MapContainer>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Selection summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                Parcelles sélectionnées
              </h3>

              {selectedParcelles.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Aucune parcelle sélectionnée. Cliquez sur la carte pour commencer.
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedParcelles.map((parcelle) => (
                    <div
                      key={parcelle.id}
                      className="flex items-center justify-between p-3 bg-forest-50 rounded-xl"
                    >
                      <div>
                        <span className="font-medium text-forest-800">
                          {parcelle.section} {parcelle.numero}
                        </span>
                      </div>
                      <span className="text-forest-600 font-semibold">
                        {parcelle.surface} m²
                      </span>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Surface totale</span>
                      <span className="font-display font-bold text-xl text-copper-600">
                        {selectedParcelles.reduce((acc, p) => acc + p.surface, 0)} m²
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Info box */}
            <div className="bg-copper-50 rounded-2xl p-6 border border-copper-100">
              <div className="flex items-start space-x-3">
                <Info className="text-copper-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold text-copper-800 mb-1">Besoin d'aide ?</h4>
                  <p className="text-copper-700 text-sm">
                    Vous pouvez sélectionner plusieurs parcelles si votre projet concerne un ensemble de terrains.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
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
          onClick={handleContinue}
          disabled={selectedParcelles.length === 0}
          className={`flex items-center space-x-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
            selectedParcelles.length > 0
              ? 'bg-forest-700 text-white hover:bg-forest-600 shadow-lg hover:shadow-xl hover:-translate-y-1'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Continuer</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  )
}

export default Step2Map
