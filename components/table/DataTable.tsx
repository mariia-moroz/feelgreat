"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='data-table'>
      <Table className='shad-table'>
        <TableHeader className='bg-admin-header'>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className='shad-table-row-header'>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className='shad-table-row'
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='text-16-regular text-center pt-8'>
                No appoinmtments yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='table-actions'>
        <Button
          variant='outline'
          size='lg'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='shad-gray-btn'
        >
          <ArrowBigLeftIcon width={48} height={48} className="stroke-accent fill-accent"/>
        </Button>
        <Button
          variant='outline'
          size='lg'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='shad-gray-btn'
        >
          <ArrowBigRightIcon width={48} height={48} className="stroke-accent fill-accent"/>
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
