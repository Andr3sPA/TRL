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
  // Áreas de conocimiento (4 criterios)
  areasConocimiento1: z.string({
    required_error: "Calificación requerida",
  }),
  areasConocimiento2: z.string({
    required_error: "Calificación requerida",
  }),
  areasConocimiento3: z.string({
    required_error: "Calificación requerida",
  }),
  areasConocimiento4: z.string({
    required_error: "Calificación requerida",
  }),
  areasConocimientoObservacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  
  // Investigación y desarrollo (5 criterios)
  investigacion1: z.string({
    required_error: "Calificación requerida",
  }),
  investigacion2: z.string({
    required_error: "Calificación requerida",
  }),
  investigacion3: z.string({
    required_error: "Calificación requerida",
  }),
  investigacion4: z.string({
    required_error: "Calificación requerida",
  }),
  investigacion5: z.string({
    required_error: "Calificación requerida",
  }),
  investigacionObservacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
})

interface AreasConocimientoFormProps {
  onNext: (data: z.infer<typeof formSchema>) => void
  onPrevious: () => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
}

export function AreasConocimientoForm({ onNext, onPrevious, defaultValues }: AreasConocimientoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      areasConocimiento1: "",
      areasConocimiento2: "",
      areasConocimiento3: "",
      areasConocimiento4: "",
      areasConocimientoObservacion: "",
      investigacion1: "",
      investigacion2: "",
      investigacion3: "",
      investigacion4: "",
      investigacion5: "",
      investigacionObservacion: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  const areasConocimientoCriterios = [
    {
      key: "areasConocimiento1",
      label: "Dominio de las áreas de conocimiento específicas",
      description: "Evalúe el nivel de conocimiento en su área específica de investigación"
    },
    {
      key: "areasConocimiento2",
      label: "Comprensión de metodologías de investigación",
      description: "Conocimiento de métodos y técnicas de investigación aplicables"
    },
    {
      key: "areasConocimiento3",
      label: "Conocimiento del estado del arte",
      description: "Manejo actual de literatura y desarrollos en el área"
    },
    {
      key: "areasConocimiento4",
      label: "Integración interdisciplinaria",
      description: "Capacidad de integrar conocimientos de diferentes disciplinas"
    },
  ]

  const investigacionCriterios = [
    {
      key: "investigacion1",
      label: "Formulación de problemas de investigación",
      description: "Capacidad para identificar y formular problemas relevantes"
    },
    {
      key: "investigacion2",
      label: "Diseño de proyectos de investigación",
      description: "Habilidad para estructurar y planificar proyectos de investigación"
    },
    {
      key: "investigacion3",
      label: "Aplicación de metodologías",
      description: "Implementación efectiva de métodos de investigación"
    },
    {
      key: "investigacion4",
      label: "Análisis e interpretación de resultados",
      description: "Capacidad de analizar datos y extraer conclusiones válidas"
    },
    {
      key: "investigacion5",
      label: "Comunicación científica",
      description: "Habilidad para comunicar resultados de investigación"
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Áreas de Conocimiento e Investigación</CardTitle>
        <CardDescription>
          Evalúe los criterios relacionados con el conocimiento y la investigación (Escala 0-5)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Áreas de Conocimiento */}
            <div className="space-y-6">
              
              {areasConocimientoCriterios.map((criterio) => (
                <FormField
                  key={criterio.key}
                  control={form.control}
                  name={criterio.key as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{criterio.label}</FormLabel>
                      <p className="text-sm text-muted-foreground mb-2">{criterio.description}</p>
                      <Select onValueChange={field.onChange} defaultValue={field.value as string}>
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
                name="areasConocimientoObservacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones - Áreas de Conocimiento</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Proporcione observaciones generales sobre las áreas de conocimiento evaluadas"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Investigación y Desarrollo */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">Investigación y Desarrollo</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe las capacidades de investigación y desarrollo
                </p>
              </div>
              
              {investigacionCriterios.map((criterio) => (
                <FormField
                  key={criterio.key}
                  control={form.control}
                  name={criterio.key as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{criterio.label}</FormLabel>
                      <p className="text-sm text-muted-foreground mb-2">{criterio.description}</p>
                      <Select onValueChange={field.onChange} defaultValue={field.value as string}>
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
                name="investigacionObservacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones - Investigación y Desarrollo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Proporcione observaciones generales sobre la investigación y desarrollo evaluados"
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
                Siguiente
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
