import Link from "next/link";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { TRLEvaluationPage } from "@/components/TRLEvaluationPage";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <TRLEvaluationPage />
    </HydrateClient>
  );
}
