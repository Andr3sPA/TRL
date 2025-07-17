import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Evaluación TRL (Technology Readiness Level)
              </CardTitle>
              <CardDescription className="text-xl font-semibold text-gray-700">
                Instrucciones para el diligenciamiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>
                  Por favor, complete los datos solicitados y, a continuación, evalúe cada una de las variables 
                  utilizando una escala del 0 al 5, abarcando 5 categorías, para describir el estado actual en 
                  CTI+e de su Unidad Académica/Administrativa. Le pedimos que sea preciso en sus respuestas y 
                  proporcione justificaciones donde lo considere apropiado. Evite sesgos o respuestas no verificadas. 
                  Al final del proceso, se asignará un valor en puntos, que determinará el nivel de desempeño de su 
                  Unidad Académica/Administrativa, clasificándolo en uno de los siguientes niveles: 
                  <strong>Principiante</strong>, <strong>Básico</strong>, <strong>Intermedio</strong>, 
                  <strong>Avanzado</strong> o <strong>Sobresaliente</strong>.
                </p>

                <p>
                  Es fundamental diligenciar el formulario una sola vez. Por lo tanto, le recomendamos coordinar 
                  internamente con su unidad académica/administrativa para designar a un representante que consolide 
                  la información.
                </p>

                <p>
                  Agradecemos sinceramente su colaboración en este ejercicio. Desde la División de Innovación de la UdeA, 
                  valoramos su participación y nos comunicaremos posteriormente para establecer una ruta que le brinde 
                  el mejor acompañamiento en la construcción o fortalecimiento de su estrategia de Innovación.
                </p>
              </div>

              <div className="flex justify-center pt-8">
                <Link href="/TRLEvaluation">
                  <Button 
                    size="lg"
                    className="px-8 py-3 text-lg font-semibold"
                  >
                    Comenzar Evaluación TRL
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
