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
  // Infraestructura tecnológica (4 criterios)
  infraestructura1: z.string({
    required_error: "Calificación requerida",
  }),
  infraestructura2: z.string({
    required_error: "Calificación requerida",
  }),
  infraestructura3: z.string({
    required_error: "Calificación requerida",
  }),
  infraestructura4: z.string({
    required_error: "Calificación requerida",
  }),
  infraestructuraObservacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  
  // Gestión del emprendimiento (5 criterios)
  emprendimiento1: z.string({
    required_error: "Calificación requerida",
  }),
  emprendimiento2: z.string({
    required_error: "Calificación requerida",
  }),
  emprendimiento3: z.string({
    required_error: "Calificación requerida",
  }),
  emprendimiento4: z.string({
    required_error: "Calificación requerida",
  }),
  emprendimiento5: z.string({
    required_error: "Calificación requerida",
  }),
  emprendimientoObservacion: z.string().min(10, {
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
      infraestructura2: "",
      infraestructura3: "",
      infraestructura4: "",
      infraestructuraObservacion: "",
      emprendimiento1: "",
      emprendimiento2: "",
      emprendimiento3: "",
      emprendimiento4: "",
      emprendimiento5: "",
      emprendimientoObservacion: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSubmitProp(values)
  }

  const infraestructuraCriterios = [
    {
      key: "infraestructura1" as const,
      label: "Equipamiento especializado",
      description: "Disponibilidad y calidad de equipos científicos y tecnológicos especializados"
    },
    {
      key: "infraestructura2" as const,
      label: "Laboratorios y espacios de investigación",
      description: "Adecuación de instalaciones físicas para actividades de I+D+i"
    },
    {
      key: "infraestructura3" as const,
      label: "Recursos computacionales",
      description: "Capacidad de procesamiento, software especializado y recursos TIC"
    },
    {
      key: "infraestructura4" as const,
      label: "Mantenimiento y actualización",
      description: "Sostenibilidad y actualización continua de la infraestructura tecnológica"
    },
  ]

  const emprendimientoCriterios = [
    {
      key: "emprendimiento1" as const,
      label: "Identificación de oportunidades de negocio",
      description: "Capacidad para identificar y evaluar oportunidades comerciales a partir de la investigación"
    },
    {
      key: "emprendimiento2" as const,
      label: "Desarrollo de planes de negocio",
      description: "Elaboración de modelos de negocio viables y sostenibles"
    },
    {
      key: "emprendimiento3" as const,
      label: "Gestión de incubadoras/aceleradoras",
      description: "Participación en ecosistemas de emprendimiento e incubación"
    },
    {
      key: "emprendimiento4" as const,
      label: "Captación de inversión",
      description: "Acceso a fuentes de financiación para proyectos emprendedores"
    },
    {
      key: "emprendimiento5" as const,
      label: "Escalamiento empresarial",
      description: "Capacidad de crecimiento y expansión de iniciativas emprendedoras"
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Infraestructura y Emprendimiento</CardTitle>
        <CardDescription>
          Evalúe los criterios relacionados con infraestructura tecnológica y gestión del emprendimiento (Escala 0-5)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Infraestructura tecnológica */}
            <div className="space-y-6">
              
              {infraestructuraCriterios.map((criterio) => (
                <FormField
                  key={criterio.key}
                  control={form.control}
                  name={criterio.key}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{criterio.label}</FormLabel>
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
              ))}

              <FormField
                control={form.control}
                name="infraestructuraObservacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones - Infraestructura Tecnológica</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Proporcione observaciones generales sobre la infraestructura tecnológica"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Gestión del emprendimiento */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">Gestión del Emprendimiento</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe las capacidades relacionadas con la gestión del emprendimiento
                </p>
              </div>
              
              {emprendimientoCriterios.map((criterio) => (
                <FormField
                  key={criterio.key}
                  control={form.control}
                  name={criterio.key}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{criterio.label}</FormLabel>
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
              ))}

              <FormField
                control={form.control}
                name="emprendimientoObservacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones - Gestión del Emprendimiento</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Proporcione observaciones generales sobre la gestión del emprendimiento"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
