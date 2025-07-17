import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Sistema de Evaluación TRL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-center">
                <p>
                  Bienvenido al sistema de evaluación del nivel de madurez tecnológica (TRL) 
                  para las unidades académicas y administrativas de la Universidad de Antioquia.
                </p>
                <p>
                  Este sistema le permitirá evaluar el estado actual de las capacidades de 
                  Ciencia, Tecnología, Innovación y Emprendimiento (CTI+e) de su unidad.
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-8">
                <Link href="/TRLEvaluation">
                  <Button 
                    size="lg"
                    className="px-8 py-3 text-lg font-semibold"
                  >
                    Realizar Evaluación TRL
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </HydrateClient>
  );
}
