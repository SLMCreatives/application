"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
export type AppEntry = {
  id: string;
  created_at: string;
  app_name: string;
  status: boolean;
  prog_info: string;
  intake: string;
  remarks: string | null; // JSON string (array of objects)
  phone: number;
  action: string;
};

export const columns: ColumnDef<AppEntry>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "created_at",
    header: "Created At"
  },
  {
    accessorKey: "app_name",
    header: "First Name"
  },
  {
    accessorKey: "phone",
    header: "Phone"
  },
  {
    accessorKey: "prog_info",
    header: "Applied Programme"
  },
  {
    accessorKey: "intake",
    header: "Intake"
  },
  {
    accessorKey: "status",
    header: "Completed",
    cell: ({ row }) => {
      return row.original.status ? (
        <CheckCircle className="text-green-500" />
      ) : (
        <XCircle className="text-red-500" />
      );
    }
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({}) => {
      return (
        <Button variant="ghost" size="sm">
          View
        </Button>
      );
    }
  }
];
