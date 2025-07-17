"use client"

import { TRLEvaluationWizard } from "@/components/TRLEvaluationWizard"
import { useRouter } from "next/navigation"

export default function TRLEvaluationPage() {
  const router = useRouter()

  const handleGoBack = () => {
    router.push("/")
  }

  return <TRLEvaluationWizard onGoBack={handleGoBack} />
}
