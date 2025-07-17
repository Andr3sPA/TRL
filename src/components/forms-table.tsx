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
  fechaEnvio: Date;
  nombreCompleto: string;
  correoElectronico: string;
  unidadAcademica: string;
  rolUnidad: string;
  telefono: string;
  horasDedicacion: number;
  tieneExperiencia: string;
}

export function FormsTable() {
  const { data: forms = [], isLoading } = api.form.obtenerFormularios.useQuery();

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
        id: "nombreCompleto",
        accessorKey: "nombreCompleto",
        header: ({ column }: { column: Column<FormSubmission, unknown> }) => (
          <DataTableColumnHeader column={column} title="Nombre Completo" />
        ),
        cell: ({ cell }) => (
          <div className="font-medium">
            {cell.getValue<string>()}
          </div>
        ),
        meta: {
          label: "Nombre",
          placeholder: "Buscar por nombre...",
          variant: "text",
          icon: User,
        },
        enableColumnFilter: true,
      },
      {
        id: "correoElectronico",
        accessorKey: "correoElectronico",
        header: ({ column }: { column: Column<FormSubmission, unknown> }) => (
          <DataTableColumnHeader column={column} title="Correo Electrónico" />
        ),
        cell: ({ cell }) => (
          <div className="text-sm">
            {cell.getValue<string>()}
          </div>
        ),
        meta: {
          label: "Correo",
          placeholder: "Buscar por correo...",
          variant: "text",
          icon: User,
        },
        enableColumnFilter: true,
      },
      {
        id: "unidadAcademica",
        accessorKey: "unidadAcademica",
        header: ({ column }: { column: Column<FormSubmission, unknown> }) => (
          <DataTableColumnHeader column={column} title="Unidad Académica" />
        ),
        cell: ({ cell }) => (
          <div className="text-sm">
            {cell.getValue<string>()}
          </div>
        ),
        enableColumnFilter: true,
      },
      {
        id: "rolUnidad",
        accessorKey: "rolUnidad",
        header: ({ column }: { column: Column<FormSubmission, unknown> }) => (
          <DataTableColumnHeader column={column} title="Rol en la Unidad" />
        ),
        cell: ({ cell }) => (
          <div className="text-sm">
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        id: "horasDedicacion",
        accessorKey: "horasDedicacion",
        header: ({ column }: { column: Column<FormSubmission, unknown> }) => (
          <DataTableColumnHeader column={column} title="Horas de Dedicación" />
        ),
        cell: ({ cell }) => (
          <div className="text-sm">
            {cell.getValue<number>()} horas
          </div>
        ),
      },
      {
        id: "fechaEnvio",
        accessorKey: "fechaEnvio",
        header: ({ column }: { column: Column<FormSubmission, unknown> }) => (
          <DataTableColumnHeader column={column} title="Fecha de Envío" />
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
        id: "tieneExperiencia",
        accessorKey: "tieneExperiencia",
        header: "Experiencia CTI+e",
        cell: ({ cell }) => {
          const experiencia = cell.getValue<string>();
          
          return (
            <Badge variant={experiencia === "Sí" ? "default" : "secondary"}>
              {experiencia}
            </Badge>
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
                    void navigator.clipboard.writeText(JSON.stringify(form, null, 2));
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
      sorting: [{ id: "fechaEnvio", desc: true }],
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
