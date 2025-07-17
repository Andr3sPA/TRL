"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/hooks/use-data-table";
import { api } from "@/trpc/react";

import type { Column, ColumnDef } from "@tanstack/react-table";
import {
  Calendar,
  FileText,
  MoreHorizontal,
  User,
  Eye,
} from "lucide-react";
import * as React from "react";

interface FormSubmission {
  id: string;
  answers: any;
  submittedById: string | null;
  createdAt: Date;
}

export function FormsTable() {
  const { data: forms = [], isLoading } = api.form.getForms.useQuery();

  const columns = React.useMemo<ColumnDef<FormSubmission>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "id",
        accessorKey: "id",
        header: ({ column }: { column: Column<FormSubmission, unknown> }) => (
          <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ cell }) => (
          <div className="font-mono text-sm">
            {cell.getValue<string>().slice(0, 8)}...
          </div>
        ),
        meta: {
          label: "ID",
          placeholder: "Buscar por ID...",
          variant: "text",
          icon: FileText,
        },
        enableColumnFilter: true,
      },
      {
        id: "submittedBy",
        accessorKey: "submittedById",
        header: ({ column }: { column: Column<FormSubmission, unknown> }) => (
          <DataTableColumnHeader column={column} title="Usuario" />
        ),
        cell: ({ cell }) => {
          const userId = cell.getValue<string | null>();
          
          return (
            <div className="flex items-center gap-2">
              <User className="size-4" />
              {userId ? (
                <span className="font-mono text-sm">{userId.slice(0, 8)}...</span>
              ) : (
                <Badge variant="secondary">Anónimo</Badge>
              )}
            </div>
          );
        },
        meta: {
          label: "Usuario",
          variant: "multiSelect",
          options: [
            { label: "Con usuario", value: "with-user", icon: User },
            { label: "Anónimo", value: "anonymous", icon: User },
          ],
        },
        enableColumnFilter: true,
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({ column }: { column: Column<FormSubmission, unknown> }) => (
          <DataTableColumnHeader column={column} title="Fecha de envío" />
        ),
        cell: ({ cell }) => {
          const date = cell.getValue<Date>();
          
          return (
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{new Date(date).toLocaleDateString('es-ES')}</span>
            </div>
          );
        },
        enableSorting: true,
      },
      {
        id: "summary",
        header: "Resumen",
        cell: ({ row }) => {
          const answers = row.original.answers;
          const generalInfo = answers?.informacionGeneral;
          
          return (
            <div className="max-w-md">
              <div className="text-sm font-medium">
                {generalInfo?.fullName || "Sin nombre"}
              </div>
              <div className="text-xs text-gray-500">
                {generalInfo?.academicUnit || "Sin unidad académica"}
              </div>
            </div>
          );
        },
      },
      {
        id: "actions",
        cell: function Cell({ row }) {
          const form = row.original;
          
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    console.log("Ver detalles:", form);
                    // Aquí puedes implementar la lógica para ver detalles
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(form.answers, null, 2));
                    alert("Datos copiados al portapapeles");
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Copiar datos
                </DropdownMenuItem>
                <DropdownMenuItem 
                  variant="destructive"
                  onClick={() => {
                    if (confirm("¿Estás seguro de que quieres eliminar este formulario?")) {
                      console.log("Eliminar:", form.id);
                      // Aquí puedes implementar la lógica de eliminación
                    }
                  }}
                >
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        size: 32,
      },
    ],
    [],
  );

  const { table } = useDataTable({
    data: forms,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (row) => row.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Cargando formularios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
}
