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
  // Infraestructura y recursos (4 criterios)
  infraestructura1: z.string({
    required_error: "Calificación requerida",
  }),
  infraestructura1Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  infraestructura2: z.string({
    required_error: "Calificación requerida",
  }),
  infraestructura2Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  infraestructura3: z.string({
    required_error: "Calificación requerida",
  }),
  infraestructura3Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  infraestructura4: z.string({
    required_error: "Calificación requerida",
  }),
  infraestructura4Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  
  // Emprendimiento (2 criterios)
  emprendimiento1: z.string({
    required_error: "Calificación requerida",
  }),
  emprendimiento1Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  emprendimiento2: z.string({
    required_error: "Calificación requerida",
  }),
  emprendimiento2Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
})

interface InfraestructuraEmprendimientoFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  onPrevious: () => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
}

export function InfraestructuraEmprendimientoForm({ onSubmit: onSubmitProp, onPrevious, defaultValues }: InfraestructuraEmprendimientoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      infraestructura1: "",
      infraestructura1Observacion: "",
      infraestructura2: "",
      infraestructura2Observacion: "",
      infraestructura3: "",
      infraestructura3Observacion: "",
      infraestructura4: "",
      infraestructura4Observacion: "",
      emprendimiento1: "",
      emprendimiento1Observacion: "",
      emprendimiento2: "",
      emprendimiento2Observacion: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSubmitProp(values)
  }

  const infraestructuraCriterios = [
    {
      key: "infraestructura1" as const,
      label: "¿La unidad académica cuenta con infraestructura adecuada para la estrategia CTI+e?",
      description: "Evalúe la calidad y adecuación de instalaciones, equipos y recursos físicos"
    },
    {
      key: "infraestructura2" as const,
      label: "¿Existen recursos financieros suficientes para su desarrollo?",
      description: "Evalúe la disponibilidad y suficiencia de recursos económicos para la estrategia"
    },
    {
      key: "infraestructura3" as const,
      label: "¿Se cuenta con recursos humanos especializados?",
      description: "Evalúe la disponibilidad de personal calificado y especializado"
    },
    {
      key: "infraestructura4" as const,
      label: "¿Existe apoyo institucional para sostenibilidad de la estrategia?",
      description: "Evalúe el compromiso y respaldo institucional a largo plazo"
    },
  ]

  const emprendimientoCriterios = [
    {
      key: "emprendimiento1" as const,
      label: "¿Se promueve el emprendimiento derivado de procesos CTI+e?",
      description: "Evalúe las iniciativas de fomento al emprendimiento basado en CTI+e"
    },
    {
      key: "emprendimiento2" as const,
      label: "¿Existen programas, centros o actividades que apoyen el emprendimiento?",
      description: "Evalúe la existencia de estructuras de apoyo al emprendimiento"
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Infraestructura, Recursos y Emprendimiento</CardTitle>
        <CardDescription>
          Evalúe los criterios relacionados con infraestructura, recursos y emprendimiento en la estrategia CTI+e (Escala 0-5)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* 🏢 Infraestructura y recursos */}
            <div className="space-y-6">
              
              {infraestructuraCriterios.map((criterio) => (
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

            {/* 🚀 Emprendimiento */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">🚀 Emprendimiento</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe las actividades y programas de emprendimiento
                </p>
              </div>
              
              {emprendimientoCriterios.map((criterio) => (
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
                Enviar Evaluación
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
