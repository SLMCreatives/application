"use client";

import React from "react";
import { DataTable } from "./data.table";
import { columns } from "./columns";

// Define the Student interface based on usage
export interface Student {
  id: string;
  name: string;
  matric: string;
  phone: string;
  email: string;
  prog_info: {
    prog_name: string;
  };
}

// Define props for the RawTable component
export interface RawTableProps {
  data: Student[];
}

// Client component in Next.js 15
export default function RawTable({ data }: RawTableProps) {
  return (
    <div className="flex-1 w-full p-10">
      <h1 className="text-2xl font-bold mb-4">June 2025</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
