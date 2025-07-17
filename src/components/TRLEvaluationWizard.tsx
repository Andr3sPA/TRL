"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  InformacionGeneralForm,
  AreasConocimientoForm,
  TransferenciaInnovacionForm,
  ColaboracionFormacionForm,
  InfraestructuraEmprendimientoForm,
} from "./forms"
import { Button } from "./ui/button"
import { api } from "@/trpc/react"

// Definir los tipos de datos para cada formulario
type InformacionGeneralData = Parameters<typeof InformacionGeneralForm>[0]['onNext'] extends (data: infer T) => void ? T : never
type AreasConocimientoData = Parameters<typeof AreasConocimientoForm>[0]['onNext'] extends (data: infer T) => void ? T : never
type TransferenciaInnovacionData = Parameters<typeof TransferenciaInnovacionForm>[0]['onNext'] extends (data: infer T) => void ? T : never
type ColaboracionFormacionData = Parameters<typeof ColaboracionFormacionForm>[0]['onNext'] extends (data: infer T) => void ? T : never
type InfraestructuraEmprendimientoData = Parameters<typeof InfraestructuraEmprendimientoForm>[0]['onSubmit'] extends (data: infer T) => void ? T : never

interface FormData {
  informacionGeneral?: InformacionGeneralData
  areasConocimiento?: AreasConocimientoData
  transferenciaInnovacion?: TransferenciaInnovacionData
  colaboracionFormacion?: ColaboracionFormacionData
  infraestructuraEmprendimiento?: InfraestructuraEmprendimientoData
}

export function TRLEvaluationWizard({ onGoBack }: { onGoBack?: () => void }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  
  const submitFormMutation = api.form.submitForm.useMutation({
    onSuccess: () => {
      alert("¡Evaluación TRL enviada exitosamente!")
      router.push("/")
    },
    onError: (error) => {
      alert(`Error al enviar la evaluación: ${error.message}`)
    }
  })

  const steps = [
    "Información General",
    "Áreas de Conocimiento e Investigación",
    "Transferencia de Tecnología y Participación en Innovación",
    "Colaboración y Formación",
    "Infraestructura y Emprendimiento"
  ]

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleInformacionGeneralSubmit = (data: InformacionGeneralData) => {
    setFormData((prev) => ({ ...prev, informacionGeneral: data }))
    goToNextStep()
  }

  const handleAreasConocimientoSubmit = (data: AreasConocimientoData) => {
    setFormData((prev) => ({ ...prev, areasConocimiento: data }))
    goToNextStep()
  }

  const handleTransferenciaInnovacionSubmit = (data: TransferenciaInnovacionData) => {
    setFormData((prev) => ({ ...prev, transferenciaInnovacion: data }))
    goToNextStep()
  }

  const handleColaboracionFormacionSubmit = (data: ColaboracionFormacionData) => {
    setFormData((prev) => ({ ...prev, colaboracionFormacion: data }))
    goToNextStep()
  }

  const handleInfraestructuraEmprendimientoSubmit = async (data: InfraestructuraEmprendimientoData) => {
    const completeFormData = {
      ...formData,
      infraestructuraEmprendimiento: data
    }
    
    setFormData((prev) => ({ ...prev, infraestructuraEmprendimiento: data }))
    
    // Enviar los datos a través de TRPC
    try {
      await submitFormMutation.mutateAsync({
        answers: completeFormData
      })
    } catch (error) {
      console.error("Error al enviar la evaluación:", error)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <InformacionGeneralForm
            onNext={handleInformacionGeneralSubmit}
            defaultValues={formData.informacionGeneral}
            onGoBack={onGoBack}
          />
        )
      case 1:
        return (
          <AreasConocimientoForm
            onNext={handleAreasConocimientoSubmit}
            onPrevious={goToPreviousStep}
            defaultValues={formData.areasConocimiento}
          />
        )
      case 2:
        return (
          <TransferenciaInnovacionForm
            onNext={handleTransferenciaInnovacionSubmit}
            onPrevious={goToPreviousStep}
            defaultValues={formData.transferenciaInnovacion}
          />
        )
      case 3:
        return (
          <ColaboracionFormacionForm
            onNext={handleColaboracionFormacionSubmit}
            onPrevious={goToPreviousStep}
            defaultValues={formData.colaboracionFormacion}
          />
        )
      case 4:
        return (
          <InfraestructuraEmprendimientoForm
            onSubmit={handleInfraestructuraEmprendimientoSubmit}
            onPrevious={goToPreviousStep}
            defaultValues={formData.infraestructuraEmprendimiento}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Evaluación TRL 
            </h1>
            <span className="text-sm text-gray-600">
              Paso {currentStep + 1} de {steps.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-900">
              {steps[currentStep]}
            </p>
          </div>
        </div>

        {/* Current form */}
        {renderCurrentStep()}
      </div>
    </div>
  )
}
