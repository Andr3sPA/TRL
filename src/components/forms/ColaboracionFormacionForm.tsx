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
  // Formación (3 criterios)
  formacion1: z.string({
    required_error: "Calificación requerida",
  }),
  formacion1Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  formacion2: z.string({
    required_error: "Calificación requerida",
  }),
  formacion2Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  formacion3: z.string({
    required_error: "Calificación requerida",
  }),
  formacion3Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  
  // Colaboración (3 criterios)
  colaboracion1: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracion1Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  colaboracion2: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracion2Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  colaboracion3: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracion3Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
})

interface ColaboracionFormacionFormProps {
  onNext: (data: z.infer<typeof formSchema>) => void
  onPrevious: () => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
}

export function ColaboracionFormacionForm({ onNext, onPrevious, defaultValues }: ColaboracionFormacionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      formacion1: "",
      formacion1Observacion: "",
      formacion2: "",
      formacion2Observacion: "",
      formacion3: "",
      formacion3Observacion: "",
      colaboracion1: "",
      colaboracion1Observacion: "",
      colaboracion2: "",
      colaboracion2Observacion: "",
      colaboracion3: "",
      colaboracion3Observacion: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  const formacionCriterios = [
    {
      key: "formacion1" as const,
      label: "¿Se han vinculado estudiantes de pregrado en la estrategia CTI+e?",
      description: "Evalúe el nivel de participación de estudiantes de pregrado en las actividades CTI+e"
    },
    {
      key: "formacion2" as const,
      label: "¿Se han vinculado estudiantes de posgrado en la estrategia CTI+e?",
      description: "Evalúe el nivel de participación de estudiantes de posgrado en las actividades CTI+e"
    },
    {
      key: "formacion3" as const,
      label: "¿Los procesos de formación están articulados con los objetivos de la estrategia?",
      description: "Evalúe la alineación entre los procesos formativos y los objetivos estratégicos de CTI+e"
    },
  ]

  const colaboracionCriterios = [
    {
      key: "colaboracion1" as const,
      label: "¿Existe articulación con otras dependencias de la universidad (facultades, escuelas, institutos, centros)?",
      description: "Evalúe el nivel de coordinación y trabajo conjunto con otras unidades universitarias"
    },
    {
      key: "colaboracion2" as const,
      label: "¿Existen espacios colaborativos internos (seminarios, grupos, redes internas)?",
      description: "Evalúe la existencia de mecanismos formales e informales de colaboración interna"
    },
    {
      key: "colaboracion3" as const,
      label: "¿Se promueve la inter/transdisciplinariedad en el desarrollo de la estrategia?",
      description: "Evalúe el fomento de enfoques inter y transdisciplinarios en las actividades CTI+e"
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Colaboración y Formación</CardTitle>
        <CardDescription>
          Evalúe los criterios relacionados con formación y colaboración en el desarrollo de la estrategia CTI+e (Escala 0-5)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* 👥 Formación */}
            <div className="space-y-6">

              
              {formacionCriterios.map((criterio) => (
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

            {/* 🤝 Colaboración */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">🤝 Colaboración</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe los aspectos relacionados con la colaboración institucional
                </p>
              </div>
              
              {colaboracionCriterios.map((criterio) => (
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
