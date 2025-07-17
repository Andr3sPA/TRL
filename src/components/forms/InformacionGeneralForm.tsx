"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre completo debe tener al menos 2 caracteres.",
  }),
  role: z.string().min(2, {
    message: "El rol en la unidad es obligatorio.",
  }),
  email: z.string().email({
    message: "Ingrese un correo electrónico válido.",
  }),
  phone: z.string().min(10, {
    message: "El número de teléfono debe tener al menos 10 dígitos.",
  }),
  dedicationHours: z.coerce.number().min(1).max(168, {
    message: "Las horas de dedicación deben estar entre 1 y 168.",
  }),
  hasExperience: z.string({
    required_error: "Seleccione si tiene experiencia en CTI+e.",
  }),
  academicUnit: z.string({
    required_error: "Seleccione una unidad académica.",
  }),
  strategy: z.string({
    required_error: "Seleccione una estrategia CTI+e.",
  }),
  strategyExplanation: z.string().min(10, {
    message: "La explicación debe tener al menos 10 caracteres.",
  }),
  strategySharing: z.string({
    required_error: "Seleccione el nivel de socialización.",
  }),
  strategySharingExplanation: z.string().min(10, {
    message: "La explicación debe tener al menos 10 caracteres.",
  }),
})

interface InformacionGeneralFormProps {
  onNext: (data: z.infer<typeof formSchema>) => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
  onGoBack?: () => void
}

export function InformacionGeneralForm({ onNext, defaultValues, onGoBack }: InformacionGeneralFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      fullName: "",
      role: "",
      email: "",
      phone: "",
      dedicationHours: 40,
      hasExperience: "",
      academicUnit: "",
      strategy: "",
      strategyExplanation: "",
      strategySharing: "",
      strategySharingExplanation: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  const academicUnits = [
    "Facultad de Ingeniería",
    "Facultad de Ciencias",
    "Facultad de Medicina",
    "Facultad de Administración",
    "Facultad de Educación",
    "Instituto de Investigación",
    "Centro de Innovación",
  ]

  const strategies = [
    "Investigación Básica",
    "Investigación Aplicada",
    "Desarrollo Tecnológico",
    "Innovación",
    "Transferencia de Tecnología",
  ]

  const sharingLevels = [
    "Muy Alto",
    "Alto",
    "Medio",
    "Bajo",
    "Muy Bajo",
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Información General</CardTitle>
        <CardDescription>
          Complete la información básica para la evaluación de TRL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su nombre completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol en la unidad *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Investigador, Docente, Director" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="ejemplo@universidad.edu.co" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular *</FormLabel>
                    <FormControl>
                      <Input placeholder="3001234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dedicationHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiempo de dedicación (horas/semana) *</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="168" {...field} />
                    </FormControl>
                    <FormDescription>
                      Número de horas semanales dedicadas a actividades CTI+e
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Tiene experiencia en CTI+e? *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="si">Sí</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="academicUnit"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Unidad Académica *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione su unidad académica" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {academicUnits.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
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
                name="strategy"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Estrategia CTI+e *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione la estrategia principal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {strategies.map((strategy) => (
                          <SelectItem key={strategy} value={strategy}>
                            {strategy}
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
                name="strategyExplanation"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Explicación de la estrategia *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explique en detalle la estrategia CTI+e seleccionada"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="strategySharing"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Nivel de socialización de la estrategia *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el nivel de socialización" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sharingLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
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
                name="strategySharingExplanation"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Explicación del nivel de socialización *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explique cómo se socializa la estrategia en su unidad"
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
              {onGoBack && (
                <Button type="button" variant="outline" onClick={onGoBack}>
                  ← Volver
                </Button>
              )}
              <Button type="submit" className={onGoBack ? "" : "ml-auto"}>
                Siguiente
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
