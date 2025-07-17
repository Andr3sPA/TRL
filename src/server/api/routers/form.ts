import { z } from "zod"; 
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

const formularioSchema = z.object({
  // Información General
  nombreCompleto: z.string(),
  rol: z.string(),
  correoElectronico: z.string(),
  telefono: z.string(),
  horasDedicacion: z.number(),
  tieneExperiencia: z.string(),
  unidadAcademica: z.string(),
  tieneEstrategia: z.string(),
  explicacionEstrategia: z.string().nullable(),
  estrategiaSocializada: z.string(),
  explicacionSocializacion: z.string().nullable(),
  
  // Áreas de Conocimiento e Investigación y Desarrollo
  areasConocimiento1: z.string(),
  areasConocimiento1Observacion: z.string(),
  areasConocimiento2: z.string(),
  areasConocimiento2Observacion: z.string(),
  areasConocimiento3: z.string(),
  areasConocimiento3Observacion: z.string(),
  areasConocimiento4: z.string(),
  areasConocimiento4Observacion: z.string(),
  investigacion1: z.string(),
  investigacion1Observacion: z.string(),
  investigacion2: z.string(),
  investigacion2Observacion: z.string(),
  investigacion3: z.string(),
  investigacion3Observacion: z.string(),
  investigacion4: z.string(),
  investigacion4Observacion: z.string(),
  investigacion5: z.string(),
  investigacion5Observacion: z.string(),
  
  // Transferencia, innovación y relación con el entorno
  entorno1: z.string(),
  entorno1Observacion: z.string(),
  entorno2: z.string(),
  entorno2Observacion: z.string(),
  entorno3: z.string(),
  entorno3Observacion: z.string(),
  transferencia1: z.string(),
  transferencia1Observacion: z.string(),
  transferencia2: z.string(),
  transferencia2Observacion: z.string(),
  transferencia3: z.string(),
  transferencia3Observacion: z.string(),
  
  // Colaboración y Formación
  formacion1: z.string(),
  formacion1Observacion: z.string(),
  formacion2: z.string(),
  formacion2Observacion: z.string(),
  formacion3: z.string(),
  formacion3Observacion: z.string(),
  colaboracion1: z.string(),
  colaboracion1Observacion: z.string(),
  colaboracion2: z.string(),
  colaboracion2Observacion: z.string(),
  colaboracion3: z.string(),
  colaboracion3Observacion: z.string(),
  
  // Infraestructura, recursos y emprendimiento
  infraestructura1: z.string(),
  infraestructura1Observacion: z.string(),
  infraestructura2: z.string(),
  infraestructura2Observacion: z.string(),
  infraestructura3: z.string(),
  infraestructura3Observacion: z.string(),
  infraestructura4: z.string(),
  infraestructura4Observacion: z.string(),
  emprendimiento1: z.string(),
  emprendimiento1Observacion: z.string(),
  emprendimiento2: z.string(),
  emprendimiento2Observacion: z.string(),
});

export const formRouter = createTRPCRouter({
  obtenerFormularios: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.formulario.findMany({
      orderBy: { fechaEnvio: "desc" },
    });
  }),

  enviarFormulario: publicProcedure
    .input(formularioSchema)
    .mutation(async ({ ctx, input }) => {
      // Map input to match Prisma FormularioCreateInput type if necessary
      return ctx.db.formulario.create({
        data: {
          ...input,
          // If your Prisma model expects a 'fechaEnvio' field, add it here:
          fechaEnvio: new Date(),
        },
      });
    }),
});
