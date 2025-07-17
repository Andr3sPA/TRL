import { HydrateClient } from "@/trpc/server";
import { TRLEvaluationPage } from "@/components/TRLEvaluationPage";

export default async function Home() {

  return (
    <HydrateClient>
      <TRLEvaluationPage />
    </HydrateClient>
  );
}
