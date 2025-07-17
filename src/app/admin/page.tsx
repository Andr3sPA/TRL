import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { FormsTable } from "@/components/forms-table";

export default async function AdminPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-gray-600 mt-2">Gestión de formularios TRL enviados</p>
      </div>
      <FormsTable />
    </div>
  );
}