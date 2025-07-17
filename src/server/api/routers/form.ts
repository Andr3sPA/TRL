import { z } from "zod"; 
import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const evaluationFormSchema = z.object({
  answers: z.any(),
});

export const formRouter = createTRPCRouter({
  getForms: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.Form.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  submitForm: publicProcedure
    .input(evaluationFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { answers } = input;

      return ctx.db.Form.create({
        data: {
          answers,
          submittedById: ctx.session?.user?.id ?? null, // si hay sesión, lo guarda
        },
      });
    }),
});
