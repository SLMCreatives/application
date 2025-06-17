"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTablePagination } from "./datatablepagination";
import { DataTableViewOptions } from "./datatableviewoptions";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter
    }
  });

  return (
    <div>
      <div className="flex items-center py-4 gap-4">
        <Input
          value={(table.getState().globalFilter ?? "") as string}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          placeholder="Search..."
        />

        <DataTableViewOptions table={table} />
        <Sheet>
          <SheetTrigger>
            <PlusIcon className="w-4 h-4" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Student</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="p-4">
              <Textarea
                placeholder="Enter student details here..."
                className="h-40"
              />
              <div className="flex justify-end mt-4">
                <Button variant="outline">Save</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted flex-row items-center justify-center py-2"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={header.id === "name" ? "w-[400px]" : ""}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="py-2"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-nowrap cursor-pointer py-2"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between space-x-2 py-4 px-4 w-full">
          <DataTablePagination table={table} />
          {/*  <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <p className="text-sm text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button> */}
        </div>
      </div>
    </div>
  );
}
