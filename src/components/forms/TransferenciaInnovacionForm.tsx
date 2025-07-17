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
  // Transferencia de tecnología (4 criterios)
  transferencia1: z.string({
    required_error: "Calificación requerida",
  }),
  transferencia2: z.string({
    required_error: "Calificación requerida",
  }),
  transferencia3: z.string({
    required_error: "Calificación requerida",
  }),
  transferencia4: z.string({
    required_error: "Calificación requerida",
  }),
  transferenciaObservacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  
  // Proyectos de innovación (5 criterios)
  innovacion1: z.string({
    required_error: "Calificación requerida",
  }),
  innovacion2: z.string({
    required_error: "Calificación requerida",
  }),
  innovacion3: z.string({
    required_error: "Calificación requerida",
  }),
  innovacion4: z.string({
    required_error: "Calificación requerida",
  }),
  innovacion5: z.string({
    required_error: "Calificación requerida",
  }),
  innovacionObservacion: z.string().min(10, {
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
    defaultValues: defaultValues || {
      transferencia1: "",
      transferencia2: "",
      transferencia3: "",
      transferencia4: "",
      transferenciaObservacion: "",
      innovacion1: "",
      innovacion2: "",
      innovacion3: "",
      innovacion4: "",
      innovacion5: "",
      innovacionObservacion: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  const transferenciaCriterios = [
    {
      key: "transferencia1",
      label: "Identificación de oportunidades de transferencia",
      description: "Capacidad para identificar resultados de investigación transferibles"
    },
    {
      key: "transferencia2",
      label: "Protección de propiedad intelectual",
      description: "Gestión de patentes, derechos de autor y otros mecanismos de protección"
    },
    {
      key: "transferencia3",
      label: "Vinculación con el sector productivo",
      description: "Establecimiento de relaciones con empresas e industria"
    },
    {
      key: "transferencia4",
      label: "Comercialización de tecnologías",
      description: "Experiencia en procesos de licenciamiento y comercialización"
    },
  ]

  const innovacionCriterios = [
    {
      key: "innovacion1",
      label: "Participación en proyectos de innovación",
      description: "Involucramiento activo en iniciativas de innovación"
    },
    {
      key: "innovacion2",
      label: "Desarrollo de prototipos",
      description: "Creación y validación de prototipos funcionales"
    },
    {
      key: "innovacion3",
      label: "Validación en entornos reales",
      description: "Pruebas y validación de tecnologías en condiciones operativas"
    },
    {
      key: "innovacion4",
      label: "Gestión de proyectos de innovación",
      description: "Capacidad de liderar y gestionar proyectos innovadores"
    },
    {
      key: "innovacion5",
      label: "Impacto de las innovaciones",
      description: "Medición y evaluación del impacto de las innovaciones desarrolladas"
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Transferencia de Tecnología y Participación en Innovación</CardTitle>
        <CardDescription>
          Evalúe los criterios relacionados con transferencia e innovación (Escala 0-5)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Transferencia de Tecnología */}
            <div className="space-y-6">
              
              {transferenciaCriterios.map((criterio) => (
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
                name="transferenciaObservacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones - Transferencia de Tecnología</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Proporcione observaciones generales sobre transferencia de tecnología"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Proyectos de Innovación */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">Proyectos de Innovación</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe la participación y liderazgo en proyectos de innovación
                </p>
              </div>
              
              {innovacionCriterios.map((criterio) => (
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
                name="innovacionObservacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observaciones - Proyectos de Innovación</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Proporcione observaciones generales sobre los proyectos de innovación"
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
