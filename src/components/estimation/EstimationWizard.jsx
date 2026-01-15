import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home } from 'lucide-react'
import StepProgress from './StepProgress'
import Step1Address from './steps/Step1Address'
import Step2Map from './steps/Step2Map'
import Step3Recap from './steps/Step3Recap'
import Step4Project from './steps/Step4Project'
import Step5Documents from './steps/Step5Documents'
import Step6Contact from './steps/Step6Contact'
import Step7Summary from './steps/Step7Summary'
import Step8Success from './steps/Step8Success'

const EstimationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    address: null,
    parcelles: [],
    surfaceTotale: 0,
    projet: {
      topographie: '',
      typeBien: '',
      viabilisation: '',
      acces: '',
      description: ''
    },
    documents: [],
    contact: {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      rgpdConsent: false
    }
  })

  const totalSteps = 8

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const renderStep = () => {
    const props = {
      formData,
      updateFormData,
      nextStep,
      prevStep,
      goToStep
    }

    switch (currentStep) {
      case 1:
        return <Step1Address {...props} />
      case 2:
        return <Step2Map {...props} />
      case 3:
        return <Step3Recap {...props} />
      case 4:
        return <Step4Project {...props} />
      case 5:
        return <Step5Documents {...props} />
      case 6:
        return <Step6Contact {...props} />
      case 7:
        return <Step7Summary {...props} />
      case 8:
        return <Step8Success {...props} />
      default:
        return <Step1Address {...props} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-white to-cream">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-forest-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">J</span>
              </div>
              <span className="font-display font-bold text-2xl text-forest-700">
                JeLotis
              </span>
            </Link>

            {/* Progress indicator */}
            <div className="hidden md:block">
              <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            {/* Close button */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-500 hover:text-forest-700 transition-colors"
            >
              <span className="hidden sm:inline text-sm font-medium">Quitter</span>
              <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X size={20} />
              </div>
            </Link>
          </div>

          {/* Mobile progress */}
          <div className="md:hidden mt-4">
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-28 md:pt-24 pb-8 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default EstimationWizard
