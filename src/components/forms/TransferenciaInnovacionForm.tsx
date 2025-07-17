"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ratingOptions = ["0", "1", "2", "3", "4", "5"]

const formSchema = z.object({
  // Relación con el entorno (3 criterios)
  entorno1: z.string({
    required_error: "Calificación requerida",
  }),
  entorno1Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  entorno2: z.string({
    required_error: "Calificación requerida",
  }),
  entorno2Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  entorno3: z.string({
    required_error: "Calificación requerida",
  }),
  entorno3Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  
  // Transferencia de conocimiento e innovación (3 criterios)
  transferencia1: z.string({
    required_error: "Calificación requerida",
  }),
  transferencia1Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  transferencia2: z.string({
    required_error: "Calificación requerida",
  }),
  transferencia2Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  transferencia3: z.string({
    required_error: "Calificación requerida",
  }),
  transferencia3Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
})

interface TransferenciaInnovacionFormProps {
  onNext: (data: z.infer<typeof formSchema>) => void
  onPrevious: () => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
}

export function TransferenciaInnovacionForm({ onNext, onPrevious, defaultValues }: TransferenciaInnovacionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      entorno1: "",
      entorno1Observacion: "",
      entorno2: "",
      entorno2Observacion: "",
      entorno3: "",
      entorno3Observacion: "",
      transferencia1: "",
      transferencia1Observacion: "",
      transferencia2: "",
      transferencia2Observacion: "",
      transferencia3: "",
      transferencia3Observacion: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  const entornoCriterios = [
    {
      key: "entorno1" as const,
      label: "¿Existe interacción sistemática con sectores sociales, productivos o del Estado?",
      description: "Evalúe el nivel de interacción regular y estructurada con diferentes sectores"
    },
    {
      key: "entorno2" as const,
      label: "¿Hay estrategias de articulación con actores del entorno (alianzas, convenios, redes)?",
      description: "Evalúe la existencia de mecanismos formales de articulación con el entorno"
    },
    {
      key: "entorno3" as const,
      label: "¿Se reconoce la importancia del entorno para la estrategia CTI+e?",
      description: "Evalúe el grado de reconocimiento del valor del entorno en la estrategia CTI+e"
    },
  ]

  const transferenciaCriterios = [
    {
      key: "transferencia1" as const,
      label: "¿Se generan procesos de transferencia o apropiación social del conocimiento?",
      description: "Evalúe la existencia de procesos para transferir conocimiento a la sociedad"
    },
    {
      key: "transferencia2" as const,
      label: "¿Existen procesos sistemáticos de innovación (social, tecnológica, educativa, etc.)?",
      description: "Evalúe la presencia de procesos organizados y continuos de innovación"
    },
    {
      key: "transferencia3" as const,
      label: "¿Los procesos de innovación están institucionalizados?",
      description: "Evalúe el nivel de formalización e institucionalización de los procesos de innovación"
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Transferencia, innovación y relación con el entorno</CardTitle>
        <CardDescription>
          Evalúe los criterios relacionados con la relación con el entorno y transferencia de conocimiento (Escala 0-5)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* 🌐 Relación con el entorno */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">🌐 Relación con el entorno</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe los aspectos relacionados con la interacción con el entorno
                </p>
              </div>
              
              {entornoCriterios.map((criterio) => (
                <div key={criterio.key} className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <FormField
                    control={form.control}
                    name={criterio.key}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">{criterio.label}</FormLabel>
                        <p className="text-sm text-muted-foreground mb-2">{criterio.description}</p>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione calificación (0-5)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ratingOptions.map((rating) => (
                              <SelectItem key={rating} value={rating}>
                                {rating} - {rating === "0" ? "No aplica/Sin evidencia" : 
                                         rating === "1" ? "Muy bajo" :
                                         rating === "2" ? "Bajo" :
                                         rating === "3" ? "Medio" :
                                         rating === "4" ? "Alto" : "Muy alto"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${criterio.key}Observacion` as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observación</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Proporcione observaciones específicas sobre este criterio"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            {/* 💡 Transferencia de conocimiento e innovación */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">💡 Transferencia de conocimiento e innovación</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe los aspectos relacionados con transferencia de conocimiento e innovación
                </p>
              </div>
              
              {transferenciaCriterios.map((criterio) => (
                <div key={criterio.key} className="space-y-4 p-4 border rounded-lg bg-muted/20">
                  <FormField
                    control={form.control}
                    name={criterio.key}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">{criterio.label}</FormLabel>
                        <p className="text-sm text-muted-foreground mb-2">{criterio.description}</p>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione calificación (0-5)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ratingOptions.map((rating) => (
                              <SelectItem key={rating} value={rating}>
                                {rating} - {rating === "0" ? "No aplica/Sin evidencia" : 
                                         rating === "1" ? "Muy bajo" :
                                         rating === "2" ? "Bajo" :
                                         rating === "3" ? "Medio" :
                                         rating === "4" ? "Alto" : "Muy alto"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`${criterio.key}Observacion` as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observación</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Proporcione observaciones específicas sobre este criterio"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={onPrevious}>
                Anterior
              </Button>
              <Button type="submit">
                Siguiente
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
