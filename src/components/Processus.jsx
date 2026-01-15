import ProcessusClassique from './processus/ProcessusClassique'
import ProcessusTimeline from './processus/ProcessusTimeline'
import ProcessusCards from './processus/ProcessusCards'

const templates = {
  classique: ProcessusClassique,
  timeline: ProcessusTimeline,
  cards: ProcessusCards
}

const defaultEtapes = [
  {
    numero: 1,
    titre: 'Étude préliminaire',
    description: 'Analyse complète par nos experts urbanistes pour évaluer le potentiel de division de votre terrain.'
  },
  {
    numero: 2,
    titre: 'Signature convention AMO',
    description: 'Signature de la convention d\'Assistance à Maîtrise d\'Ouvrage pour officialiser notre collaboration.'
  },
  {
    numero: 3,
    titre: 'Autorisations d\'urbanisme',
    description: 'Dépôt, obtention et affichage des autorisations d\'urbanisme nécessaires à votre projet.'
  },
  {
    numero: 4,
    titre: 'Étude géotechnique G1',
    description: 'Réalisation de l\'étude de sol obligatoire conformément à la loi ELAN.'
  },
  {
    numero: 5,
    titre: 'Passage de la 1ère vente',
    description: 'Accompagnement jusqu\'à la signature chez le notaire pour la première vente de lot.'
  },
  {
    numero: 6,
    titre: 'Viabilisation des parcelles',
    description: 'Coordination des travaux de viabilisation pour les lots restants.'
  }
]

const Processus = ({ pageData }) => {
  // Valeurs forcées (TODO: relier à l'admin plus tard)
  const titre = 'Comment ça marche ?'
  const sousTitre = 'Un processus simple en 6 étapes'
  const etapes = defaultEtapes
  const template = 'timeline'
  const couleurs = {}

  const TemplateComponent = templates[template] || ProcessusTimeline

  return (
    <TemplateComponent
      titre={titre}
      sousTitre={sousTitre}
      etapes={etapes}
      couleurs={couleurs}
    />
  )
}

export default Processus
