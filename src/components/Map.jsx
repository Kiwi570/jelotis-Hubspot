import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { motion } from 'framer-motion'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Zones d'intervention
const zones = [
  { name: "Paris & Île-de-France", coords: [48.8566, 2.3522] },
  { name: "Lyon & Rhône-Alpes", coords: [45.7640, 4.8357] },
  { name: "Bordeaux & Nouvelle-Aquitaine", coords: [44.8378, -0.5792] },
  { name: "Nantes & Pays de la Loire", coords: [47.2184, -1.5536] },
  { name: "Marseille & PACA", coords: [43.2965, 5.3698] },
  { name: "Toulouse & Occitanie", coords: [43.6047, 1.4442] },
]

const MapComponent = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <span className="inline-block bg-forest-100 text-forest-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Notre réseau
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-dark-green mb-4">
            Nos partenaires sont <span className="text-copper-500">proches de vous</span>
          </h2>
          <p className="text-xl text-gray-600">
            Zéro prise de tête, nous nous occupons de tout grâce à notre réseau d'experts locaux.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl h-[500px]"
        >
          <MapContainer
            center={[46.603354, 1.888334]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {zones.map((zone, index) => (
              <Marker key={index} position={zone.coords} icon={customIcon}>
                <Popup>
                  <div className="font-semibold text-forest-700">{zone.name}</div>
                  <div className="text-sm text-gray-600">Experts disponibles</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        {/* Zone list */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {zones.map((zone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-cream rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-8 h-8 bg-forest-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <div className="text-sm font-medium text-dark-green">{zone.name}</div>
            </motion.div>
          ))}
        </div>

        {/* Interlocuteurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-center font-display font-semibold text-xl text-dark-green mb-6">
            Vos interlocuteurs tout au long du projet
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Experts urbanistes',
              'Géomètres',
              'Géotechniciens',
              'Agences immobilières',
              'Services instructeurs',
              'Communes',
              'Concessionnaires',
              'Entreprises de VRD',
              'Notaires',
              'Acquéreurs'
            ].map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
              >
                <span className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-forest-500' : 'bg-copper-500'}`}></span>
                <span className="text-sm font-medium text-dark-green">{item}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MapComponent
