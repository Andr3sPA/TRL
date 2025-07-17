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
  
  const submitFormMutation = api.form.enviarFormulario.useMutation({
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
    
    // Mapear todos los datos del formulario al schema de la base de datos
    const formularioData = {
      // Información General
      nombreCompleto: completeFormData.informacionGeneral?.fullName ?? "",
      rol: completeFormData.informacionGeneral?.role ?? "",
      correoElectronico: completeFormData.informacionGeneral?.email ?? "",
      telefono: completeFormData.informacionGeneral?.phone ?? "",
      horasDedicacion: completeFormData.informacionGeneral?.dedicationHours ?? 0,
      tieneExperiencia: completeFormData.informacionGeneral?.hasExperience ?? "",
      unidadAcademica: completeFormData.informacionGeneral?.academicUnit ?? "",
      tieneEstrategia: completeFormData.informacionGeneral?.hasStrategy ?? "",
      explicacionEstrategia: completeFormData.informacionGeneral?.strategyExplanation ?? null,
      estrategiaSocializada: completeFormData.informacionGeneral?.hasSocializedStrategy ?? "",
      explicacionSocializacion: completeFormData.informacionGeneral?.socializationExplanation ?? null,
      
      // Áreas de Conocimiento e Investigación y Desarrollo
      areasConocimiento1: completeFormData.areasConocimiento?.areasConocimiento1 ?? "",
      areasConocimiento1Observacion: completeFormData.areasConocimiento?.areasConocimiento1Observacion ?? "",
      areasConocimiento2: completeFormData.areasConocimiento?.areasConocimiento2 ?? "",
      areasConocimiento2Observacion: completeFormData.areasConocimiento?.areasConocimiento2Observacion ?? "",
      areasConocimiento3: completeFormData.areasConocimiento?.areasConocimiento3 ?? "",
      areasConocimiento3Observacion: completeFormData.areasConocimiento?.areasConocimiento3Observacion ?? "",
      areasConocimiento4: completeFormData.areasConocimiento?.areasConocimiento4 ?? "",
      areasConocimiento4Observacion: completeFormData.areasConocimiento?.areasConocimiento4Observacion ?? "",
      investigacion1: completeFormData.areasConocimiento?.investigacion1 ?? "",
      investigacion1Observacion: completeFormData.areasConocimiento?.investigacion1Observacion ?? "",
      investigacion2: completeFormData.areasConocimiento?.investigacion2 ?? "",
      investigacion2Observacion: completeFormData.areasConocimiento?.investigacion2Observacion ?? "",
      investigacion3: completeFormData.areasConocimiento?.investigacion3 ?? "",
      investigacion3Observacion: completeFormData.areasConocimiento?.investigacion3Observacion ?? "",
      investigacion4: completeFormData.areasConocimiento?.investigacion4 ?? "",
      investigacion4Observacion: completeFormData.areasConocimiento?.investigacion4Observacion ?? "",
      investigacion5: completeFormData.areasConocimiento?.investigacion5 ?? "",
      investigacion5Observacion: completeFormData.areasConocimiento?.investigacion5Observacion ?? "",
      
      // Transferencia, innovación y relación con el entorno
      entorno1: completeFormData.transferenciaInnovacion?.entorno1 ?? "",
      entorno1Observacion: completeFormData.transferenciaInnovacion?.entorno1Observacion ?? "",
      entorno2: completeFormData.transferenciaInnovacion?.entorno2 ?? "",
      entorno2Observacion: completeFormData.transferenciaInnovacion?.entorno2Observacion ?? "",
      entorno3: completeFormData.transferenciaInnovacion?.entorno3 ?? "",
      entorno3Observacion: completeFormData.transferenciaInnovacion?.entorno3Observacion ?? "",
      transferencia1: completeFormData.transferenciaInnovacion?.transferencia1 ?? "",
      transferencia1Observacion: completeFormData.transferenciaInnovacion?.transferencia1Observacion ?? "",
      transferencia2: completeFormData.transferenciaInnovacion?.transferencia2 ?? "",
      transferencia2Observacion: completeFormData.transferenciaInnovacion?.transferencia2Observacion ?? "",
      transferencia3: completeFormData.transferenciaInnovacion?.transferencia3 ?? "",
      transferencia3Observacion: completeFormData.transferenciaInnovacion?.transferencia3Observacion ?? "",
      
      // Colaboración y Formación
      formacion1: completeFormData.colaboracionFormacion?.formacion1 ?? "",
      formacion1Observacion: completeFormData.colaboracionFormacion?.formacion1Observacion ?? "",
      formacion2: completeFormData.colaboracionFormacion?.formacion2 ?? "",
      formacion2Observacion: completeFormData.colaboracionFormacion?.formacion2Observacion ?? "",
      formacion3: completeFormData.colaboracionFormacion?.formacion3 ?? "",
      formacion3Observacion: completeFormData.colaboracionFormacion?.formacion3Observacion ?? "",
      colaboracion1: completeFormData.colaboracionFormacion?.colaboracion1 ?? "",
      colaboracion1Observacion: completeFormData.colaboracionFormacion?.colaboracion1Observacion ?? "",
      colaboracion2: completeFormData.colaboracionFormacion?.colaboracion2 ?? "",
      colaboracion2Observacion: completeFormData.colaboracionFormacion?.colaboracion2Observacion ?? "",
      colaboracion3: completeFormData.colaboracionFormacion?.colaboracion3 ?? "",
      colaboracion3Observacion: completeFormData.colaboracionFormacion?.colaboracion3Observacion ?? "",
      
      // Infraestructura, recursos y emprendimiento
      infraestructura1: completeFormData.infraestructuraEmprendimiento?.infraestructura1 ?? "",
      infraestructura1Observacion: completeFormData.infraestructuraEmprendimiento?.infraestructura1Observacion ?? "",
      infraestructura2: completeFormData.infraestructuraEmprendimiento?.infraestructura2 ?? "",
      infraestructura2Observacion: completeFormData.infraestructuraEmprendimiento?.infraestructura2Observacion ?? "",
      infraestructura3: completeFormData.infraestructuraEmprendimiento?.infraestructura3 ?? "",
      infraestructura3Observacion: completeFormData.infraestructuraEmprendimiento?.infraestructura3Observacion ?? "",
      infraestructura4: completeFormData.infraestructuraEmprendimiento?.infraestructura4 ?? "",
      infraestructura4Observacion: completeFormData.infraestructuraEmprendimiento?.infraestructura4Observacion ?? "",
      emprendimiento1: completeFormData.infraestructuraEmprendimiento?.emprendimiento1 ?? "",
      emprendimiento1Observacion: completeFormData.infraestructuraEmprendimiento?.emprendimiento1Observacion ?? "",
      emprendimiento2: completeFormData.infraestructuraEmprendimiento?.emprendimiento2 ?? "",
      emprendimiento2Observacion: completeFormData.infraestructuraEmprendimiento?.emprendimiento2Observacion ?? "",
    }
    
    // Enviar los datos a través de TRPC
    try {
      await submitFormMutation.mutateAsync(formularioData)
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
