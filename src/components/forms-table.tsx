"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
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
  rol: string;
  telefono: string;
  horasDedicacion: number;
  tieneExperiencia: string;
}

export function FormsTable() {
  const { data: forms = [] } = api.form.obtenerFormularios.useQuery();

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
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Seleccionar todo"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Seleccionar fila"
            className="translate-y-[2px]"
          />
        ),
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
        id: "rol",
        accessorKey: "rol",
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
        meta: {
          label: "Fecha",
          placeholder: "Seleccionar fecha...",
          variant: "date",
          icon: Calendar,
        },
      },
      {
        id: "actions",
        cell: ({ row: _row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Abrir menú"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem>
                <Eye className="mr-2 size-4" />
                Ver detalles
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  const { table } = useDataTable({
    data: forms,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "fechaEnvio", desc: true }],
      columnPinning: {
        left: ["select", "id"],
        right: ["actions"],
      },
    },
    getRowId: (originalRow) => originalRow.id,
    meta: {
      clearAllFilters: () => {
        table.resetColumnFilters();
      },
    },
  });

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <DataTable table={table} />
    </div>
  );
}
