// Vercel Serverless Function to handle HubSpot integration
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      address,
      parcelles,
      surfaceTotale,
      projet,
      documents,
      contact
    } = req.body

    const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN
    const HUBSPOT_API_URL = 'https://api.hubapi.com'

    if (!HUBSPOT_ACCESS_TOKEN) {
      throw new Error('HubSpot API token not configured')
    }

    const hubspotHeaders = {
      'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    }

    // ========================================
    // 1. Check if contact already exists
    // ========================================
    let contactId = null

    const searchResponse = await fetch(
      `${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`,
      {
        method: 'POST',
        headers: hubspotHeaders,
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'email',
              operator: 'EQ',
              value: contact.email
            }]
          }]
        }),
      }
    )

    if (searchResponse.ok) {
      const searchResult = await searchResponse.json()
      if (searchResult.total > 0) {
        // Contact exists, get their ID
        contactId = searchResult.results[0].id
        console.log('Contact already exists:', contactId)
      }
    }

    // ========================================
    // 2. Create contact if doesn't exist
    // ========================================
    if (!contactId) {
      const contactData = {
        properties: {
          firstname: contact.prenom,
          lastname: contact.nom,
          email: contact.email,
          phone: contact.telephone,
        }
      }

      const contactResponse = await fetch(
        `${HUBSPOT_API_URL}/crm/v3/objects/contacts`,
        {
          method: 'POST',
          headers: hubspotHeaders,
          body: JSON.stringify(contactData),
        }
      )

      if (!contactResponse.ok) {
        const errorData = await contactResponse.json()
        throw new Error(`HubSpot Contact creation failed: ${JSON.stringify(errorData)}`)
      }

      const contactResult = await contactResponse.json()
      contactId = contactResult.id
      console.log('Contact created:', contactId)
    }

    // ========================================
    // 3. Create Deal with custom properties
    // ========================================
    const city = address?.city || address?.label?.split(',')[1]?.trim() || 'Localisation inconnue'
    const dealTitle = `Estimation Terrain - ${city}`

    // Format parcelles info
    const parcellesInfo = parcelles?.map(p => 
      `${p.section} ${p.numero} (${p.surface} m²)`
    ).join('\n') || 'Non renseigné'

    // Combine all info in detail_parcelles
    const fullDetails = `
PARCELLES:
${parcellesInfo}

PROJET:
Topographie: ${projet?.topographie || 'Non renseigné'}
Type de bien: ${projet?.typeBien || 'Non renseigné'}
Viabilisation: ${projet?.viabilisation || 'Non renseigné'}
Accès: ${projet?.acces || 'Non renseigné'}
Description: ${projet?.description || 'Aucune description'}

Documents: ${documents?.length > 0 ? documents.map(d => d.name).join(', ') : 'Aucun document'}
Date de soumission: ${new Date().toLocaleString('fr-FR')}
    `.trim()

    const dealData = {
      properties: {
        dealname: dealTitle,
        // Custom properties (Je Lotis Site Web group)
        adresse_terrain: address?.label || 'Non renseignée',
        coordonnees_gps: address ? `${address.lat}, ${address.lng}` : 'N/A',
        surface_totale: surfaceTotale || 0,
        detail_parcelles: fullDetails,
      }
    }

    const dealResponse = await fetch(
      `${HUBSPOT_API_URL}/crm/v3/objects/deals`,
      {
        method: 'POST',
        headers: hubspotHeaders,
        body: JSON.stringify(dealData),
      }
    )

    if (!dealResponse.ok) {
      const errorData = await dealResponse.json()
      throw new Error(`HubSpot Deal creation failed: ${JSON.stringify(errorData)}`)
    }

    const dealResult = await dealResponse.json()
    const dealId = dealResult.id
    console.log('Deal created:', dealId)

    // ========================================
    // 4. Associate Contact to Deal
    // ========================================
    const associationResponse = await fetch(
      `${HUBSPOT_API_URL}/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}/deal_to_contact`,
      {
        method: 'PUT',
        headers: hubspotHeaders,
      }
    )

    if (!associationResponse.ok) {
      console.error('Association failed, but continuing...')
    } else {
      console.log('Contact associated to deal')
    }

    // ========================================
    // 5. Send to Formspree (email backup)
    // ========================================
    try {
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

      await fetch('https://formspree.io/f/mqaoqelz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formspreeData),
      })
    } catch (formspreeError) {
      console.error('Formspree error (non-blocking):', formspreeError)
    }

    // ========================================
    // Return success
    // ========================================
    return res.status(200).json({
      success: true,
      contactId,
      dealId,
      message: 'Contact and deal created successfully in HubSpot'
    })

  } catch (error) {
    console.error('HubSpot integration error:', error)
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    })
  }
}
