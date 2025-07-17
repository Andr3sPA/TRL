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
    message: "El rol en la unidad académica es obligatorio.",
  }),
  email: z.string().email({
    message: "Ingrese un correo electrónico válido.",
  }),
  phone: z.string().min(10, {
    message: "El número de celular debe tener al menos 10 dígitos.",
  }),
  dedicationHours: z.coerce.number().min(1, {
    message: "El tiempo de dedicación debe ser mayor a 0 horas.",
  }),
  hasExperience: z.string({
    required_error: "Seleccione si tiene experiencia en CTI+e.",
  }),
  academicUnit: z.string({
    required_error: "Seleccione una unidad académica.",
  }),
  hasStrategy: z.string({
    required_error: "Seleccione si cuenta con una estrategia institucional para CTI+e.",
  }),
  strategyExplanation: z.string().optional(),
  hasSocializedStrategy: z.string({
    required_error: "Seleccione si ha socializado la estrategia en su unidad académica.",
  }),
  socializationExplanation: z.string().optional(),
}).refine((data) => {
  if (data.hasStrategy === "si" && (!data.strategyExplanation || data.strategyExplanation.length < 10)) {
    return false;
  }
  return true;
}, {
  message: "La explicación de la estrategia debe tener al menos 10 caracteres.",
  path: ["strategyExplanation"],
}).refine((data) => {
  if (data.hasSocializedStrategy === "si" && (!data.socializationExplanation || data.socializationExplanation.length < 10)) {
    return false;
  }
  return true;
}, {
  message: "La explicación de la socialización debe tener al menos 10 caracteres.",
  path: ["socializationExplanation"],
});

interface InformacionGeneralFormProps {
  onNext: (data: z.infer<typeof formSchema>) => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
  onGoBack?: () => void
}

export function InformacionGeneralForm({ onNext, defaultValues, onGoBack }: InformacionGeneralFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      fullName: "",
      role: "",
      email: "",
      phone: "",
      dedicationHours: 1,
      hasExperience: "",
      academicUnit: "",
      hasStrategy: "",
      strategyExplanation: "",
      hasSocializedStrategy: "",
      socializationExplanation: "",
    },
  })

  const hasStrategy = form.watch("hasStrategy");
  const hasSocializedStrategy = form.watch("hasSocializedStrategy");

  function onSubmit(values: z.infer<typeof formSchema>) {
    onNext(values)
  }

  const academicUnits = [
    "Corporación Académica Ambiental",
    "Escuela de Idiomas",
    "Escuela de Microbiología",
    "Escuela de Nutrición y Dietética",
    "Escuela Interameriacana de Bibliotecologia",
    "Facultad de Artes",
    "Facultad de Ciencias Agrarias",
    "Facultad de Ciencias Económicas",
    "Facultad de Ciencias Exactas y Naturales",
    "Facultad de Ciencias Farmacéuticas y Alimentarias",
    "Facultad de Ciencias Sociales y Humanas",
    "Facultad de Comunicaciones",
    "Facultad de Derecho y Ciencias Políticas",
    "Facultad de Educación",
    "Facultad de Enfermería",
    "Facultad de Ingeniería",
    "Facultad de Medicina",
    "Facultad de Odontología",
    "Facultad Nacional de Salud Pública",
    "Instituto de Educación Fisica y Deporte",
    "Instituto de Estudios Políticos",
    "Instituto de Estudios Regionales",
    "Instituto de Filosofía",
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
                    <FormLabel>Rol en la unidad académica *</FormLabel>
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
                      <Input type="email" placeholder="ejemplo@udea.edu.co" {...field} />
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
                    <FormLabel>Número de celular *</FormLabel>
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
                    <FormLabel>Tiempo de dedicación a la estrategia CTI+e (horas) *</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Número de horas dedicadas a actividades CTI+e
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
                    <FormLabel>Unidad académica *</FormLabel>
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
                name="hasStrategy"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>¿Cuenta con una estrategia institucional para CTI+e? *</FormLabel>
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

              {hasStrategy === "si" && (
                <FormField
                  control={form.control}
                  name="strategyExplanation"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Explique brevemente la estrategia *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa la estrategia institucional para CTI+e"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="hasSocializedStrategy"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>¿Ha socializado la estrategia en su unidad académica? *</FormLabel>
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

              {hasSocializedStrategy === "si" && (
                <FormField
                  control={form.control}
                  name="socializationExplanation"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Explique brevemente cómo fue esa socialización *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa cómo socializó la estrategia en su unidad académica"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
