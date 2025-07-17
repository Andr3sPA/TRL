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
  areasConocimiento1Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  areasConocimiento2: z.string({
    required_error: "Calificación requerida",
  }),
  areasConocimiento2Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  areasConocimiento3: z.string({
    required_error: "Calificación requerida",
  }),
  areasConocimiento3Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  areasConocimiento4: z.string({
    required_error: "Calificación requerida",
  }),
  areasConocimiento4Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  
  // Investigación y desarrollo (5 criterios)
  investigacion1: z.string({
    required_error: "Calificación requerida",
  }),
  investigacion1Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  investigacion2: z.string({
    required_error: "Calificación requerida",
  }),
  investigacion2Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  investigacion3: z.string({
    required_error: "Calificación requerida",
  }),
  investigacion3Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  investigacion4: z.string({
    required_error: "Calificación requerida",
  }),
  investigacion4Observacion: z.string().min(10, {
    message: "La observación debe tener al menos 10 caracteres.",
  }),
  investigacion5: z.string({
    required_error: "Calificación requerida",
  }),
  investigacion5Observacion: z.string().min(10, {
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
    defaultValues: defaultValues ?? {
      areasConocimiento1: "",
      areasConocimiento1Observacion: "",
      areasConocimiento2: "",
      areasConocimiento2Observacion: "",
      areasConocimiento3: "",
      areasConocimiento3Observacion: "",
      areasConocimiento4: "",
      areasConocimiento4Observacion: "",
      investigacion1: "",
      investigacion1Observacion: "",
      investigacion2: "",
      investigacion2Observacion: "",
      investigacion3: "",
      investigacion3Observacion: "",
      investigacion4: "",
      investigacion4Observacion: "",
      investigacion5: "",
      investigacion5Observacion: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  const areasConocimientoCriterios = [
    {
      key: "areasConocimiento1" as const,
      label: "¿Existe una o varias áreas de conocimiento bien definidas?",
      description: "Evalúe si las áreas de conocimiento están claramente establecidas y delimitadas"
    },
    {
      key: "areasConocimiento2" as const,
      label: "¿Se identifican claramente los límites del conocimiento?",
      description: "Evalúe si están definidos los alcances y fronteras del conocimiento en el área"
    },
    {
      key: "areasConocimiento3" as const,
      label: "¿Existe reconocimiento formal en el sistema de CTI nacional o internacional?",
      description: "Evalúe el nivel de reconocimiento oficial del área de conocimiento"
    },
    {
      key: "areasConocimiento4" as const,
      label: "¿Existe una masa crítica suficiente para el desarrollo del área?",
      description: "Evalúe si hay suficiente talento humano y recursos para desarrollar el área"
    },
  ]

  const investigacionCriterios = [
    {
      key: "investigacion1" as const,
      label: "¿Existe una agenda de investigación y desarrollo definida y en ejecución?",
      description: "Evalúe si hay una agenda clara de I+D que se esté implementando activamente"
    },
    {
      key: "investigacion2" as const,
      label: "¿Los productos o resultados son visibles y evidenciables?",
      description: "Evalúe si los resultados de investigación son tangibles y demostrables"
    },
    {
      key: "investigacion3" as const,
      label: "¿Hay evidencia de colaboración con otros grupos o instituciones?",
      description: "Evalúe el nivel de colaboración externa en actividades de investigación"
    },
    {
      key: "investigacion4" as const,
      label: "¿Existen productos de CTI que se alinean con políticas públicas o necesidades sociales/territoriales?",
      description: "Evalúe la pertinencia social y territorial de los productos de CTI"
    },
    {
      key: "investigacion5" as const,
      label: "¿Se articulan los resultados con procesos de formación e impacto social?",
      description: "Evalúe cómo los resultados se integran con la formación y generan impacto social"
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Áreas de Conocimiento e Investigación y Desarrollo</CardTitle>
        <CardDescription>
          Evalúe los criterios relacionados con áreas de conocimiento e investigación y desarrollo (Escala 0-5)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* 🧠 Áreas de Conocimiento */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">🧠 Áreas de Conocimiento</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe los aspectos relacionados con las áreas de conocimiento
                </p>
              </div>
              
              {areasConocimientoCriterios.map((criterio) => (
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

            {/* 🧪 Investigación y Desarrollo */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">🧪 Investigación y Desarrollo</h3>
                <p className="text-sm text-muted-foreground">
                  Evalúe los aspectos relacionados con investigación y desarrollo
                </p>
              </div>
              
              {investigacionCriterios.map((criterio) => (
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
