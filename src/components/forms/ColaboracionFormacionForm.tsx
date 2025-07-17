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
  // Colaboración con industria y actores (7 criterios)
  colaboracion1: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracion2: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracion3: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracion4: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracion5: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracion6: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracion7: z.string({
    required_error: "Calificación requerida",
  }),
  colaboracionObservacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  
  // Formación y desarrollo de recursos humanos (7 criterios)
  formacion1: z.string({
    required_error: "Calificación requerida",
  }),
  formacion2: z.string({
    required_error: "Calificación requerida",
  }),
  formacion3: z.string({
    required_error: "Calificación requerida",
  }),
  formacion4: z.string({
    required_error: "Calificación requerida",
  }),
  formacion5: z.string({
    required_error: "Calificación requerida",
  }),
  formacion6: z.string({
    required_error: "Calificación requerida",
  }),
  formacion7: z.string({
    required_error: "Calificación requerida",
  }),
  formacionObservacion: z.string().min(10, {
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
    defaultValues: defaultValues || {
      colaboracion1: "",
      colaboracion2: "",
      colaboracion3: "",
      colaboracion4: "",
      colaboracion5: "",
      colaboracion6: "",
      colaboracion7: "",
      colaboracionObservacion: "",
      formacion1: "",
      formacion2: "",
      formacion3: "",
      formacion4: "",
      formacion5: "",
      formacion6: "",
      formacion7: "",
      formacionObservacion: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  const colaboracionCriterios = [
    {
      key: "colaboracion1",
      label: "Convenios con empresas",
      description: "Establecimiento y gestión de acuerdos de colaboración con el sector empresarial"
    },
    {
      key: "colaboracion2",
      label: "Proyectos conjuntos I+D+i",
      description: "Participación en proyectos colaborativos de investigación, desarrollo e innovación"
    },
    {
      key: "colaboracion3",
      label: "Redes de investigación",
      description: "Participación activa en redes nacionales e internacionales de investigación"
    },
    {
      key: "colaboracion4",
      label: "Consultoría especializada",
      description: "Prestación de servicios de consultoría técnica y científica"
    },
    {
      key: "colaboracion5",
      label: "Participación en clusters",
      description: "Involucramiento en clusters industriales y tecnológicos"
    },
    {
      key: "colaboracion6",
      label: "Cooperación internacional",
      description: "Colaboración con instituciones y organizaciones internacionales"
    },
    {
      key: "colaboracion7",
      label: "Spin-offs y start-ups",
      description: "Creación o participación en empresas derivadas de la investigación"
    },
  ]

  const formacionCriterios = [
    {
      key: "formacion1",
      label: "Dirección de tesis de posgrado",
      description: "Supervisión de estudiantes de maestría y doctorado"
    },
    {
      key: "formacion2",
      label: "Formación de investigadores junior",
      description: "Mentoring y desarrollo de nuevos investigadores"
    },
    {
      key: "formacion3",
      label: "Programas de intercambio",
      description: "Participación en programas de movilidad estudiantil y académica"
    },
    {
      key: "formacion4",
      label: "Capacitación continua",
      description: "Desarrollo de programas de educación continua y actualización profesional"
    },
    {
      key: "formacion5",
      label: "Transferencia de conocimiento",
      description: "Actividades de divulgación científica y transferencia de conocimiento"
    },
    {
      key: "formacion6",
      label: "Desarrollo de competencias técnicas",
      description: "Formación especializada en habilidades técnicas específicas"
    },
    {
      key: "formacion7",
      label: "Vinculación con egresados",
      description: "Mantenimiento de redes y colaboración con antiguos estudiantes"
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Colaboración y Formación</CardTitle>
        <CardDescription>
          Evalúe los criterios relacionados con colaboración y formación de recursos humanos (Escala 0-5)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Colaboración con industria y actores */}
            <div className="space-y-6">
              
              {colaboracionCriterios.map((criterio) => (
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
                name="colaboracionObservacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones - Colaboración con Industria y Actores</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Proporcione observaciones generales sobre la colaboración con industria y actores"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Formación y desarrollo de recursos humanos */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">Formación y Desarrollo de Recursos Humanos</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe las capacidades de formación y desarrollo de talento humano
                </p>
              </div>
              
              {formacionCriterios.map((criterio) => (
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
                name="formacionObservacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones - Formación y Desarrollo de Recursos Humanos</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Proporcione observaciones generales sobre la formación y desarrollo de recursos humanos"
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
