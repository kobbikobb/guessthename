import { Link } from 'react-router-dom';
import { CellContext } from '@tanstack/react-table';

type useLinkColumnProps = {
  header: string;
  accessorKey: string;
  createLink: (id: string) => {};
};

type useColumnProps = {
  header: string;
  accessorKey: string;
};

type RowData = {
  id: string;
  title: string;
};

export function useLinkColumn({
  header,
  accessorKey,
  createLink
}: useLinkColumnProps) {
  return {
    header,
    accessorKey,
    cell: ({ row, getValue }: CellContext<RowData, string>) => (
      <Link to={createLink(row.original.id)}>{getValue()}</Link>
    )
  };
}

export function useColumn({ header, accessorKey }: useColumnProps) {
  return {
    header,
    accessorKey
  };
}
