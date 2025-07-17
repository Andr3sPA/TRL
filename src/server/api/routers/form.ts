import { z } from "zod"; 
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

const formularioSchema = z.object({
  // Información General
  nombreCompleto: z.string(),
  rolUnidad: z.string(),
  correoElectronico: z.string(),
  telefono: z.string(),
  horasDedicacion: z.number(),
  tieneExperiencia: z.string(),
  unidadAcademica: z.string(),
  estrategia: z.string(),
  nivelSocializacion: z.string(),
  explicacionSocializacion: z.string(),
  
  // Áreas de Conocimiento
  areasInvestigacion: z.string(),
  proyectoActual: z.string(),
  descripcionProyecto: z.string(),
  tecnologiasUtilizadas: z.string(),
  resultadosEsperados: z.string(),
  
  // Transferencia e Innovación
  experienciaTransferencia: z.string(),
  tipoTransferencia: z.string(),
  participacionInnovacion: z.string(),
  colaboracionEmpresa: z.string(),
  impactoComercial: z.string(),
  
  // Colaboración y Formación
  redesColaboracion: z.string(),
  proyectosConjuntos: z.string(),
  intercambioConocimiento: z.string(),
  programasFormacion: z.string(),
  mentoriaEstudiantes: z.string(),
  
  // Infraestructura y Emprendimiento
  infraestructura: z.string(),
  laboratoriosEquipos: z.string(),
  apoyoEmprendimiento: z.string(),
  startupsSpin: z.string(),
  capacitacionEmprendimiento: z.string(),
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
      return ctx.db.formulario.create({
        data: input,
      });
    }),
});
