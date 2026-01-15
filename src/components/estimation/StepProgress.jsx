import { Check } from 'lucide-react'

const steps = [
  { id: 1, name: 'Adresse' },
  { id: 2, name: 'Parcelles' },
  { id: 3, name: 'Sélection' },
  { id: 4, name: 'Projet' },
  { id: 5, name: 'Documents' },
  { id: 6, name: 'Contact' },
  { id: 7, name: 'Récap' },
  { id: 8, name: 'Envoi' },
]

const StepProgress = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center space-x-1 md:space-x-2">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Step circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step.id < currentStep
                  ? 'bg-forest-700 text-white'
                  : step.id === currentStep
                  ? 'bg-copper-500 text-white ring-4 ring-copper-200'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.id < currentStep ? (
                <Check size={16} />
              ) : (
                step.id
              )}
            </div>
            <span className={`hidden lg:block text-xs mt-1 ${
              step.id === currentStep ? 'text-copper-600 font-medium' : 'text-gray-400'
            }`}>
              {step.name}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`w-4 md:w-8 h-1 mx-1 rounded transition-all duration-300 ${
                step.id < currentStep ? 'bg-forest-700' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default StepProgress
