import React from 'react';
import { useReactTable, ColumnDef, flexRender, getCoreRowModel } from '@tanstack/react-table';
import BTable from 'react-bootstrap/Table';

type TableProps<T> = {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
};

export default function Table<T>({ columns, data }: TableProps<T>) {
  return;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // Generates the core rows model.
  });

  return (
    <BTable striped bordered hover>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </BTable>
  );
}
