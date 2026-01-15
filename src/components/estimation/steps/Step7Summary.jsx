import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, MapPin, Maximize, FileText, Upload, User, Edit, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const Step7Summary = ({ formData, nextStep, prevStep, goToStep }) => {
  const { address, parcelles, surfaceTotale, projet, documents, contact } = formData
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Send to both Formspree (email) and Pipedrive (CRM)
      const promises = []

      // 1. Send to Formspree (email)
      const formspreeData = {
        adresse: address?.label || 'Non renseignée',
        coordonnees: address ? `${address.lat.toFixed(4)}, ${address.lng.toFixed(4)}` : 'N/A',
        parcelles_details: parcelles?.map(p => `${p.section} ${p.numero} (${p.surface} m²)`).join(', ') || 'Aucune',
        surface_totale: `${surfaceTotale || 0} m²`,
        nombre_parcelles: parcelles?.length || 0,
        topographie: projet?.topographie || 'Non renseigné',
        type_bien: projet?.typeBien || 'Non renseigné',
        viabilisation: projet?.viabilisation || 'Non renseigné',
        acces: projet?.acces || 'Non renseigné',
        description: projet?.description || 'Aucune description',
        documents_nombres: documents?.length || 0,
        documents_liste: documents?.map(d => d.name).join(', ') || 'Aucun document',
        nom_complet: `${contact?.prenom || ''} ${contact?.nom || ''}`.trim(),
        email: contact?.email || '',
        telephone: contact?.telephone || '',
        rgpd_consent: contact?.rgpdConsent ? 'Oui' : 'Non',
        date_soumission: new Date().toLocaleString('fr-FR'),
        _subject: '🏡 Nouvelle Estimation Terrain - JeLotis',
        _template: 'box',
        _replyto: contact?.email || '',
      }

      promises.push(
        fetch('https://formspree.io/f/mqaoqelz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formspreeData),
        })
      )

      // 2. Send to Pipedrive via our backend
      promises.push(
        fetch('/api/submit-estimation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address,
            parcelles,
            surfaceTotale,
            projet,
            documents,
            contact,
          }),
        })
      )

      // Wait for both requests
      const [formspreeResponse, pipedriveResponse] = await Promise.all(promises)

      // Check responses
      if (!formspreeResponse.ok) {
        console.error('Formspree error:', await formspreeResponse.text())
      }

      if (!pipedriveResponse.ok) {
        const pipedriveError = await pipedriveResponse.json()
        console.error('Pipedrive error:', pipedriveError)
        // Don't fail completely if Pipedrive fails, as Formspree email still works
      }

      // Success - go to next step
      nextStep()
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const SummarySection = ({ title, icon: Icon, children, editStep }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-forest-100 rounded-xl flex items-center justify-center">
            <Icon className="text-forest-600" size={20} />
          </div>
          <h3 className="font-display font-semibold text-lg text-gray-900">{title}</h3>
        </div>
        <button
          onClick={() => goToStep(editStep)}
          className="flex items-center space-x-1 text-sm text-forest-600 hover:text-forest-700 font-medium"
        >
          <Edit size={16} />
          <span>Modifier</span>
        </button>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-copper-100 rounded-full mb-6"
        >
          <FileText className="text-copper-600" size={40} />
        </motion.div>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
          Récapitulatif de votre demande
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Vérifiez les informations avant d'envoyer votre demande d'estimation.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3"
        >
          <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
          <p className="text-red-700">{error}</p>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <SummarySection title="Localisation" icon={MapPin} editStep={1}>
          <p className="text-gray-700 font-medium">
            {address?.label || "123 Rue de la République, 69001 Lyon"}
          </p>
        </SummarySection>

        <SummarySection title="Surface totale" icon={Maximize} editStep={3}>
          <div className="text-center py-4">
            <div className="font-display font-bold text-4xl text-copper-600 mb-2">
              {surfaceTotale || 2670} m²
            </div>
            <p className="text-gray-600">
              {(parcelles?.length || 3)} parcelle{((parcelles?.length || 3) > 1) ? 's' : ''} sélectionnée{((parcelles?.length || 3) > 1) ? 's' : ''}
            </p>
          </div>
        </SummarySection>

        <SummarySection title="Parcelles cadastrales" icon={Maximize} editStep={2}>
          {(parcelles?.length > 0 ? parcelles : [
            { id: 1, section: "AB", numero: "0123", surface: 850 },
            { id: 2, section: "AB", numero: "0124", surface: 620 },
            { id: 3, section: "AB", numero: "0125", surface: 1200 },
          ]).map((parcelle) => (
            <InfoRow
              key={parcelle.id}
              label={`${parcelle.section} ${parcelle.numero}`}
              value={`${parcelle.surface} m²`}
            />
          ))}
        </SummarySection>

        <SummarySection title="Informations projet" icon={FileText} editStep={4}>
          <InfoRow label="Topographie" value={projet?.topographie || "Plat"} />
          <InfoRow label="Type de bien" value={projet?.typeBien || "Terrain nu"} />
          <InfoRow label="Viabilisation" value={projet?.viabilisation || "Partielle"} />
          <InfoRow label="Accès" value={projet?.acces || "Direct"} />
          {projet?.description && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600 italic">{projet.description}</p>
            </div>
          )}
        </SummarySection>

        <SummarySection title="Documents" icon={Upload} editStep={5}>
          {documents?.length > 0 ? (
            documents.map((doc) => (
              <div key={doc.id} className="flex items-center space-x-2 text-sm">
                <FileText size={16} className="text-gray-400" />
                <span className="text-gray-700">{doc.name}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Aucun document ajouté</p>
          )}
        </SummarySection>

        <SummarySection title="Vos coordonnées" icon={User} editStep={6}>
          <InfoRow label="Nom" value={`${contact?.prenom || "Jean"} ${contact?.nom || "Dupont"}`} />
          <InfoRow label="Email" value={contact?.email || "jean.dupont@exemple.fr"} />
          <InfoRow label="Téléphone" value={contact?.telephone || "06 12 34 56 78"} />
        </SummarySection>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 p-6 bg-forest-50 rounded-2xl border border-forest-200"
      >
        <h3 className="font-semibold text-forest-800 mb-2">📋 Prochaines étapes</h3>
        <ul className="text-forest-700 space-y-2">
          <li>✓ Notre équipe analysera votre dossier sous 48h</li>
          <li>✓ Vous recevrez une estimation détaillée par email</li>
          <li>✓ Un expert vous contactera pour discuter des options</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 flex justify-between"
      >
        <button
          onClick={prevStep}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`flex items-center space-x-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-copper-500 text-white hover:bg-copper-600 shadow-lg hover:shadow-xl hover:-translate-y-1'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Envoyer ma demande</span>
            </>
          )}
        </button>
      </motion.div>
    </div>
  )
}

export default Step7Summary
